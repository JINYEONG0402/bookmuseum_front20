import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Card,
    CardContent,
    IconButton,
    Stack,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// 아직은 백엔드 연동 전이니까, 가짜 데이터로 UI만 확인하기
const popularBooks = [
    { id: 1, title: "책 제목", author: "저자", liked: true },
    { id: 2, title: "책 제목", author: "저자", liked: false },
    { id: 3, title: "책 제목", author: "저자", liked: false },
    { id: 4, title: "책 제목", author: "저자", liked: false },
];

const bookList = [
    { id: 1, title: "책 제목", author: "저자", liked: true },
    { id: 2, title: "책 제목", author: "저자", liked: true },
    { id: 3, title: "책 제목", author: "저자", liked: false },
];

export default function HomePage() {
    return (
        <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh", py: 4 }}>
            {/* 상단 바 */}
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    {/* 왼쪽 로고 자리 */}
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        B
                    </Typography>

                    {/* 오른쪽 메뉴 */}
                    <Box>
                        <Button sx={{ mr: 1 }}>마이페이지</Button>
                        <Button sx={{ mr: 1 }}>사용자</Button>
                        <Button variant="contained" color="inherit">
                            로그아웃
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* 흰 박스(메인 컨텐츠 영역) */}
            <Container sx={{ mt: 6, bgcolor: "#ffffff", py: 6, borderRadius: 2 }}>
                {/* 인기 도서 섹션 */}
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    인기 도서
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* 왼쪽 화살표 */}
                    <IconButton>
                        <ArrowBackIosNewIcon />
                    </IconButton>

                    {/* 인기 도서 카드 리스트 */}
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{ flexGrow: 1, px: 2, overflow: "hidden" }}
                    >
                        {popularBooks.map((book) => (
                            <Card
                                key={book.id}
                                sx={{
                                    width: 220,
                                    height: 260,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* 표지 이미지 들어갈 자리 */}
                                <Box sx={{ bgcolor: "#f3f3f3", height: 160 }} />

                                <CardContent
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body2">{book.title}</Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: "bold", mt: 0.5 }}
                                        >
                                            {book.author}
                                        </Typography>
                                    </Box>
                                    <FavoriteBorderIcon fontSize="small" />
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>

                    {/* 오른쪽 화살표 */}
                    <IconButton>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>

                {/* 도서 목록 섹션 */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                        도서 목록
                    </Typography>

                    <Stack spacing={1}>
                        {bookList.map((book) => (
                            <Box
                                key={book.id}
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <FavoriteBorderIcon fontSize="small" sx={{ mr: 1 }} />
                                <Box>
                                    <Typography variant="body2">{book.title}</Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: "bold", mt: 0.3 }}
                                    >
                                        {book.author}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}
