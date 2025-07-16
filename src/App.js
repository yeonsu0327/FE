import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MemoryCreationPage from "./pages/MemoryCreationPage";
import MemoryDetailPage from "./pages/MemoryDetailPage";
import NotFoundPage from "./components/NotFoundPage";
import PrivateMemoryAccess from "./components/PrivateMemoryAccess";
import HomePage from "./pages/HomePage";
import GroupCreationPage from "./pages/GroupCreate";
import Header from "./components/Header";
import GroupDetail from "./pages/GroupDetail";

function App() {
  const [groups, setGroups] = useState([]);

  // 새로운 그룹 추가
  const addGroup = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleLikeClick = (groupId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group, index) =>
        index === parseInt(groupId)
          ? { ...group, likes: (group.likes || 0) + 1 }
          : group
      )
    );
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage groups={groups} />} />
        <Route
          path="/create-group"
          element={<GroupCreationPage onGroupCreate={addGroup} />}
        />
        <Route
          path="/group/:id"
          element={
            <GroupDetail groups={groups} onLikeClick={handleLikeClick} />
          }
        />
        <Route
          path="/group/:id/memory/create"
          element={<MemoryCreationPage />}
        />
        <Route path="/memory/:id" element={<MemoryDetailPage />} />
        <Route
          path="/private-memory-access"
          element={<PrivateMemoryAccess />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
