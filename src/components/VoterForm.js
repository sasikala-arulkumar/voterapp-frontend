
import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import "./VoterForm.css";

const VoterForm = ({ voters = [], setVoters = () => {} }) => {
  const [formData, setFormData] = useState({
    sno: "",
    voterName: "",
    familyHead: "",
    wifeName: "",
    age: "",
    gender: "",
    aadhaarNumber: "",
    phoneNumber: "",
    maritalStatus: "",
    work: "",
    area: "",
    address: "",
    voterId: "",
    rationCardNo: "",
    disability: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload photo
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Capture photo from webcam
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData({ ...formData, photo: imageSrc });
  };

  // Voice input
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
      setFormData((prev) => ({ ...prev, [fieldName]: speechResult }));
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Voice input error: " + event.error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://sasikalaarul-voterapp.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const savedVoter = await response.json();

      setVoters([...voters, savedVoter]);
      alert("✅ Voter saved successfully!");

      setFormData({
        sno: "",
        voterName: "",
        familyHead: "",
        wifeName: "",
        age: "",
        gender: "",
        aadhaarNumber: "",
        phoneNumber: "",
        maritalStatus: "",
        work: "",
        area: "",
        address: "",
        voterId: "",
        rationCardNo: "",
        disability: "",
        photo: null,
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save voter: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Render input/select with optional voice
  const renderInput = (label, name, type = "text", options = [], voice = true) => {
    if (type === "select") {
      return (
        <div className="form-group">
          <label>{label}</label>
          <select name={name} value={formData[name]} onChange={handleChange}>
            <option value="">-- Select --</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "8px" }}>{label}</label>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
        />
        {voice && type !== "number" && (
          <button
            type="button"
            style={{ marginLeft: "8px" }}
            onClick={() => startVoiceRecognition(name)}
          >
            🎤
          </button>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>🧑 Personal Info</h3>
      {renderInput("Serial No", "sno")}
      {renderInput("Voter Name", "voterName")}
      {renderInput("Family Head", "familyHead")}
      {renderInput("Wife's Name", "wifeName")}
      {renderInput("Age", "age", "number", [], false)}
      {renderInput("Gender", "gender", "select", ["Male", "Female", "Other"], false)}
      {renderInput("Marital Status", "maritalStatus", "select", ["Single", "Married", "Widowed"], false)}
      {renderInput("Disability", "disability", "select", ["Yes", "No"], false)}

      <h3>📞 Contact Info</h3>
      {renderInput("Phone Number", "phoneNumber")}
      {renderInput("Area", "area")}
      {renderInput("Address", "address")}
      {renderInput("Work", "work")}

      <h3>🆔 ID Details</h3>
      {renderInput("Aadhaar Number", "aadhaarNumber")}
      {renderInput("Voter ID", "voterId")}
      {renderInput("Ration Card No", "rationCardNo")}

      <label>Photo:</label>
      <div>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      </div>

      <h4>Or capture live:</h4>
      {!formData.photo && (
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

      {formData.photo && (
        <div>
          <img src={formData.photo} alt="" width={100} />

          <button
            type="button"
            onClick={() => setFormData({ ...formData, photo: null })}
          >
            Retake / Remove
          </button>
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "⏳ Saving..." : "💾 Save Voter"}
      </button>
    </form>
  );
};

export default VoterForm;
