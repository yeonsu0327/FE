import React from "react";
import GroupForm from "../components/GroupForm";

const CreateGroupPage = () => {
  const handleSubmit = (formData) => {
    console.log("그룹 생성 데이터:", formData);
    alert("그룹이 성공적으로 생성된 것으로 간주합니다.");
  };

  return (
    <div>
      <h1>그룹 만들기</h1>
      <GroupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateGroupPage;
