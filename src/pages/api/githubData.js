const owner = "Trendyol";
const repo = "baklava";

const fetchIssuesFromGithub = async (apiUrl) => {
  try {
    const response = await fetch(
      apiUrl,
      process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN
        ? {
            headers: {
              Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
            },
          }
        : {}
    );

    if (!response.ok) {
      throw new Error("Failed to fetch issues from Github API");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error fetching issues:", error);
  }
};

const getIssueData = async () => {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues?sort=updated`;

  return await fetchIssuesFromGithub(apiUrl);
};

export async function getServerSideProps(context) {
  try {
    const issueData = await getIssueData();

    const { openedCount, closedCount } = await getIssueCounts();

    const labels = await getIssueLabels();
    const authors = await getIssueAuthors();

    return {
      props: {
        initialIssues: issueData,
        openedCount: openedCount,
        closedCount: closedCount,
        labels: labels,
        authors: authors,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialIssues: [],
        openedCount: -1,
        closedCount: -1,
        labels: [],
      },
    };
  }
}

export async function getIssueCounts() {
  const apiUrlOpen = `https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:issue+state:open&per_page=1`;

  const openedCount = await fetchIssuesFromGithub(apiUrlOpen);

  const apiUrlClosed = `https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:issue+state:closed&per_page=1`;

  const closedCount = await fetchIssuesFromGithub(apiUrlClosed);

  return {
    openedCount: openedCount.total_count,
    closedCount: closedCount.total_count,
  };
}

async function getIssueLabels() {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/labels`;

  return await fetchIssuesFromGithub(apiUrl);
}

async function getIssueAuthors() {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contributors`;

  return await fetchIssuesFromGithub(apiUrl);
}

export async function fetchIssuesByFilter(filter) {
  let apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;

  if (filter.type === "Author") {
    apiUrl += `?creator=${filter.value}`;
  } else if (filter.type === "Label") {
    apiUrl += `?labels=${filter.value}`;
  }

  return await fetchIssuesFromGithub(apiUrl);
}

export async function fetchIssuesBySort(sortType) {
  let apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues?sort=${sortType}`;

  return await fetchIssuesFromGithub(apiUrl);
}
