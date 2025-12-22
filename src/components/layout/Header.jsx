import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const API_BASE = "http://18.138.248.193:8080";

    const handleLogout = async () => {
        try {
            await axios.get(`${API_BASE}/api/member/logout`, {
                withCredentials: true   // JWT 쿠키 전달
            });

            localStorage.removeItem("currentUser");
            setIsLoggedIn(false);

            navigate("/login");
        } catch (err) {
            console.error("로그아웃 실패:", err);
            alert("로그아웃 실패");
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.inner}>

                <Link to="/" style={{ textDecoration: "none" }}>
                    <img src="/book_logo.png" style={styles.logo} alt="logo" />
                </Link>

                <div style={styles.right}>
                    {isLoggedIn ? (
                        <>
                            <Link to="/mypage">
                                <button style={styles.userBtn}>마이페이지</button>
                            </Link>
                            <button style={styles.logoutBtn} onClick={handleLogout}>
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button style={styles.userBtn}>로그인</button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

const styles = {
    header: {
        width: "100%",
        background: "#fff",
        borderBottom: "1px solid #eee",
    },
    inner: {
        width: "1500px",
        margin: "0 auto",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        width: "200px",
    },
    right: {
        display: "flex",
        gap: "12px",
    },
    userBtn: {
        border: "1px solid #ddd",
        padding: "6px 12px",
        borderRadius: "4px",
        background: "#fff",
        cursor: "pointer",
    },
    logoutBtn: {
        border: "none",
        padding: "6px 12px",
        borderRadius: "4px",
        background: "#333",
        color: "#fff",
        cursor: "pointer",
    },
};
