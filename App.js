// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Header from './components/Header';
import GroupList from './components/GroupList';
import Modal from './components/Modal';
import PrivateGroupPage from './components/PrivateGroupPage';
import GroupCreationFailure from './components/GroupCreationFailure';
import PrivateGroupAccessFailure from './components/PrivateGroupAccessFailure';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false); // 그룹 만들기 모달 상태
    const [isFailureOpen, setIsFailureOpen] = useState(false); // 그룹 생성 실패 모달 상태
    const [isAccessFailureOpen, setIsAccessFailureOpen] = useState(false); // 접근 실패 모달 상태
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 그룹 정보 수정 모달 상태

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openFailureModal = () => setIsFailureOpen(true);
    const closeFailureModal = () => setIsFailureOpen(false);

    const openAccessFailureModal = () => setIsAccessFailureOpen(true);
    const closeAccessFailureModal = () => setIsAccessFailureOpen(false);

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    // 그룹 만들기 처리 함수
    const handleCreateGroup = () => {
        const isGroupCreatedSuccessfully = false; // 예시: 실패 가정
        if (!isGroupCreatedSuccessfully) {
            openFailureModal();
        }
    };

    // 비공개 그룹 접근 시 호출되는 함수
    const handlePrivateGroupAccess = (password) => {
        const correctPassword = "1234";
        if (password !== correctPassword) {
            openAccessFailureModal();
        }
    };

    // 게시글 클릭 시 그룹 정보 수정 모달 열기
    const handlePostClick = () => {
        openEditModal();
    };

    return (
        <Router>
            <div className="App">
                <Header onOpenModal={openModal} />
                <Routes>
                    <Route path="/" element={<GroupList onPostClick={handlePostClick} onOpenModal={openModal} />} />
                    <Route path="/private-group" element={<PrivateGroupPage />} />
                    <Route path="/group" element={<GroupList onPostClick={handlePostClick} onOpenModal={openModal} />} />
                </Routes>

                {/* 그룹 정보 수정 모달 */}
                {isEditModalOpen && <Modal isOpen={isEditModalOpen} onClose={closeEditModal} isEditModal={true} />}
                
                {/* 그룹 만들기 실패 모달 */}
                {isFailureOpen && <GroupCreationFailure onClose={closeFailureModal} />}
                
                {/* 비공개 그룹 접근 실패 모달 */}
                {isAccessFailureOpen && <PrivateGroupAccessFailure onClose={closeAccessFailureModal} />}
            </div>
        </Router>
    );
}

export default App;




