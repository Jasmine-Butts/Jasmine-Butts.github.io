document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('github-username');
    const searchButton = document.getElementById('search-button');
    const gallery = document.getElementById('gallery');
    const defaultUsername = 'Jasmine-Butts';

    // fetch GitHub repositories
    async function fetchRepositories(username) {
        const apiUrl = `https://api.github.com/users/${username}/repos?sort=pushed&per_page=20`;
        const token = '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';

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `token ${token}`
                }
            });

            if (response.status === 404) {
                gallery.innerHTML = '<p class="error">User not found. Please check the username and try again.</p>';
                return;
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const repositories = await response.json();
            displayRepositories(repositories);
        } catch (error) {
            console.error('Error fetching repositories', error);
            gallery.innerHTML =
                '<p class="error">Could not fetch repositories. Please check the username and your internet connection.</p>';
        }
    }

    function displayRepositories(repos) {
        gallery.innerHTML = '';

        if (repos.length === 0) {
            gallery.innerHTML = '<p>No repositories found for this user.</p>';
            return;
        }

        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.classList.add('repo-card');

            // repo name
            const title = document.createElement('h3');

            const icon = document.createElement('i');
            icon.className = 'fa-brands fa-square-github fa-xl';
            icon.style.color = '#139a45';
            icon.style.marginRight = '5px';
            title.appendChild(icon);

            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = repo.name;
            repoLink.target = '_blank';
            title.appendChild(repoLink);
            repoCard.appendChild(title);

            // description
            const description = document.createElement('div');
            description.classList.add('description');
            description.textContent = repo.description ? repo.description : 'No description';
            repoCard.appendChild(description);

            if (repo.description && repo.description.length > 100) {
                description.textContent = repo.description.substring(0, 100) + '...';
                
                const readMoreButton = document.createElement('div');
                readMoreButton.classList.add('read-more');
                readMoreButton.textContent = 'Read More';
                repoCard.appendChild(readMoreButton);

                readMoreButton.addEventListener('click', () => {
                repoCard.classList.toggle('expanded');
                description.textContent = repoCard.classList.contains('expanded')
                    ? repo.description
                    : repo.description.substring(0, 100) + '...';
                readMoreButton.textContent = repoCard.classList.contains('expanded') ? 'Read Less' : 'Read More';
                });
            }

            // creation date
            const creationDate = new Date(repo.created_at).toLocaleDateString();
            const creationDatePara = document.createElement('p');
            creationDatePara.textContent = `Created: ${creationDate}`;
            repoCard.appendChild(creationDatePara);
            
            // updated date
            const updateDate = new Date(repo.pushed_at).toLocaleDateString();
            const updateDatePara = document.createElement('p');
            updateDatePara.textContent = `Updated: ${updateDate}`;
            repoCard.appendChild(updateDatePara);
            
            // fetching # of commits
            async function fetchCommits(owner, repoName) {
                try {
                    const commitsUrl = `https://api.github.com/repos/${owner}/${repoName}/commits`;
                    const response = await fetch(commitsUrl);
                    if (!response.ok) {
                        console.warn('Could not fetch commit count for:', repoName, response.status);
                        return '-';
                    }
                    const commits = await response.json();
                    return commits.length;
                } catch (error) {
                    console.error('Error fetching commit count.', error);
                    return '-';
                }
            }

            fetchCommits(repo.owner.login, repo.name).then(commitCount => {
                const commitsPara = document.createElement('p');
                commitsPara.textContent = `Commits: ${commitCount}`;
                repoCard.appendChild(commitsPara);
            });
            

            async function fetchLanguages(languagesUrl) {
                try {
                    const response = await fetch(languagesUrl);
                    if (!response.ok) {
                        console.warn('Could not fetch languages for:', repoName, response.status);
                        return [];
                    }
                    const languagesData = await response.json();
                    return Object.keys(languagesData);
                } catch (error) {
                    console.error('Error fetching languages:', error);
                    return [];
                }
            } 
        
            fetchLanguages(repo.languages_url).then(languages => {
                if (languages.length > 0) {
                    const languagesPara = document.createElement('p');
                    languagesPara.classList.add('languages');
                    languagesPara.textContent = `Languages: ${languages.join(', ')}`;
                    repoCard.appendChild(languagesPara);
                } else if (languages.length === 0){
                    const languagesPara = document.createElement('p');
                    languagesPara.classList.add('languages');
                    languagesPara.textContent = `Languages:`;
                    repoCard.appendChild(languagesPara);
                }
            });

            const watchersPara = document.createElement('p');
            watchersPara.textContent = `Watchers: ${repo.watchers_count}`;
            repoCard.appendChild(watchersPara);

            gallery.appendChild(repoCard);
        
                gallery.appendChild(repoCard);
            }); // end for-each
    } // end display

    searchButton.addEventListener('click', () => {
        const username = usernameInput.value.trim() || defaultUsername;
        fetchRepositories(username);
    });

    fetchRepositories(defaultUsername);
});
