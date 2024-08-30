import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MemoryCreationPage.css";
import logo from "../assets/logo.svg";
import stateActive from "../assets/state=active.svg";
import stateDefault from "../assets/state=default.svg";

function MemoryCreationPage() {
  const [isPublic, setIsPublic] = useState(true);
  const [fileName, setFileName] = useState("파일을 선택해 주세요");
  const [isImageFile, setIsImageFile] = useState(false);
  const [momentInput, setMomentInput] = useState("");
  const [tags, setTags] = useState([]);
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [place, setPlace] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [password, setPassword] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const togglePrivacy = () => {
    setIsPublic(!isPublic);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setIsImageFile(true);
      setImageFile(URL.createObjectURL(file)); // 이미지 파일의 URL 생성하여 상태에 저장
    } else {
      setFileName("이미지 파일만 업로드할 수 있습니다.");
      setIsImageFile(false);
      setImageFile(null);
    }
  };

  const handleMomentChange = (event) => {
    setMomentInput(event.target.value);
  };

  const handleTagKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const tagText = event.target.value.trim().split(" ")[0];
      if (tagText && !tags.includes(tagText) && tags.length < 30) {
        setTags([...tags, tagText]);
        event.target.value = "";
      }
    }
  };

  const handleTagClick = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate(`/memory/${title}`, {
      state: {
        nickname,
        title,
        imageFile,
        content,
        tags,
        place,
        momentInput,
        isPublic,
        password,
      },
    });
  };

  return (
    <div>
      <div className="header-banner">
        <img src={logo} alt="조각집 로고" className="logo" />
      </div>
      <div className="memory-creation-container">
        <h1 className="title">추억 올리기</h1>
        <form onSubmit={handleSubmit} className="memory-form">
          {/* 왼쪽 섹션 */}
          <div className="left-section">
            <div className="form-group">
              <label>닉네임</label>
              <input
                type="text"
                placeholder="닉네임을 입력해 주세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                placeholder="제목을 입력해 주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>이미지</label>
              <div
                className={`file-upload-wrapper ${isImageFile ? "active" : ""}`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="file-upload-input"
                  accept="image/*"
                  onChange={handleFileChange}
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
              <label>본문</label>
              <textarea
                placeholder="본문 내용을 입력해 주세요"
                className="textarea-fixed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          {/* 오른쪽 섹션 */}
          <div className="right-section">
            <div className="form-group">
              <label>태그</label>
              <input
                type="text"
                placeholder="태그를 입력해 주세요"
                onKeyPress={handleTagKeyPress}
              />
              <div className="tags-wrapper">
                {tags.map((tag, index) => (
                  <div
                    className="tag"
                    key={index}
                    onClick={() => handleTagClick(tag)}
                  >
                    {`#${tag}`}
                    <span className="tag-remove">X</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>장소</label>
              <input
                type="text"
                placeholder="장소를 입력해 주세요"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>추억의 순간</label>
              <input
                type="date"
                className={`moment-input ${momentInput ? "active" : ""}`}
                value={momentInput}
                onChange={handleMomentChange}
              />
            </div>
            <div className="form-group">
              <label>추억 공개 선택</label>
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
          </div>
          <div className="divider"></div> {/* 중앙 세로선 */}
          <button type="submit" className="memory-submit">
            올리기
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemoryCreationPage;
