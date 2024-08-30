import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/MemoryDetailPage.css";
import "../styles/MemoryEditModal.css"; // 동일한 CSS 파일 적용
import "../styles/MemoryDeleteModal.css";
import "../styles/CommentCreationModal.css";
import logo from "../assets/logo.svg";
import stateActive from "../assets/state=active.svg";
import stateDefault from "../assets/state=default.svg";
import likeIcon from "../assets/like.svg";
import likeSmallIcon from "../assets/likesmall.svg";
import commentIcon from "../assets/comment.svg";
import pencilIcon from "../assets/pencil.svg";
import trashBinIcon from "../assets/TrashBin.svg";

const MemoryDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    nickname,
    title,
    content,
    tags,
    momentInput,
    isPublic,
    place,
    imageFile,
  } = location.state || {};

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showCommentEditModal, setShowCommentEditModal] = useState(false);
  const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);

  const [currentNickname, setNickname] = useState(nickname);
  const [currentTitle, setTitle] = useState(title);
  const [currentContent, setContent] = useState(content);
  const [currentTags, setTags] = useState(tags || []);
  const [currentPlace, setPlace] = useState(place);
  const [currentMomentInput, setMomentInput] = useState(momentInput);
  const [currentIsPublic, setIsPublic] = useState(isPublic);
  const [currentImageFile, setImageFile] = useState(imageFile);
  const [fileName, setFileName] = useState(imageFile ? imageFile.name : "");
  const [isImageFile, setIsImageFile] = useState(!!imageFile);
  const [authPassword, setAuthPassword] = useState("");
  const [newCommentNickname, setNewCommentNickname] = useState("");
  const [newCommentPassword, setNewCommentPassword] = useState("");
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [commentPassword, setCommentPassword] = useState(""); // 댓글 삭제 및 수정 시 사용할 비밀번호

  const fileInputRef = useRef(null);

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setImageFile(file);
      setIsImageFile(true);
    } else {
      setFileName("이미지 파일만 업로드할 수 있습니다.");
      setIsImageFile(false);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/memory/update", {
        nickname: currentNickname,
        title: currentTitle,
        content: currentContent,
        tags: currentTags,
        momentInput: currentMomentInput,
        isPublic: currentIsPublic,
        place: currentPlace,
        imageFile: currentImageFile,
        password: authPassword, // 수정 권한 인증
      });

      if (response.data.success) {
        setShowEditModal(false);
        navigate("/memory/123", {
          state: {
            nickname: currentNickname,
            title: currentTitle,
            content: currentContent,
            tags: currentTags,
            momentInput: currentMomentInput,
            isPublic: currentIsPublic,
            place: currentPlace,
            imageFile: currentImageFile,
          },
        });
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("수정 중 오류 발생:", error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentData = {
        id: comments.length,
        author: newCommentNickname,
        date: new Date().toLocaleDateString(),
        text: newComment,
        password: newCommentPassword,
      };
      // 서버로 전송 로직 추가
      try {
        const response = await axios.post("/api/comment/add", newCommentData);
        if (response.data.success) {
          setComments([...comments, newCommentData]);
          setNewComment("");
          setNewCommentNickname("");
          setNewCommentPassword("");
          setShowCommentModal(false);
        }
      } catch (error) {
        console.error("댓글 등록 중 오류 발생:", error);
      }
    }
  };

  const handleCommentEdit = async (event) => {
    event.preventDefault();
    if (editComment.trim() !== "" && selectedComment !== null) {
      // 서버에 댓글 수정 요청
      try {
        const response = await axios.post("/api/comment/edit", {
          id: selectedComment.id,
          text: editComment,
          password: commentPassword,
        });

        if (response.data.success) {
          const updatedComments = comments.map((comment) =>
            comment.id === selectedComment.id
              ? { ...comment, text: editComment }
              : comment
          );
          setComments(updatedComments);
          setEditComment("");
          setCommentPassword("");
          setShowCommentEditModal(false);
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error("댓글 수정 중 오류 발생:", error);
      }
    }
  };

  const handleCommentDelete = async () => {
    if (selectedComment !== null) {
      // 서버에 댓글 삭제 요청
      try {
        const response = await axios.post("/api/comment/delete", {
          id: selectedComment.id,
          password: commentPassword,
        });

        if (response.data.success) {
          const updatedComments = comments.filter(
            (comment) => comment.id !== selectedComment.id
          );
          setComments(updatedComments);
          setShowCommentDeleteModal(false);
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생:", error);
      }
    }
  };

  const openCommentEditModal = (comment) => {
    setSelectedComment(comment);
    setEditComment(comment.text);
    setShowCommentEditModal(true);
  };

  const openCommentDeleteModal = (comment) => {
    setSelectedComment(comment);
    setShowCommentDeleteModal(true);
  };

  return (
    <div className="memory-detail-container">
      <header className="header-banner">
        <img src={logo} alt="조각집 로고" className="logo" />
      </header>
      <div className="memory-actions">
        <span className="memory-edit" onClick={() => setShowEditModal(true)}>
          추억 수정하기
        </span>
        <span
          className="memory-delete"
          onClick={() => setShowDeleteModal(true)}
        >
          추억 삭제하기
        </span>
      </div>

      <main className="memory-content">
        <section className="memory-header">
          <div className="memory-info">
            <span className="memory-category">{nickname}</span>
            <span className="memory-status">
              {isPublic ? "공개" : "비공개"}
            </span>
          </div>
          <h2 className="memory-title">{title}</h2>

          <div className="memory-tags">
            <span>{tags && tags.map((tag) => `#${tag} `)}</span>
          </div>

          <div className="memory-meta">
            <div className="meta-left">
              <span className="memory-place">{place}</span>
              <span className="memory-date">{momentInput}</span>
              <div className="comment-section">
                <img src={commentIcon} alt="Comment" className="comment-icon" />
                <span className="comment-count">{comments.length}</span>
              </div>
              <div className="like-small-container">
                <img
                  src={likeSmallIcon}
                  alt="Like Small"
                  className="like-small-icon"
                />
                <span className="like-count">{likeCount}</span>
              </div>
            </div>
            <div className="like-button-container">
              <img
                src={likeIcon}
                alt="Like"
                className="like-button"
                onClick={handleLikeClick}
              />
            </div>
          </div>
        </section>

        <section className="memory-image">
          <img src={imageFile} alt="Memory" className="image" />
        </section>

        <section className="memory-description">
          <p>{content}</p>
        </section>

        <section className="comments-section">
          <div className="comment-form">
            <button
              className="btn-main"
              onClick={() => setShowCommentModal(true)}
            >
              댓글 등록하기
            </button>
            <h3>댓글</h3>
          </div>
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{comment.date}</span>
                  <div className="comment-actions">
                    <img
                      src={pencilIcon}
                      alt="Edit"
                      className="comment-action-icon"
                      onClick={() => openCommentEditModal(comment)}
                    />
                    <img
                      src={trashBinIcon}
                      alt="Delete"
                      className="comment-action-icon"
                      onClick={() => openCommentDeleteModal(comment)}
                    />
                  </div>
                </div>
                <p className="comment-text">{comment.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* 수정 모달 */}
      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setAuthPassword(""); // 모달 닫힐 때 비밀번호 초기화
        }}
        centered
        className="custom-modal-size"
      >
        <Modal.Header closeButton className="custom-modal-size">
          <Modal.Title>추억 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="memory-creation-container">
            <form className="memory-form" onSubmit={handleEditSubmit}>
              {/* 왼쪽 섹션 */}
              <div className="left-section">
                <div className="form-group">
                  <label>닉네임</label>
                  <input
                    type="text"
                    placeholder="닉네임을 입력해 주세요"
                    value={currentNickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>제목</label>
                  <input
                    type="text"
                    placeholder="제목을 입력해 주세요"
                    value={currentTitle}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>이미지</label>
                  <div
                    className={`file-upload-wrapper ${
                      isImageFile ? "active" : ""
                    }`}
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
                      className={`file-upload-text ${
                        isImageFile ? "active" : ""
                      }`}
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
                    value={currentContent}
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
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const tagText = e.target.value.trim().split(" ")[0];
                        if (tagText && !currentTags.includes(tagText)) {
                          setTags([...currentTags, tagText]);
                          e.target.value = "";
                        }
                      }
                    }}
                  />
                  <div className="tags-wrapper">
                    {currentTags.map((tag, index) => (
                      <div
                        className="tag"
                        key={index}
                        onClick={() =>
                          setTags(currentTags.filter((t) => t !== tag))
                        }
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
                    value={currentPlace}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>추억의 순간</label>
                  <input
                    type="date"
                    className={`moment-input ${
                      currentMomentInput ? "active" : ""
                    }`}
                    value={currentMomentInput}
                    onChange={(e) => setMomentInput(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>추억 공개 선택</label>
                  <div className="toggle-group">
                    <span>{currentIsPublic ? "공개" : "비공개"}</span>
                    <div
                      className="toggle-icon-wrapper"
                      onClick={() => setIsPublic(!currentIsPublic)}
                    >
                      <img
                        src={currentIsPublic ? stateActive : stateDefault}
                        alt="Toggle Icon"
                        className="toggle-icon"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>수정 권한 인증</label>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해 주세요"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="divider"></div> {/* 중앙 세로선 */}
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn-main">
            수정하기
          </button>
        </Modal.Footer>
      </Modal>

      {/* 추억 삭제 모달 */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="custom-delete-modal-size"
      >
        <Modal.Header closeButton>
          <Modal.Title className="delete-modal-title">추억 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>삭제 권한 인증</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCommentDelete} className="delete-btn-main">
            삭제하기
          </button>
        </Modal.Footer>
      </Modal>

      {/* 댓글 등록 모달 */}
      <Modal
        show={showCommentModal}
        onHide={() => setShowCommentModal(false)}
        centered
        className="custom-comment-modal-size"
      >
        <Modal.Header closeButton>
          <Modal.Title>댓글 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>닉네임</label>
            <input
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={newCommentNickname}
              onChange={(e) => setNewCommentNickname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>댓글</label>
            <textarea
              placeholder="댓글을 입력해 주세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={newCommentPassword}
              onChange={(e) => setNewCommentPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCommentSubmit} className="btn-main">
            등록하기
          </button>
        </Modal.Footer>
      </Modal>

      {/* 댓글 수정 모달 */}
      <Modal
        show={showCommentEditModal}
        onHide={() => setShowCommentEditModal(false)}
        centered
        className="custom-comment-modal-size"
      >
        <Modal.Header closeButton>
          <Modal.Title>댓글 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>댓글 수정</label>
            <textarea
              placeholder="댓글을 수정해 주세요"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={commentPassword}
              onChange={(e) => setCommentPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCommentEdit} className="btn-main">
            수정하기
          </button>
        </Modal.Footer>
      </Modal>

      {/* 댓글 삭제 모달 */}
      <Modal
        show={showCommentDeleteModal}
        onHide={() => setShowCommentDeleteModal(false)}
        centered
        className="custom-comment-modal-size"
      >
        <Modal.Header closeButton>
          <Modal.Title>댓글 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>삭제 권한 인증</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={commentPassword}
              onChange={(e) => setCommentPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCommentDelete} className="btn-main">
            삭제하기
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemoryDetailPage;
