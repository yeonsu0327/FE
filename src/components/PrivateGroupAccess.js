import React, { useState } from "react";
import "../styles/PrivateGroupAccess.css";

function PrivateGroupAccess({ group }) {
  const [inputPassword, setInputPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputPassword === group.password) {
      setAccessGranted(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  if (accessGranted) {
    return (
      <div className="group-page">
        <h2>{group.name}</h2>
        <p>{group.description}</p>
      </div>
    );
  }

  return (
    <div className="private-group-access">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="비밀번호"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <button type="submit">접근하기</button>
      </form>
    </div>
  );
}

export default PrivateGroupAccess;
