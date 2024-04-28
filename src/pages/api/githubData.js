const owner = "Trendyol";
const repo = "baklava";
const accessToken = "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";

const getIssueData = async () => {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;

  const response = await fetch(apiUrl, {
    headers: { Authorization: `token ${accessToken}` },
  });

  return await response.json();
};

export async function getServerSideProps(context) {
  try {
    const issueData = await getIssueData();
    const { openedCount, closedCount, labels } = await getIssueCount();

    return {
      props: {
        issues: issueData,
        openedCount: openedCount,
        closedCount: closedCount,
        labels: labels,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        issues: [],
      },
    };
  }
}

export async function getIssueCount() {
  try {
    const openResponse = await fetch(
      `https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:issue+state:open&per_page=1`,
      {
        headers: { Authorization: `token ${accessToken}` },
      }
    );
    const openData = await openResponse.json();
    const openedCount = openData.total_count;

    const closedResponse = await fetch(
      `https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:issue+state:closed&per_page=1`,
      {
        headers: { Authorization: `token ${accessToken}` },
      }
    );

    const labelData = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/labels`,
      {
        headers: { Authorization: `token ${accessToken}` },
      }
    );

    const labels = await labelData.json();

    const closedData = await closedResponse.json();
    const closedCount = closedData.total_count;

    return { openedCount, closedCount, labels };
  } catch (error) {
    console.error("Error:", error);
    return { openedCount: -1, closedCount: -1 };
  }
}
