import React, { useState, useEffect } from "react";
import axios from "axios";
import RepoList from "./RepoList";

function UserProfile({ username }) {
  const [userDetails, setUserDetails] = useState({});
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserDetails(userResponse.data);

        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        setRepos(reposResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div>
      <h2>{username}</h2>
      <p>Followers: {userDetails.followers}</p>
      <p>Repos: {userDetails.public_repos}</p>
      <p>Following: {userDetails.following}</p>

      <RepoList repos={repos} />
    </div>
  );
}

export default UserProfile;
