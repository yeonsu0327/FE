import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/PrivateMemoryAccess.css";
import Logo from "../assets/logo.svg"; // 로고 이미지를 import

const PrivateMemoryAccess = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 검증 로직을 추가할 수 있습니다.
    console.log("Password submitted:", password);
  };

  return (
    <div className="private-memory-access-wrapper">
      <img src={Logo} alt="조각집 로고" className="not-found-logo" />
      <div className="private-memory-access-container">
        <div className="access-content">
          <h2>비공개 추억</h2>
          <p>비공개 추억에 접근하기 위해 접근 권한 확인이 필요합니다.</p>
          <form onSubmit={handleSubmit} className="access-form">
            <label htmlFor="password">비밀번호를 입력해 주세요</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary mt-3">
              제출하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrivateMemoryAccess;
