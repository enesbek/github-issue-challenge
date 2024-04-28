import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import IssueTable from "@/components/IssueTable";

describe("IssueTable component", () => {
  const MockIssues = [
    {
      id: 1,
      node_id: "MDU6SXNzdWUx",
      html_url: "https://github.com/octocat/Hello-World/issues/1347",
      number: 1347,
      state: "open",
      title: "Found a bug",
      body: "I'm having a problem with this.",
      user: {
        login: "octocat",
        id: 1,
        node_id: "MDQ6VXNlcjE=",
        avatar_url: "https://github.com/images/error/octocat_happy.gif",

        html_url: "https://github.com/octocat",
      },
      labels: [
        {
          id: 208045946,
          node_id: "MDU6TGFiZWwyMDgwNDU5NDY=",
          url: "https://api.github.com/repos/octocat/Hello-World/labels/bug",
          name: "bug",
          description: "Something isn't working",
          color: "f29513",
          default: true,
        },
      ],
      assignees: [
        {
          login: "octocat",
          id: 1,
          avatar_url: "https://github.com/images/error/octocat_happy.gif",
          url: "https://api.github.com/users/octocat",
          html_url: "https://github.com/octocat",
        },
      ],
      comments: 0,
      closed_at: null,
      created_at: "2011-04-22T13:33:48Z",
      updated_at: "2011-04-22T13:33:48Z",
      author_association: "COLLABORATOR",
    },
  ];

  const MockLabels = [
    {
      id: 208045946,
      node_id: "MDU6TGFiZWwyMDgwNDU5NDY=",
      url: "https://api.github.com/repos/octocat/Hello-World/labels/bug",
      name: "bug",
      description: "Something isn't working",
      color: "f29513",
      default: true,
    },
    {
      id: 208045947,
      node_id: "MDU6TGFiZWwyMDgwNDU5NDc=",
      url: "https://api.github.com/repos/octocat/Hello-World/labels/enhancement",
      name: "enhancement",
      description: "New feature or request",
      color: "a2eeef",
      default: false,
    },
  ];
  
  const issues = MockIssues;
  const openedCount = 10;
  const closedCount = 5;
  const labels = MockLabels;

  test("Render table with correct opened closed counts", () => {
    render(
      <IssueTable
        issues={issues}
        openedCount={openedCount}
        closedCount={closedCount}
        labels={labels}
      />
    );

    const openedCountText = screen.getByText(`${openedCount} Open`);
    const closedCountText = screen.getByText(`${closedCount} Closed`);
    expect(openedCountText).toBeInTheDocument();
    expect(closedCountText).toBeInTheDocument();
  });

  test("Render table header dropdowns", () => {
    render(
      <IssueTable
        issues={issues}
        openedCount={openedCount}
        closedCount={closedCount}
        labels={labels}
      />
    );

    const labelButton = screen.getByText("Label");
    fireEvent.click(labelButton);

    // Control dropdown element
    const dropdownMenu = screen.getByText(MockLabels[1].name);
    expect(dropdownMenu).toBeInTheDocument();
  });

  test("Render issue", () => {
    render(
      <IssueTable
        issues={issues}
        openedCount={openedCount}
        closedCount={closedCount}
        labels={labels}
      />
    );

    issues.forEach((issue) => {
      const issueTitle = screen.getByText(issue.title);
      expect(issueTitle).toBeInTheDocument();
    });
  });
});
