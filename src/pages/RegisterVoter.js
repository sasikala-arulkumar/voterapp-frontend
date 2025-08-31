import VoterForm from "../components/VoterForm";

const RegisterVoter = ({ voters, setVoters }) => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Register New Voter</h2>
      <VoterForm voters={voters} setVoters={setVoters} />
    </div>
  );
};

export default RegisterVoter;
