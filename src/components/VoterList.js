// import React, { useState, useRef, useEffect } from "react";
// import axiosInstance from "../api/axiosConfig"; // axios instance
// import Webcam from "react-webcam";
// import "./VoterList.css";

// const VoterList = ({ voters = [], setVoters = () => {} }) => {
//   const [searchFamily, setSearchFamily] = useState("");
//   const [genderFilter, setGenderFilter] = useState("");
//   const [disabilityFilter, setDisabilityFilter] = useState("");
//   const [areaFilter, setAreaFilter] = useState("");

//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editedVoter, setEditedVoter] = useState({});
//   const webcamRef = useRef(null);

//   // Fetch voters on load
//   useEffect(() => {
//     const fetchVoters = async () => {
//       try {
//         const res = await axiosInstance.get("/");
//         setVoters(res.data);
//       } catch (err) {
//         console.error("Error fetching voters:", err);
//       }
//     };

//     fetchVoters();
//   }, [setVoters]);

//   // Delete voter from DB
//   const deleteVoter = async (id) => {
//     try {
//       await axiosInstance.delete(`/${id}`);
//       setVoters((prev) => prev.filter((v) => v._id !== id));
//     } catch (err) {
//       console.error("Error deleting voter:", err);
//     }
//   };

//   // Edit voter locally
//   const handleEditVoter = (index) => {
//     setEditingIndex(index);
//     setEditedVoter({ ...filteredVoters[index] });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedVoter({ ...editedVoter, [name]: value });
//   };

//   // Save edited voter to DB
//   const saveEditedVoter = async () => {
//     try {
//       const res = await axiosInstance.put(`/${editedVoter._id}`, editedVoter);
//       setVoters((prev) =>
//         prev.map((v) => (v._id === res.data._id ? res.data : v))
//       );
//       setEditingIndex(null);
//     } catch (err) {
//       console.error("Error updating voter:", err);
//     }
//   };

//   const cancelEdit = () => setEditingIndex(null);

//   // Capture photo
//   const capturePhoto = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setEditedVoter({ ...editedVoter, photo: imageSrc });
//   };

//   // Filter voters
//   const filteredVoters = voters.filter((voter) => {
//     const matchesFamily =
//       (voter.familyHead || "")
//         .toLowerCase()
//         .includes(searchFamily.toLowerCase());
//     const matchesGender = genderFilter
//       ? (voter.gender || "").toLowerCase() === genderFilter.toLowerCase()
//       : true;
//     const matchesDisability = disabilityFilter
//       ? (voter.disability || "").toLowerCase() === disabilityFilter.toLowerCase()
//       : true;
//     const matchesArea = areaFilter
//       ? (voter.area || "").toLowerCase().includes(areaFilter.toLowerCase().trim())
//       : true;
//     return matchesFamily && matchesGender && matchesDisability && matchesArea;
//   });

//   // Voice input for edit modal
//   const startVoiceRecognition = (fieldName) => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Your browser does not support voice recognition!");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.start();

//     recognition.onresult = (event) => {
//       const speechResult = event.results[0][0].transcript;
//       setEditedVoter((prev) => ({ ...prev, [fieldName]: speechResult }));
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       alert("Voice input error: " + event.error);
//     };
//   };

//   // Render edit inputs
//   const renderEditInput = (label, name, type = "text", options = [], voice = true) => {
//     if (type === "select") {
//       return (
//         <label>
//           {label}:
//           <select name={name} value={editedVoter[name] || ""} onChange={handleChange}>
//             <option value="">-- Select --</option>
//             {options.map((opt) => (
//               <option key={opt} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         </label>
//       );
//     }

//     return (
//       <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//         {label}:
//         <input
//           type={type}
//           name={name}
//           value={editedVoter[name] || ""}
//           onChange={handleChange}
//         />
//         {voice && type !== "number" && (
//           <button type="button" onClick={() => startVoiceRecognition(name)}>
//             🎤
//           </button>
//         )}
//       </label>
//     );
//   };

//   return (
//     <div className="voter-list">
//       <h2>Voter List</h2>

//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search by Family Head"
//           value={searchFamily}
//           onChange={(e) => setSearchFamily(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Search by Area"
//           value={areaFilter}
//           onChange={(e) => setAreaFilter(e.target.value)}
//         />
//         <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
//           <option value="">All Genders</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <select
//           value={disabilityFilter}
//           onChange={(e) => setDisabilityFilter(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//       </div>

//       <h3>
//         Total Voters: {voters.length} | Showing: {filteredVoters.length}
//       </h3>

//       {filteredVoters.length > 0 ? (
//         <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Voter’s Name</th>
//               <th>Family Head</th>
//               <th>Wife’s Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//               <th>Disability</th>
//               <th>Aadhaar Number</th>
//               <th>Phone Number</th>
//               <th>Marital Status</th>
//               <th>Work</th>
//               <th>Area</th>
//               <th>Address</th>
//               <th>Voter ID</th>
//               <th>Ration Card No</th>
//               <th>Photo</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredVoters.map((voter, index) => (
//               <tr key={voter._id}>
//                 <td>{voter.sno}</td>
//                 <td>{voter.voterName}</td>
//                 <td>{voter.familyHead}</td>
//                 <td>{voter.wifeName}</td>
//                 <td>{voter.age}</td>
//                 <td>{voter.gender}</td>
//                 <td>{voter.disability}</td>
//                 <td>{voter.aadhaarNumber}</td>
//                 <td>{voter.phoneNumber}</td>
//                 <td>{voter.maritalStatus}</td>
//                 <td>{voter.work}</td>
//                 <td>{voter.area}</td>
//                 <td>{voter.address}</td>
//                 <td>{voter.voterId}</td>
//                 <td>{voter.rationCardNo}</td>
//                 <td>
//                   {voter.photo && <img src={voter.photo} alt="voter profile" width={50} />}
//                 </td>
//                 <td>
//                   <button onClick={() => handleEditVoter(index)}>Edit</button>
//                   <button onClick={() => deleteVoter(voter._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         </div>
//       ) : (
//         <p>No voters found</p>
//       )}

//       {/* Edit Modal */}
//       {editingIndex !== null && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>Edit Voter</h3>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 saveEditedVoter();
//               }}
//             >
//               {renderEditInput("Serial No", "sno")}
//               {renderEditInput("Voter Name", "voterName")}
//               {renderEditInput("Family Head", "familyHead")}
//               {renderEditInput("Wife's Name", "wifeName")}
//               {renderEditInput("Age", "age", "number", [], false)}
//               {renderEditInput("Gender", "gender", "select", ["Male", "Female", "Other"], false)}
//               {renderEditInput("Marital Status", "maritalStatus", "select", ["Single", "Married", "Widowed"], false)}
//               {renderEditInput("Disability", "disability", "select", ["Yes", "No"], false)}
//               {renderEditInput("Phone Number", "phoneNumber")}
//               {renderEditInput("Area", "area")}
//               {renderEditInput("Address", "address")}
//               {renderEditInput("Work", "work")}
//               {renderEditInput("Aadhaar Number", "aadhaarNumber")}
//               {renderEditInput("Voter ID", "voterId")}
//               {renderEditInput("Ration Card No", "rationCardNo")}

//               <label>Photo:</label>
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       const reader = new FileReader();
//                       reader.onloadend = () =>
//                         setEditedVoter({ ...editedVoter, photo: reader.result });
//                       reader.readAsDataURL(file);
//                     }
//                   }}
//                 />
//               </div>

//               <h4>Or capture live:</h4>
//               {!editedVoter.photo && (
//                 <div>
//                   <Webcam
//                     audio={false}
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     width={200}
//                     height={200}
//                     videoConstraints={{ facingMode: "user" }}
//                   />
//                   <button type="button" onClick={capturePhoto}>
//                     Capture
//                   </button>
//                 </div>
//               )}

//               {editedVoter.photo && (
//                 <div>
//                   <img src={editedVoter.photo} alt="" width={100} />
//                   <button
//                     type="button"
//                     onClick={() => setEditedVoter({ ...editedVoter, photo: null })}
//                   >
//                     Retake / Remove
//                   </button>
//                 </div>
//               )}

//               <div className="modal-buttons">
//                 <button type="submit">Save</button>
//                 <button type="button" onClick={cancelEdit}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoterList;
import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../api/axiosConfig"; // axios instance
import Webcam from "react-webcam";
import "./VoterList.css";

const VoterList = ({ voters = [], setVoters = () => {} }) => {
  const [searchFamily, setSearchFamily] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [disabilityFilter, setDisabilityFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedVoter, setEditedVoter] = useState({});
  const webcamRef = useRef(null);

  // Fetch voters on load
  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const res = await axiosInstance.get("/api/voters");
        setVoters(res.data);
      } catch (err) {
        console.error("Error fetching voters:", err);
      }
    };
    fetchVoters();
  }, [setVoters]);

  // Delete voter from DB
  const deleteVoter = async (id) => {
    try {
      await axiosInstance.delete(`/api/voters/${id}`);
      setVoters((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Error deleting voter:", err);
    }
  };

  // Edit voter locally
  const handleEditVoter = (index) => {
    setEditingIndex(index);
    setEditedVoter({ ...filteredVoters[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedVoter({ ...editedVoter, [name]: value });
  };

  // Save edited voter to DB
  const saveEditedVoter = async () => {
    try {
      const res = await axiosInstance.put(`/api/voters/${editedVoter._id}`, editedVoter);
      setVoters((prev) =>
        prev.map((v) => (v._id === res.data._id ? res.data : v))
      );
      setEditingIndex(null);
    } catch (err) {
      console.error("Error updating voter:", err);
    }
  };

  const cancelEdit = () => setEditingIndex(null);

  // Capture photo
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setEditedVoter({ ...editedVoter, photo: imageSrc });
  };

  // Filter voters
  const filteredVoters = voters.filter((voter) => {
    const matchesFamily =
      (voter.familyHead || "")
        .toLowerCase()
        .includes(searchFamily.toLowerCase());
    const matchesGender = genderFilter
      ? (voter.gender || "").toLowerCase() === genderFilter.toLowerCase()
      : true;
    const matchesDisability = disabilityFilter
      ? (voter.disability || "").toLowerCase() ===
        disabilityFilter.toLowerCase()
      : true;
    const matchesArea = areaFilter
      ? (voter.area || "")
          .toLowerCase()
          .includes(areaFilter.toLowerCase().trim())
      : true;
    return matchesFamily && matchesGender && matchesDisability && matchesArea;
  });

  // Voice input for edit modal
  const startVoiceRecognition = (fieldName) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setEditedVoter((prev) => ({ ...prev, [fieldName]: speechResult }));
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Voice input error: " + event.error);
    };
  };

  // Render edit inputs
  const renderEditInput = (
    label,
    name,
    type = "text",
    options = [],
    voice = true
  ) => {
    if (type === "select") {
      return (
        <label>
          {label}:
          <select
            name={name}
            value={editedVoter[name] || ""}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      );
    }

    return (
      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {label}:
        <input
          type={type}
          name={name}
          value={editedVoter[name] || ""}
          onChange={handleChange}
        />
        {voice && type !== "number" && (
          <button type="button" onClick={() => startVoiceRecognition(name)}>
            🎤
          </button>
        )}
      </label>
    );
  };

  return (
    <div className="voter-list">
      <h2>Voter List</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by Family Head"
          value={searchFamily}
          onChange={(e) => setSearchFamily(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Area"
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value)}
        />
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={disabilityFilter}
          onChange={(e) => setDisabilityFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <h3>
        Total Voters: {voters.length} | Showing: {filteredVoters.length}
      </h3>

      {filteredVoters.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Voter’s Name</th>
                <th>Family Head</th>
                <th>Wife’s Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Disability</th>
                <th>Aadhaar Number</th>
                <th>Phone Number</th>
                <th>Marital Status</th>
                <th>Work</th>
                <th>Area</th>
                <th>Address</th>
                <th>Voter ID</th>
                <th>Ration Card No</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVoters.map((voter, index) => (
                <tr key={voter._id}>
                  <td data-label="S.No">{voter.sno}</td>
                  <td data-label="Voter’s Name">{voter.voterName}</td>
                  <td data-label="Family Head">{voter.familyHead}</td>
                  <td data-label="Wife’s Name">{voter.wifeName}</td>
                  <td data-label="Age">{voter.age}</td>
                  <td data-label="Gender">{voter.gender}</td>
                  <td data-label="Disability">{voter.disability}</td>
                  <td data-label="Aadhaar Number">{voter.aadhaarNumber}</td>
                  <td data-label="Phone Number">{voter.phoneNumber}</td>
                  <td data-label="Marital Status">{voter.maritalStatus}</td>
                  <td data-label="Work">{voter.work}</td>
                  <td data-label="Area">{voter.area}</td>
                  <td data-label="Address">{voter.address}</td>
                  <td data-label="Voter ID">{voter.voterId}</td>
                  <td data-label="Ration Card No">{voter.rationCardNo}</td>
                  <td data-label="Photo">
                    {voter.photo && (
                      <img src={voter.photo} alt="voter profile" width={50} />
                    )}
                  </td>
                  <td data-label="Action">
                    <button onClick={() => handleEditVoter(index)}>Edit</button>
                    <button onClick={() => deleteVoter(voter._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No voters found</p>
      )}

      {/* Edit Modal */}
      {editingIndex !== null && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Voter</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveEditedVoter();
              }}
            >
              {renderEditInput("Serial No", "sno")}
              {renderEditInput("Voter Name", "voterName")}
              {renderEditInput("Family Head", "familyHead")}
              {renderEditInput("Wife's Name", "wifeName")}
              {renderEditInput("Age", "age", "number", [], false)}
              {renderEditInput("Gender", "gender", "select", ["Male", "Female", "Other"], false)}
              {renderEditInput("Marital Status", "maritalStatus", "select", ["Single", "Married", "Widowed"], false)}
              {renderEditInput("Disability", "disability", "select", ["Yes", "No"], false)}
              {renderEditInput("Phone Number", "phoneNumber")}
              {renderEditInput("Area", "area")}
              {renderEditInput("Address", "address")}
              {renderEditInput("Work", "work")}
              {renderEditInput("Aadhaar Number", "aadhaarNumber")}
              {renderEditInput("Voter ID", "voterId")}
              {renderEditInput("Ration Card No", "rationCardNo")}

              <label>Photo:</label>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setEditedVoter({
                          ...editedVoter,
                          photo: reader.result,
                        });
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <h4>Or capture live:</h4>
              {!editedVoter.photo && (
                <div>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={200}
                    height={200}
                    videoConstraints={{ facingMode: "user" }}
                  />
                  <button type="button" onClick={capturePhoto}>
                    Capture
                  </button>
                </div>
              )}

              {editedVoter.photo && (
                <div>
                  <img src={editedVoter.photo} alt="" width={100} />
                  <button
                    type="button"
                    onClick={() =>
                      setEditedVoter({ ...editedVoter, photo: null })
                    }
                  >
                    Retake / Remove
                  </button>
                </div>
              )}

              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoterList;
