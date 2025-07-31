const repos = [
  { owner: "your-username", repo: "repo1" },
  { owner: "your-username", repo: "repo2" },
  { owner: "your-username", repo: "repo3" }
];

const container = document.getElementById("projects");

repos.forEach(({ owner, repo }) => {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("README not found");
      return res.text();
    })
    .then(markdown => {
      const section = document.createElement("section");
      section.innerHTML = `
        <h2>${repo}</h2>
        <pre>${markdown}</pre>
      `;
      container.appendChild(section);
    })
    .catch(() => {
      const section = document.createElement("section");
      section.innerHTML = `<h2>${repo}</h2><p style="color:red">README not found</p>`;
      container.appendChild(section);
    });
});
