// SuccessModal.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SuccessModal.css";

const SuccessModal = ({ showModal, closeModal }) => {
  const navigate = useNavigate();

  if (!showModal) return null;

  const handleConfirm = () => {
    closeModal();
    navigate("/");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>그룹 생성 성공!</h2>
        <p>그룹이 성공적으로 생성되었습니다.</p>
        <button onClick={handleConfirm}>확인</button>
      </div>
    </div>
  );
};

export default SuccessModal;
