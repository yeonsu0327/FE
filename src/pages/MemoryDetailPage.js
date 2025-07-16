import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/MemoryDetailPage.css";
import "../styles/MemoryEditModal.css";
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
    password,
  } = location.state || {};

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showCommentEditModal, setShowCommentEditModal] = useState(false);
  const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);

  // 디테일 페이지에 표시되는 내용
  const [currentNickname, setNickname] = useState(nickname);
  const [currentTitle, setTitle] = useState(title);
  const [currentContent, setContent] = useState(content);
  const [currentTags, setTags] = useState(tags);
  const [currentPlace, setPlace] = useState(place);
  const [currentMomentInput, setMomentInput] = useState(momentInput);
  const [currentIsPublic, setIsPublic] = useState(isPublic);
  const [currentImageFile, setImageFile] = useState(imageFile);
  const [fileName, setFileName] = useState(imageFile ? imageFile.name : "");
  const [isImageFile, setIsImageFile] = useState(!!imageFile);
  const [inputPassword, setInputPassword] = useState("");

  // 댓글 입력 모달과 관련된 상태
  const [commentNickname, setCommentNickname] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentPassword, setCommentPassword] = useState("");

  const [editComment, setEditComment] = useState(null);
  const [deleteCommentId, setDeleteCommentId] = useState(null);

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

  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (inputPassword === password) {
      setShowEditModal(false);
      setInputPassword("");

      // 추억 수정 모달에서 수정한 내용을 디테일 페이지에 반영
      setNickname(currentNickname);
      setTitle(currentTitle);
      setContent(currentContent);
      setTags(currentTags);
      setPlace(currentPlace);
      setMomentInput(currentMomentInput);
      setIsPublic(currentIsPublic);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setInputPassword("");
  };

  const handleDeleteMemory = () => {
    if (inputPassword === password) {
      navigate("/"); // 추억 삭제 후 홈으로 이동
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleCommentEditClick = (comment) => {
    setCommentNickname(comment.author);
    setCommentContent(comment.content);
    setEditComment(comment);
    setShowCommentEditModal(true);
  };

  const handleCommentEditSubmit = (event) => {
    event.preventDefault();
    if (commentPassword === editComment.password) {
      setComments(
        comments.map((comment) =>
          comment.id === editComment.id
            ? { ...comment, content: commentContent, author: commentNickname }
            : comment
        )
      );
      setShowCommentEditModal(false);
      setInputPassword("");
      setEditComment(null);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleCommentDeleteClick = (id) => {
    setDeleteCommentId(id);
    setShowCommentDeleteModal(true);
  };

  const handleCommentDeleteSubmit = (event) => {
    event.preventDefault();
    const commentToDelete = comments.find((c) => c.id === deleteCommentId);
    if (commentPassword === commentToDelete.password) {
      setComments(comments.filter((comment) => comment.id !== deleteCommentId));
      setShowCommentDeleteModal(false);
      setInputPassword("");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      id: Date.now(),
      author: commentNickname,
      date: new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      content: commentContent,
      password: commentPassword,
    };

    setComments([...comments, newComment]);
    setShowCommentModal(false);
    setCommentNickname("");
    setCommentContent("");
    setCommentPassword("");
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
            <span className="memory-category">{currentNickname}</span>
            <span className="memory-status">
              {currentIsPublic ? "공개" : "비공개"}
            </span>
          </div>
          <h2 className="memory-title">{currentTitle}</h2>

          <div className="memory-tags">
            <span>{currentTags && currentTags.map((tag) => `#${tag} `)}</span>
          </div>

          <div className="memory-meta">
            <div className="meta-left">
              <span className="memory-place">{currentPlace}</span>
              <span className="memory-date">{currentMomentInput}</span>
              <div className="comment-section">
                <img src={commentIcon} alt="Comment" className="comment-icon" />
                <span className="comment-count">{commentCount}</span>
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
          <img src={currentImageFile} alt="Memory" className="image" />
        </section>

        <section className="memory-description">
          <p>{currentContent}</p>
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
              <li className="comment-item" key={comment.id}>
                <div className="comment-text">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{comment.date}</span>
                  <p>{comment.content}</p>
                </div>
                <div className="comment-actions">
                  <img
                    src={pencilIcon}
                    alt="Edit"
                    className="comment-edit-icon"
                    onClick={() => handleCommentEditClick(comment)}
                  />
                  <img
                    src={trashBinIcon}
                    alt="Delete"
                    className="comment-delete-icon"
                    onClick={() => handleCommentDeleteClick(comment.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* 추억 수정 모달 */}
      <Modal
        show={showEditModal}
        onHide={handleEditModalClose}
        centered
        className="custom-modal-size"
      >
        <Modal.Header closeButton>
          <Modal.Title>추억 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="memory-creation-container">
            <form className="memory-form" onSubmit={handleEditSubmit}>
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
                        if (
                          tagText &&
                          !currentTags.includes(tagText) &&
                          currentTags.length < 30
                        ) {
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
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="form-group">
                <button type="submit" className="btn-edit-main">
                  수정하기
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      {/* 추억 삭제 모달 */}
      <Modal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setInputPassword("");
        }}
        centered
        className="custom-delete-modal-size"
      >
        <Modal.Header closeButton className="delete-modal-header">
          <Modal.Title className="delete-modal-title">추억 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body className="delete-modal-body">
          <div className="form-group">
            <label className="delete-modal-label">삭제 권한 인증</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              className="delete-modal-input"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="delete-modal-footer">
          <button onClick={handleDeleteMemory} className="delete-btn-main">
            삭제하기
          </button>
        </Modal.Footer>
      </Modal>

      {/* 댓글 등록 모달 */}
      <Modal
        show={showCommentModal}
        onHide={() => {
          setShowCommentModal(false);
          setCommentNickname("");
          setCommentContent("");
          setCommentPassword("");
        }}
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
              value={commentNickname}
              onChange={(e) => setCommentNickname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>댓글</label>
            <textarea
              placeholder="댓글을 입력해 주세요"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={commentPassword}
              onChange={(e) => setCommentPassword(e.target.value)}
              required
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
        onHide={() => {
          setShowCommentEditModal(false);
          setInputPassword("");
          setEditComment(null);
        }}
        centered
        className="custom-comment-modal-size"
      >
        <Modal.Header closeButton>
          <Modal.Title>댓글 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>닉네임</label>
            <input
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={commentNickname}
              onChange={(e) => setCommentNickname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>수정할 내용</label>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="수정할 내용을 입력해 주세요"
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
          <button onClick={handleCommentEditSubmit} className="btn-main">
            수정하기
          </button>
        </Modal.Footer>
      </Modal>

      {/* 댓글 삭제 모달 */}
      <Modal
        show={showCommentDeleteModal}
        onHide={() => {
          setShowCommentDeleteModal(false);
          setInputPassword("");
        }}
        centered
        className="custom-comment-modal-size"
      >
        <Modal.Header closeButton className="delete-modal-header">
          <Modal.Title className="delete-modal-title">댓글 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body className="delete-modal-body">
          <div className="form-group">
            <label className="delete-modal-label">삭제 권한 인증</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              className="delete-modal-input"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCommentDeleteSubmit} className="btn-main">
            삭제하기
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemoryDetailPage;
