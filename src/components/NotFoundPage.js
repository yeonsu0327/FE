import React from "react";
import "../styles/NotFoundPage.css";
import NotFoundImage from "../assets/404.svg"; // 404 이미지를 import
import Logo from "../assets/logo.svg"; // 로고 이미지를 import

function NotFoundPage() {
  return (
    <div className="not-found">
      <img src={Logo} alt="조각집 로고" className="not-found-logo" />
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="not-found-image"
      />
    </div>
  );
}

export default NotFoundPage;
