import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import "../styles/Header.css";
import logo from "../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleCreateGroupClick = () => {
    navigate("/create-group"); // 그룹 만들기 버튼 클릭 시 /create-group 페이지로 이동
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <button
        className="header-create-group-btn"
        onClick={handleCreateGroupClick}
      >
        그룹 만들기
      </button>
    </header>
  );
};

export default Header;
