import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import IssueRow from "./issueRow";
import IssueOpenIcon from "@/assets/issueOpenIcon";
import IssueClosedIcon from "@/assets/issueClosedIcon";
import { DownIcon } from "@/assets/DownIcon";
import Label from "./Label";
import "./issue.css";

const IssueTable = ({
  issues,
  openedCount,
  closedCount,
  labels,
  authors,
  filterIssues,
}) => {
  console.log(authors);
  const handleLabelSelection = (selectedItem) => {
    const filter = {
      type: "Label",
      value: selectedItem.currentKey,
    };
    filterIssues(filter);
  };

  const handleAuthorSelection = (selectedItem) => {
    const filter = {
      type: "Author",
      value: selectedItem.currentKey,
    };
    filterIssues(filter);
  };

  return (
    <Table
      aria-label="Example static collection table"
      className="text-black max-w-[1200px] my-20"
      selectionMode="single"
      bordered={false}
      radius="sm"
    >
      <TableHeader>
        <TableColumn className="flex justify-between h-14">
          <div className="flex px-1 items-center issue_total_info">
            <div className="flex text-[#1f2328] font-semibold text-[14px] gap-2">
              <IssueOpenIcon fill="1F2328" />
              {openedCount} Open &nbsp;
            </div>
            <div className="flex text-[#636C76] font-semibold text-[14px] gap-2 ml-2">
              <IssueClosedIcon fill="#636C76" />
              {closedCount} Closed &nbsp;
            </div>
          </div>
          <div className="flex items-center text-[#636C76]">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<DownIcon className="text-small" />}
                  variant="flat"
                  className="bg- mx-0 px-0 ml-4 text-[#636C76]"
                >
                  Author
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Author Dropdown"
                selectionMode="single"
                onSelectionChange={handleAuthorSelection}
                shouldBlockScroll={true}
                items={authors}
                className="max-h-[500px] h-fit overflow-auto"
              >
                {(item) => (
                  <DropdownItem key={item.login} className="text-black">
                    <div className="flex">
                      <Avatar
                        src={item.avatar_url}
                        size="sm"
                        className="w-6 h-6 cursor-pointer mr-2"
                      />
                      {item.login}
                    </div>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<DownIcon className="text-small" />}
                  variant="flat"
                  className="bg- mx-0 px-0 ml-4 text-[#636C76]"
                >
                  Label
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Label Dropdown"
                selectionMode="single"
                onSelectionChange={handleLabelSelection}
                shouldBlockScroll={true}
                items={labels}
                className="max-h-[500px] h-fit overflow-auto"
              >
                {(item) => (
                  <DropdownItem key={item.name} className="text-black">
                    <Label label={item} />
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
            <Button
              endContent={<DownIcon className="text-small" />}
              variant="flat"
              bordered={false}
              className="bg- mx-0 px-0 ml-4 text-[#636C76]"
            >
              Projects
            </Button>
            <Button
              endContent={<DownIcon className="text-small" />}
              variant="flat"
              className="bg- mx-0 px-0 ml-4 text-[#636C76]"
            >
              Milestones
            </Button>
            <Button
              endContent={<DownIcon className="text-small" />}
              variant="flat"
              className="bg- mx-0 px-0 ml-4 text-[#636C76]"
            >
              Assignee
            </Button>
            <Button
              endContent={<DownIcon className="text-small" />}
              variant="flat"
              className="bg- mx-0 px-0 ml-4 text-[#636C76]"
            >
              Sort
            </Button>
          </div>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No issues found"}>
        {issues.map((issue) => (
          <TableRow
            key={issue.id}
            className="border-1 border-[rgb(208, 215, 222)]"
          >
            <TableCell>
              <IssueRow issue={issue} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default IssueTable;
