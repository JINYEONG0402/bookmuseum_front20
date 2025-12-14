// src/pages/detail/Detail.jsx

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./detail.css";

function Detail() {
    const location = useLocation();
    const navigate = useNavigate();

    const bookFromHome = location.state?.book;
    const bookId = bookFromHome?.id;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const currentLoginId = currentUser?.loginId;
    const isLoggedIn = !!currentLoginId; // ⭐ 로그인 여부

    const [book, setBook] = useState(bookFromHome || null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);

    useEffect(() => {
        if (!bookId) navigate("/");
    }, [bookId, navigate]);

    // 📌 책 상세 조회
    const fetchBookDetail = async () => {
        try {
            const res = await fetch(`/api/books/${bookId}`, {
                method: "GET",
                credentials: "include"
            });

            if (!res.ok) return;

            const data = await res.json();

            setBook({
                id: data.bookId,
                title: data.title,
                author: data.author,
                content: data.content,
                imgUrl: data.imgUrl,
                regTime: data.regTime,
                updateTime: data.updateTime,
            });
        } catch (err) {
            console.error("Book fetch error:", err);
        }
    };

    // 📌 댓글 조회 (로그인 여부와 무관)
    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/books/${bookId}/comments`, {
                method: "GET",
                credentials: "include"
            });

            if (!res.ok) return;

            const data = await res.json();

            // 로그인 상태일 때만 commentLoginId 매핑
            const converted = await Promise.all(
                data.map(async (c) => {
                    if (!isLoggedIn || !c.member || !c.member.id) return c;

                    const memberRes = await fetch(`/api/member/${c.member.id}`, {
                        method: "GET",
                        credentials: "include"
                    });

                    if (!memberRes.ok) return c;

                    const memberData = await memberRes.json();

                    return {
                        ...c,
                        commentLoginId: memberData.loginId,
                    };
                })
            );

            setComments(converted);

        } catch (err) {
            console.error("Comment fetch error:", err);
        }
    };

    useEffect(() => {
        fetchBookDetail();
        fetchComments();
    }, [bookId, isLoggedIn]);

    // 📌 댓글 작성
    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            await fetch(`/api/books/${bookId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newComment }),
                credentials: "include"
            });

            setNewComment("");
            fetchComments();
        } catch (err) {
            console.error("Add comment error:", err);
        }
    };

    // 📌 댓글 수정
    const handleEditComment = async () => {
        if (!newComment.trim()) return;

        try {
            await fetch(`/api/comments/${editCommentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newComment }),
                credentials: "include"
            });

            setEditCommentId(null);
            setNewComment("");
            fetchComments();
        } catch (err) {
            console.error("Edit comment error:", err);
        }
    };

    // 📌 댓글 삭제
    const handleDeleteComment = async (id) => {
        try {
            await fetch(`/api/comments/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            fetchComments();
        } catch (err) {
            console.error("Delete comment error:", err);
        }
    };

    const startEdit = (id, content) => {
        setEditCommentId(id);
        setNewComment(content);
    };

    if (!book) return <div>로딩중...</div>;

    return (
        <div className="detail-container">
            <h2 className="detail-title">도서 상세 정보</h2>

            <div className="detail-box">
                <div className="detail-image-wrapper">
                    <img src={book.imgUrl} className="detail-image" />
                </div>

                <div className="detail-content">
                    <h3 className="book-title">{book.title}</h3>

                    <div className="book-date-wrapper">
                        <span>등록일: {book.regTime}</span>
                        {book.updateTime && <span>(수정일: {book.updateTime})</span>}
                    </div>

                    <pre className="book-description">{book.content}</pre>
                </div>
            </div>

            {/* 댓글 영역 (항상 표시) */}
            <div className="comment-section">
                <h3 className="comment-title">댓글</h3>

                <div className="comment-list">
                    {comments.map((c) => (
                        <div className="comment-item" key={c.commentId}>
                            <span className="comment-user">{c.author}</span>
                            <span className="comment-text">{c.content}</span>

                            {/* ⭐ 로그인 + 본인 댓글일 때만 수정/삭제 */}
                            {isLoggedIn && currentLoginId === c.commentLoginId && (
                                <div className="comment-actions">
                                    <button
                                        className="comment-edit-btn"
                                        onClick={() => startEdit(c.commentId, c.content)}
                                    >
                                        <img src="/edit.png" className="comment-edit-icon" />
                                    </button>

                                    <button
                                        className="comment-delete-btn"
                                        onClick={() => handleDeleteComment(c.commentId)}
                                    >
                                        <img src="/delete.png" className="comment-delete-icon" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ⭐ 로그인한 경우에만 댓글 작성 영역 표시 */}
                {isLoggedIn && (
                    <div className="comment-input-wrapper">
                        <input
                            className="comment-input"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력해주세요."
                        />
                        <button
                            className="comment-button"
                            onClick={editCommentId ? handleEditComment : handleAddComment}
                        >
                            {editCommentId ? "수정" : "작성"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Detail;
