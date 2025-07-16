import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GroupCreate.css";
import logo from "../assets/logo.svg";
import stateActive from "../assets/state=active.svg";
import stateDefault from "../assets/state=default.svg";

const GroupCreate = ({ onGroupCreate }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [fileName, setFileName] = useState("파일을 선택해 주세요");
  const [isImageFile, setIsImageFile] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const togglePrivacy = () => {
    setIsPublic(!isPublic);
  };

  const handleFileButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setIsImageFile(true);
      setImageFile(URL.createObjectURL(file));
    } else {
      setFileName("이미지 파일만 업로드할 수 있습니다.");
      setIsImageFile(false);
      setImageFile(null);
    }
  };

  const handleCreateGroupClick = (event) => {
    event.preventDefault();

    const newGroup = {
      name: groupName,
      description: groupDescription,
      isPublic,
      imageFile,
      date: new Date(),
    };

    onGroupCreate(newGroup);
    navigate("/");
  };

  return (
    <div className="group-creation-container">
      <div className="header-banner">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h1 className="title">그룹 만들기</h1>
      <form className="group-form" onSubmit={handleCreateGroupClick}>
        <div className="form-group">
          <label>그룹명</label>
          <input
            type="text"
            placeholder="그룹명을 입력해 주세요"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>대표 이미지</label>
          <div className={`file-upload-wrapper ${isImageFile ? "active" : ""}`}>
            <input
              type="file"
              id="fileInput"
              className="file-upload-input"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <input
              type="text"
              placeholder="파일을 선택해 주세요"
              className={`file-upload-text ${isImageFile ? "active" : ""}`}
              value={fileName}
              disabled
            />
            <button
              type="button"
              className="file-upload-button"
              onClick={handleFileButtonClick}
            >
              파일 선택
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>그룹 소개</label>
          <textarea
            placeholder="그룹 소개를 입력해 주세요"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>그룹 공개 선택</label>
          <div className="toggle-group">
            <span>{isPublic ? "공개" : "비공개"}</span>
            <div className="toggle-icon-wrapper" onClick={togglePrivacy}>
              <img
                src={isPublic ? stateActive : stateDefault}
                alt="Toggle Icon"
                className="toggle-icon"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="group-submit">
          만들기
        </button>
      </form>
    </div>
  );
};

export default GroupCreate;
