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
    // Github API'den issues verilerini al
    const issueData = await getIssueData();

    // Github API'den issue sayılarını ve etiketleri al
    const { openedCount, closedCount, labels, authors } = await getIssueCount();

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

    const authorsData = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors`,
      {
        headers: { Authorization: `token ${accessToken}` },
      }
    );

    const authors = await authorsData.json();

    const closedData = await closedResponse.json();
    const closedCount = closedData.total_count;

    return { openedCount, closedCount, labels, authors };
  } catch (error) {
    console.error("Error:", error);
    return { openedCount: -1, closedCount: -1 };
  }
}

export async function fetchIssuesByFilter(filter) {
  try {
    let apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`

    if (filter.type === "Author") {
      apiUrl += `?creator=${filter.value}`;
    } else if (filter.type === "Label") {
      apiUrl += `?labels=${filter.value}`;
    }

    const response = await fetch(apiUrl, {
      headers: { Authorization: `token ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch issues from Github API");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error fetching issues:", error);
  }
}
