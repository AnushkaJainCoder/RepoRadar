import React, { useState } from 'react';

import "./style.css";

export default function Search() {
    const [gitreponame, setRepoName] = useState("");
    const [repos, setRepo] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [githubid, setGithubId] = useState({});

    function fetchRepo(event) {
        event.preventDefault();
        console.log("fetch");

        const url = `https://api.github.com/users/${gitreponame}/followers`;
        const url1 = `https://api.github.com/users/${gitreponame}/repos`;
        const url2 = `https://api.github.com/users/${gitreponame}`;

        setFollowers([]);
        setRepo([]);
        setGithubId({}); // Clear the existing data

        fetch(url)
            .then(res => res.json())
            .then(data => setFollowers(data));

        fetch(url1)
            .then(res => res.json())
            .then(data => setRepo(data));

        fetch(url2)
            .then(res => res.json())
            .then(data => setGithubId(data));
    }

    function handleInput(event) {
        console.log(event);
        setRepoName(event.target.value);
    }

    return (
        <>
            <form action="" className="form" onSubmit={fetchRepo}>
                <input
                    name='query'
                    type="text"
                    className="label"
                    onChange={handleInput}
                    placeholder="GitHub user lookup......."
                    value={gitreponame}
                />
                <button className="button" type="submit">Search</button>
            </form>

           


            <div className='fl'>
            <div className='repo'>
                    <h1>GitHub User Information</h1>
                    {githubid.login !== undefined ? (
                        <div>
                            
                            {/* <p>Id: {githubid.id}</p> */}
                            
                            <p>Username: {githubid.login}</p>
                            <p>Followers: {githubid.followers}</p>
                            <p>Following: {githubid.following}</p>
                            <p>public_repos: {githubid.public_repos}</p>
                            
                        </div>
                    ) : (
                        <p>No user information found</p>
                    )}
                </div>
                <div className='repo'>
                    <h1>Repositories</h1>
                    {Array.isArray(repos) ? (
                        repos.map((repo) => (
                            
                            <li key={repo.name}><br />
                                <b>Name:</b> {repo.name} <br />
                                <b>Description:</b> {repo.description} <br />
                                <b>Created At:</b> {repo.created_at} <br />
                                <b>Language:</b> {repo.language} <br />
                            </li>
                        ))
                    ) : (
                        <p>No repositories found</p>
                    )}
                </div>

                <div className='repo'>
                    <h1>Followers</h1>
                    {Array.isArray(followers) ? (
                        followers.map((follower) => (
                            <li key={follower.login}>{follower.login}</li>
                        ))
                    ) : (
                        <p >No follower found</p>
                    )}
                </div>

                
            </div>
        </>
    )
}
