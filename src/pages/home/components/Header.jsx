// src/pages/home/components/Header.jsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Header() {
    return (
        <Box
            sx={{
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 4,
                borderBottom: "1px solid #eee",
            }}
        >
            {/* 왼쪽 로고 자리 */}
            <Typography sx={{ fontWeight: "bold" }}>BOOK MUSEUM</Typography>

            {/* 오른쪽 메뉴 자리 */}
            <Box sx={{ display: "flex", gap: 2 }}>
                <Button>마이페이지</Button>
                <Button>사용자1</Button>
                <Button variant="contained">로그아웃</Button>
            </Box>
        </Box>
    );
}
