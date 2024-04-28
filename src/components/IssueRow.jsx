import { Avatar, Tooltip } from "@nextui-org/react";
import React from "react";
import "./issue.css";
import CommentIcon from "@/assets/CommentIcon";
import IssueOpenIcon from "@/assets/IssueOpenIcon";
import Label from "./Label";

const IssueRow = ({ issue }) => {
  return (
    <div className="flex px-1">
      <div style={{ flex: "4" }} className="flex gap-2">
        <div className="pt-1">
          <IssueOpenIcon />
        </div>
        <div>
          <div className="flex items-center">
            <a
              className="text-text_black text-[16px] font-semibold"
              style={{ marginRight: "4px" }}
              href={issue.html_url}
            >
              {issue.title}
            </a>
            {issue.labels.map((label) => (
              <Label key={label.id} label={label} />
            ))}
          </div>
          <div>
            <p className="text-grey_text text-xs mt-2">
              #{issue.number} {getTimeDifference(issue.created_at)}
              <span> by</span> {issue.user.login}
            </p>
          </div>
        </div>
      </div>
      <div style={{ flex: "1" }} className="flex">
        <div style={{ flex: "1" }}></div>
        <div style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}>
          {issue.assignees.map((assignee) => (
            <Tooltip
              className="bg-black_text text-xs"
              content={`Assigned to ${assignee.login}`}
              key={assignee.id}
              placement="bottom-end"
              offset={1}
              onClick={() => {
                history.push(assignee.html_url);
                window.location.href = assignee.html_url;
              }}
            >
              <a href={assignee.html_url} target="_blank">
                <Avatar
                  src={assignee.avatar_url}
                  size="sm"
                  className="w-6 h-6 cursor-pointer"
                />
              </a>
            </Tooltip>
          ))}
        </div>
        <div
          className="text-grey_text"
          style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}
        >
          {issue.comments > 0 && (
            <a
              className="flex items-top cursor-pointer"
              href={issue.html_url}
              target="_blank"
            >
              <CommentIcon fill="#636c76" />
              <span className="ml-1 mt-0 pt-0 text-xs font-semibold">
                {issue.comments}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const getTimeDifference = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdAtDate.getTime();
  const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (weeks >= 3) {
    // Üç haftadan fazla ise ay ve gün olarak göster
    const month = createdAtDate.toLocaleString("default", { month: "short" });
    const day = createdAtDate.getDate();
    return `opened on ${month} ${day}`;
  } else if (weeks >= 1) {
    return `opened ${weeks === 1 ? "last week" : weeks + " weeks ago"}`;
  } else if (days >= 1) {
    return `opened ${days === 1 ? "yesterday" : days + " days ago"}`;
  } else {
    return `opened today`;
  }
};

export default IssueRow;
