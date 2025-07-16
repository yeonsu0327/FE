import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/GroupDetail.css";
import likeIcon from "../assets/like.svg";
import logo from "../assets/logo.svg";
import homepageIcon from "../assets/homepageicon.svg";

const GroupDetailPage = ({
  groups,
  onLikeClick = () => {},
  onDeleteGroup = () => {},
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const group = groups[parseInt(id)];
  const likes = group?.likes || 0;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("public");

  if (!group) {
    return <div>그룹 정보를 찾을 수 없습니다.</div>;
  }

  const handleLikeClick = () => {
    onLikeClick(id);
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDeleteGroup(id);
    navigate("/");
  };

  const handleEditConfirm = () => {
    navigate(`/group/${id}/edit`);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleMemoryUploadClick = () => {
    navigate(`/group/${id}/memory/create`);
  };

  const filteredMemories = group?.memories || [];

  return (
    <div className="group-detail-page">
      <div className="header-banner">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="group-header">
        <img src={group.imageFile} alt="Group" className="group-image" />
        <div className="group-info">
          <div className="group-stats">
            <span>{`D+${Math.floor(
              (new Date() - new Date(group.date)) / (1000 * 60 * 60 * 24)
            )} | ${group.isPublic ? "공개" : "비공개"}`}</span>
          </div>
          <h1 className="group-name">{group.name}</h1>
          <p className="group-description">{group.description}</p>
          <p className="group-badges">획득 배지</p>
          <div className="group-likes-actions">
            <div className="group-likes">
              <span>추억 수: {filteredMemories.length}</span>
              <span> | 그룹 공감 수: {likes}</span>
            </div>
            <button className="like-button" onClick={handleLikeClick}>
              <img src={likeIcon} alt="Like" className="like-icon" />
            </button>
          </div>
          <div className="group-actions">
            <button
              className="edit-button"
              onClick={() => handleOpenModal("edit")}
            >
              그룹 수정하기
            </button>
            <button
              className="delete-button"
              onClick={() => handleOpenModal("delete")}
            >
              그룹 삭제하기
            </button>
          </div>
        </div>
      </div>

      <div className="group-body">
        <div className="group-body-header">
          <h2>추억 목록</h2>
          <button
            className="upload-memory-button"
            onClick={handleMemoryUploadClick}
          >
            <span>추억 올리기</span>
          </button>
        </div>
        <div className="filter-bar">
          <button
            className={`tab-button ${activeTab === "public" ? "active" : ""}`}
            onClick={() => handleTabClick("public")}
          >
            공개
          </button>
          <button
            className={`tab-button ${activeTab === "private" ? "active" : ""}`}
            onClick={() => handleTabClick("private")}
          >
            비공개
          </button>
          <input type="text" className="search-input" placeholder="검색" />
          <select className="sort-dropdown">
            <option value="latest">최신순</option>
            <option value="likes">공감수</option>
            <option value="comments">댓글순</option>
          </select>
        </div>

        {filteredMemories.length === 0 ? (
          <div className="no-memory-container">
            <img src={homepageIcon} alt="Home Icon" className="homepage-icon" />
            <p className="no-memory-text">게시된 추억이 없습니다.</p>
            <p className="make-memory-text">첫 번째 추억을 올려보세요!</p>
            <button
              className="create-memory-button"
              onClick={handleMemoryUploadClick}
            >
              <span>추억 올리기</span>
            </button>
          </div>
        ) : (
          <div>{/* 추억 목록 */}</div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {modalType === "edit" ? (
              <p>그룹을 수정하시겠습니까?</p>
            ) : (
              <p>그룹을 삭제하시겠습니까?</p>
            )}
            <button
              className="modal-confirm-btn"
              onClick={
                modalType === "edit" ? handleEditConfirm : handleDeleteConfirm
              }
            >
              확인
            </button>
            <button className="modal-cancel-btn" onClick={handleCloseModal}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetailPage;
