import "../app/globals.css";
import React, { useState } from "react";
import IssueTable from "@/components/issueTable";
import {
  fetchIssuesByFilter,
  fetchIssuesBySort,
  getServerSideProps,
} from "./api/githubData";

const Home = ({ initialIssues, openedCount, closedCount, labels, authors }) => {
  const [issues, setIssues] = useState(initialIssues);

  const handleFilterChange = async (filter) => {
    try {
      const filteredIssues = await fetchIssuesByFilter(filter);

      setIssues(filteredIssues);
    } catch (error) {
      console.error("Error fetching filtered issues:", error);
    }
  };

  const handleSortIssues = async (sortType) => {
    try {
      const sortedIssues = await fetchIssuesBySort(sortType);

      setIssues(sortedIssues);
    } catch (error) {
      console.error("Error fetching filtered issues:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-1">
      <IssueTable
        issues={issues}
        openedCount={openedCount}
        closedCount={closedCount}
        labels={labels}
        authors={authors}
        filterIssues={handleFilterChange}
        sortIssues={handleSortIssues}
      />
    </div>
  );
};

export default Home;

export { getServerSideProps };
