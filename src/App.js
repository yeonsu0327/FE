import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MemoryCreationPage from "./pages/MemoryCreationPage";
import MemoryDetailPage from "./pages/MemoryDetailPage";
import NotFoundPage from "./components/NotFoundPage";
import PrivateMemoryAccess from "./components/PrivateMemoryAccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemoryCreationPage />} />
        <Route path="/memory/:id" element={<MemoryDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/private-memory-access"
          element={<PrivateMemoryAccess />}
        />
      </Routes>
    </Router>
  );
}

export default App;
