import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();

  // 등록한 도서
  const [myBooks, setMyBooks] = useState([
    { id: 1, title: "책 제목", image: null },
    { id: 2, title: "책 제목", image: null },
    { id: 3, title: "책 제목", image: null },
    { id: 4, title: "책 제목", image: null },
  ]);

  // 좋아요 데이터
  const [likedBooks, setLikedBooks] = useState([
    { id: 1, title: "책 제목", liked: true },
    { id: 2, title: "책 제목", liked: true },
    { id: 3, title: "책 제목", liked: true },
    { id: 4, title: "책 제목", liked: true },
  ]);

  // ⭐ 수정 버튼 → 수정 페이지로 이동
  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  // ⭐ 삭제 버튼 → 리스트에서 제거 (추후 백엔드 연결)
  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setMyBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  // 좋아요 토글
  const toggleLike = (id) => {
    setLikedBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, liked: !b.liked } : b))
    );
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>마이페이지</h3>

      {/* 등록한 도서 */}
      <section style={styles.section}>
        <h3 style={styles.subTitle}>등록한 도서</h3>
        <div style={styles.bookGrid}>
          {myBooks.map((book) => (
            <div key={book.id} style={styles.card}>
              <div style={styles.imageBox}></div>

              <div style={styles.rowBetween}>
                <p style={styles.bookTitle}>{book.title}</p>

                <div style={styles.actionRow}>
                  <button style={styles.editBtn} onClick={() => handleEdit(book.id)}>
                    수정
                  </button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(book.id)}>
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 좋아요 도서 */}
      <section style={styles.section}>
        <h3 style={styles.subTitle}>좋아요 누른 도서</h3>
        <div style={styles.bookGrid}>
          {likedBooks.map((book) => (
            <div key={book.id} style={styles.card}>
              <div style={styles.imageBox}></div>

              <div style={styles.rowBetween}>
                <p style={styles.bookTitle}>{book.title}</p>

                <div
                  style={styles.likeIcon}
                  onClick={() => toggleLike(book.id)}
                >
                  {book.liked ? "🤍" : "🖤"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    width: "1400px",
    margin: "0 auto",     // ⭐ 중앙 정렬
    paddingTop: "50px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "40px",
  },
  subTitle: {
    fontSize: "18px",
    marginBottom: "16px",
  },
  section: {
    marginBottom: "60px",
  },
  bookGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    flexWrap: "wrap",
  },
  card: {
    width: "250px",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "16px",
    background: "#fff",
  },
  imageBox: {
    width: "100%",
    height: "200px",
    background: "#f1f1f1",
    borderRadius: "6px",
    marginBottom: "16px",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookTitle: {
    fontSize: "14px",
  },
  actionRow: {
    display: "flex",
    gap: "8px",
  },
  editBtn: {
    border: "none",
    background: "transparent",
    color: "#0070f3",
    cursor: "pointer",
  },
  deleteBtn: {
    border: "none",
    background: "transparent",
    color: "red",
    cursor: "pointer",
  },
  likeIcon: {
    fontSize: "20px",
    cursor: "pointer",
  },
};
