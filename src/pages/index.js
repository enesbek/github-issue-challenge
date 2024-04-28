import "../app/globals.css";
import IssueTable from "@/components/issueTable";
import { getServerSideProps } from "./api/githubData";
import React from "react";

const Home = ({ issues, openedCount, closedCount, labels }) => {
  const [selectedLabel, setSelectedLabel] = React.useState(null);
  const [issuesData, setIssuesData] = React.useState(issues);
  console.log(issuesData);
  // Dropdown bileşeninde seçim değiştiğinde çalışacak fonksiyon
  const handleSelectionChange = (selectedItem) => {
    // Seçilen öğeye göre issues verisini filtreleyin veya güncelleyin
    console.log(selectedItem.anchorKey, issues);
    if (selectedItem) {
      const filteredIssues = issues.filter((issue) =>
        issue.labels.some((label) => label.name === selectedItem.anchorKey)
      );

      setIssuesData(filteredIssues);
    } else {
      setIssuesData(initialIssues);
    }
    setSelectedLabel(selectedItem);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-1">
      <IssueTable
        issues={issuesData}
        openedCount={openedCount}
        closedCount={closedCount}
        labels={labels}
        onSelectionChange={handleSelectionChange}
        initialSelectedItem={selectedLabel}
      />
    </div>
  );
};

export default Home;

export { getServerSideProps };
