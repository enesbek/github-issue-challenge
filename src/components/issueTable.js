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
} from "@nextui-org/react";
import IssueRow from "./issueRow";
import IssueOpenIcon from "@/assets/issueOpenIcon";
import IssueClosedIcon from "@/assets/issueClosedIcon";
import { DownIcon } from "@/assets/DownIcon";
import Label from "./Label";

const IssueTable = ({
  issues,
  openedCount,
  closedCount,
  labels,
  onSelectionChange,
  initialSelectedItem,
}) => {
  const [selectedLabel, setSelectedLabel] = useState(initialSelectedItem);
  const [filteredIssues, setFilteredIssues] = useState(issues);

  // Dropdown bileşeninde seçim değiştiğinde çalışacak fonksiyon
  const handleSelectionChange = (selectedItem) => {
    setSelectedLabel(selectedItem);
    // Seçilen etikete göre filtreleme yap
    filterIssues(selectedItem);
    // Ana bileşene seçilen öğeyi ileterek işlem yapmasını sağlayın
    onSelectionChange(selectedItem);
  };

  // Etikete göre verileri filtreleyen fonksiyon
  const filterIssues = (selectedItem) => {
    if (!selectedItem) {
      // Seçili etiket yoksa tüm verileri göster
      setFilteredIssues(issues);
    } else {
      // Seçili etikete göre filtreleme yap
      const filtered = issues.filter((issue) =>
        issue.labels.some((label) => label.name === selectedItem.anchorKey)
      );
      setFilteredIssues(filtered);
    }
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
                selectedKeys={selectedLabel ? [selectedLabel.id] : []}
                selectionMode="single"
                onSelectionChange={handleSelectionChange}
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
        {filteredIssues.map((issue) => (
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
