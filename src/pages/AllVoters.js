import React from "react";
import VoterList from "../components/VoterList";

const AllVoters = ({ voters, setVoters }) => {
  return (
    <div>
      <h2>All Voters</h2>
      <VoterList voters={voters} setVoters={setVoters} />
    </div>
  );
};

export default AllVoters;
