import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import homepageIcon from "../assets/homepageicon.svg";
import GroupCard from "../components/GroupCard";

const HomePage = ({ groups }) => {
  const [activeTab, setActiveTab] = useState("public");
  const navigate = useNavigate();

  const handleCreateGroupClick = () => {
    navigate("/create-group");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredGroups = groups.filter((group) =>
    activeTab === "public" ? group.isPublic : !group.isPublic
  );

  return (
    <div className="homepage">
      <div className="tab-container">
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

      {filteredGroups.length === 0 ? (
        <>
          <img src={homepageIcon} alt="Home Icon" className="homepage-icon" />
          <p className="no-group-text">등록된 공개 그룹이 없습니다.</p>
          <p className="make-group-text">가장 먼저 그룹을 만들어보세요!</p>
          <button className="create-group-btn" onClick={handleCreateGroupClick}>
            그룹 만들기
          </button>
        </>
      ) : (
        <div className="group-list">
          {filteredGroups.map((group, index) => (
            <GroupCard key={index} group={group} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
