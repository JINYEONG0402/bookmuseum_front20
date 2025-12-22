// src/pages/mypage/MyPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyPage() {
  const navigate = useNavigate();

  // 🔹 현재 로그인한 사용자 정보 (PK 포함)
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const memberId = currentUser.loginId; // ⭐ 반드시 PK 사용

  // 🔹 백엔드에서 가져온 데이터
  const [myBooks, setMyBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);

  // 🔹 API 기본 주소
  const API_BASE = "";

  // =====================================================
  // 📌 내가 등록한 도서 조회 API
  // =====================================================
  const loadMyBooks = async () => {
    try {
      const res = await axios.get(`/api/mypage`, { withCredentials: true });
      setMyBooks(res.data);
    } catch (err) {
      console.error("내 도서 조회 오류:", err);
    }
  };

  // =====================================================
  // 📌 좋아요한 도서 조회 API
  // =====================================================
  const loadLikedBooks = async () => {
    try {
      const res = await axios.get(`/api/mypage/liked`, { withCredentials: true });
      setLikedBooks(res.data);
    } catch (err) {
      console.error("좋아요 도서 조회 오류:", err);
    }
  };

  // =====================================================
  // 📌 등록한 도서 삭제 API
  // =====================================================
  const handleDelete = async (book) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`/api/mypage/${book.bookId}`, {
        data: { bookId: book.bookId },
        withCredentials: true,
      });

      alert("삭제 완료");
      loadMyBooks();
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 실패");
    }
  };

  // =====================================================
  // 📌 페이지 로드시 API 호출
  // =====================================================
  useEffect(() => {
    if (!memberId) {
      console.error("⚠ memberId 없음. 로그인 정보 확인 필요.");
      return;
    }
    loadMyBooks();
    loadLikedBooks();
  }, []);

  // =====================================================
  // 📌 페이지 이동 함수들
  // =====================================================
  const goToRegister = () => navigate("/register");

  const handleGoDetail = (book) => {
    navigate("/detail", {
      state: {
        book: {
          id: book.bookId,
          title: book.title,
          author: book.author,
          description: book.description,
          imgUrl: book.imgUrl,
        },
      },
    });
  };

  const handleEdit = (book) => {
    navigate("/update", {
      state: {
        bookId: book.bookId,
        title: book.title,
        author: book.author,
        description: book.description, // ★ 내용 전달
        coverImage: book.imgUrl, // ★ 이미지 전달
        coverImageId: book.imageId, // 있으면 전달
        reg_time: book.reg_time,
        update_time: book.update_time,
      },
    });
  };

  // =====================================================
  // 📌 좋아요 토글 API
  // =====================================================
  const toggleLike = async (bookId) => {
    try {
      const res = await axios.post(`/api/books/${bookId}/like`, {}, { withCredentials: true });

      // 서버가 "liked"/"unliked" 또는 true/false를 준다고 가정
      const status = res.data;

      // 1) likedBooks 목록에서는 "취소"면 제거
      if (status === "unliked" || status === false) {
        setLikedBooks((prev) => prev.filter((b) => b.bookId !== bookId));
      } else {
        // 2) 성공이면 liked=true로 갱신 (혹시 목록에 남겨두고 싶다면)
        setLikedBooks((prev) =>
          prev.map((b) => (b.bookId === bookId ? { ...b, liked: true } : b))
        );
      }
    } catch (err) {
      console.error("좋아요 토글 실패:", err);
    }
  };

  // =====================================================
  // 📌 UI
  // =====================================================
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>마이페이지</h3>

      <div style={styles.registerRow}>
        <button style={styles.registerBtn} onClick={goToRegister}>
          + 도서 등록하기
        </button>
      </div>

      {/* 내가 등록한 도서 */}
      <section style={styles.section}>
        <h3 style={styles.subTitle}>등록한 도서</h3>

        <div style={styles.bookGrid}>
          {myBooks.length === 0 && <p style={{ color: "#888" }}>등록한 도서가 없습니다.</p>}

          {myBooks.map((book) => (
            <div
              key={book.bookId} // ✅ 수정 1) key를 bookId로
              style={styles.card}
              onClick={() => handleGoDetail(book)}
            >
              <div style={styles.imageBox}>
                {book.imgUrl && (
                  <img
                    src={book.imgUrl}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      /*borderRadius: "6px",*/
                    }}
                  />
                )}
              </div>
              <div style={styles.textArea}>
                <div style={styles.titleRow}>
                  <div style={styles.bookTitle}>{book.title}</div>

                  <div style={styles.actionRow}>
                    <button
                      style={styles.editBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(book);
                      }}
                    >
                      수정
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(book);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>

                {/* 작가 이름 */}
                <div style={styles.bookAuthor}>{book.author}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 좋아요한 도서 */}
      <section style={styles.section}>
        <h3 style={styles.subTitle}>좋아요 누른 도서</h3>

        <div style={styles.bookGrid}>
          {likedBooks.map((book) => (
            <div
              key={book.bookId}
              style={styles.card}
              onClick={() => handleGoDetail(book)}
            >
              <div style={styles.imageBox}>
                {book.imgUrl && (
                  <img
                    src={book.imgUrl}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      /*borderRadius: "6px",*/
                    }}
                  />
                )}
              </div>
              <div style={styles.textArea}>
                <div style={styles.titleRow}>
                  <p style={styles.bookTitle}>{book.title}</p>
                  <div
                    style={styles.likeIconBox}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(book.bookId);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = "scale(0.95)";
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = "scale(1.15)";
                    }}
                  >
                    <img
                      src="/heart-fill.png" // ✅ 수정 2) 좋아요 목록은 항상 fill
                      alt="heart"
                      style={styles.likeIcon}
                    />
                  </div>
                </div>

                {/* 작가 이름 */}
                <p style={styles.bookAuthor}>{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// -------------------------
// 스타일
// -------------------------
const styles = {
  container: {
    width: "1400px",
    margin: "80px 270px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  registerRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "60px",
  },
  registerBtn: {
    padding: "8px 18px",
    marginRight: "220px",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
  },
  subTitle: {
    fontSize: "18px",
    marginBottom: "70px",
  },
  section: {
    marginBottom: "150px",
  },
  bookGrid: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
  },
  actionRow: {
    display: "flex",
    gap: "6px",
    fontSize: "12px",
    lineHeight: "1",
  },
  editBtn: {
    padding: 0,
    border: "none",
    background: "transparent",
    color: "#0070f3",
    cursor: "pointer",
    fontSize: 12,
  },
  deleteBtn: {
    padding: 0,
    border: "none",
    background: "transparent",
    color: "red",
    cursor: "pointer",
    fontSize: 12,
  },
  card: {
    width: 220,
    height: 260,
    border: "1px solid #ddd",
    borderRadius: 8,
    backgroundColor: "#ffffffff",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    transition: "0.2s",
  },
  imageBox: {
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  rowBetween: {
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookTitle: {
    margin: 0,
    fontWeight: "bold",
    fontSize: 14,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px",
  },
  likeIconBox: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.15s ease",
  },
  likeIcon: {
    width: 22,
    height: 22,
    userSelect: "none",
  },
  textArea: {
    padding: 16,
    flexDirection: "column",
    justifyContent: "center",
  },

  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 22,
    gap: 8,
  },

  bookAuthor: {
    margin: 0,
    fontSize: 12,
    color: "#777",
    marginTop: 10,
    marginBottom: 0,
    lineHeight: "1.2",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}; /* 수정 */
