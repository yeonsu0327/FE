import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GroupCard.css";

const GroupCard = ({ group, index }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/group/${index}`);
  };

  const calculateDday = (date) => {
    const today = new Date();
    const createdDate = new Date(date);
    const diffTime = Math.abs(today - createdDate);
    return `D+${Math.floor(diffTime / (1000 * 60 * 60 * 24))}`;
  };

  return (
    <div className="group-card" onClick={handleCardClick}>
      {/* 그룹이 공개 상태일 때만 이미지와 설명 표시 */}
      <div className="group-content">
        {group.isPublic && (
          <img src={group.imageFile} alt="Group" className="group-image" />
        )}
        <div className="group-info">
          <h3 className="group-name">{group.name}</h3>
          {/* 그룹이 공개 상태일 때만 설명 표시 */}
          {group.isPublic && (
            <p className="group-description">{group.description}</p>
          )}
          <div className="group-meta">
            <span>{calculateDday(group.date)}</span>
            <span> | </span>
            <span>{group.isPublic ? "공개" : "비공개"}</span>
          </div>
          <div className="group-stats">
            <span>획득 배지: 0</span>
            <span>추억: 0</span>
            <span>그룹 공감: 0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
