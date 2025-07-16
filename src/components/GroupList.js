import React from "react";
import "../styles/GroupList.css";

const GroupList = () => {
  return (
    <div className="group-list">
      <div className="empty-group">
        <p>등록된 공개 그룹이 없습니다.</p>
        <button className="create-group-btn">그룹 만들기</button>
      </div>
    </div>
  );
};

export default GroupList;
