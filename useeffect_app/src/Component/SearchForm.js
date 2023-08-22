import React, { useState, useEffect } from "react";
import axios from "axios";
import RepoList from "./RepoList";

function SearchForm() {
  const [username, setUsername] = useState("");
  const [originalUserDetails, setOriginalUserDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [repos, setRepos] = useState([]);

  const handleFind = () => {
    const filterData = originalUserDetails.filter((user) => {
      return user.name.includes(username);
    });
    setUserDetails(filterData);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`
        );
        console.log(userResponse.data);
        setOriginalUserDetails([userResponse.data]); // Save the data in originalUserDetails

        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        console.log(reposResponse.data);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div>
      <div>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleFind}>Find</button>
      </div>
      <h2>{username}</h2>
      {userDetails.length > 0 && (
        <div>
          <p>Name:{userDetails[0].name}</p>
          <p>Followers: {userDetails[0].followers}</p>
          <p>Repos: {userDetails[0].public_repos}</p>
          <p>Following: {userDetails[0].following}</p>
        </div>
      )}

      <RepoList repos={repos} />
    </div>
  );
}

export default SearchForm;
