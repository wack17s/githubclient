export function dumpRepos(repos = []) {
    return repos.map(item => dumpRepo(item));
}

function dumpRepo(repo) {
    const { html_url, name, stargazers_count, forks_count, open_issues_count, owner, created_at, updated_at,
        description } = repo;

    return {
        url: html_url,
        name,
        owner: owner.login,
        description,
        stars: stargazers_count,
        forks: forks_count,
        issues: open_issues_count,
        createdAt: created_at,
        updatedAt: updated_at
    };
}
