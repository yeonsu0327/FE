// src/services/api.js
export const getPosts = async () => {
  return [
    {
      id: 1,
      title: "첫 번째 게시물",
      content: "내용 1",
      nickname: "작성자 1",
      image: "/path/to/image1.jpg",
      tags: ["기억", "추억"],
      location: "서울",
      moment: "2024-08-20",
      likes: 5,
      comments: 2,
    },
    {
      id: 2,
      title: "두 번째 게시물",
      content: "내용 2",
      nickname: "작성자 2",
      image: "/path/to/image2.jpg",
      tags: ["여행"],
      location: "부산",
      moment: "2024-08-19",
      likes: 10,
      comments: 3,
    },
  ];
};

export const getPostDetails = async (id) => {
  return {
    id,
    title: `게시물 ${id}`,
    content: `내용 ${id}`,
    nickname: `작성자 ${id}`,
    image: `/path/to/image${id}.jpg`,
    tags: ["추억"],
    location: "서울",
    moment: "2024-08-20",
    likes: 5,
    comments: 2,
  };
};
