// src/pages/ai/AiImagePage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noneImg from "../../asserts/noneimg.png";
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardMedia,
    CardContent,
    Stack,
    CircularProgress,
} from "@mui/material";

function AiImagePage() {
    const location = useLocation();
    const navigate = useNavigate();

    // BookCreatePage에서 반드시 book 정보를 넘겨와야 함
    const rawBook = location.state?.book;

    if (!rawBook) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f5f5f5",
                    p: 3,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    잘못된 접근입니다.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    도서 등록 화면에서 다시 시도해주세요.
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/register")}
                >
                    도서 등록으로 돌아가기
                </Button>
            </Box>
        );
    }

    // 전달받은 값들
    const bookId = rawBook.book_id ?? null;
    const bookTitle = rawBook.title ?? "";

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null); // { imgId, bookId, imgUrl }
    const [error, setError] = useState(null);

    // 이미지 생성
    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            alert("이미지 설명을 입력해줘!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 실제 API 호출할 자리
            /*
            const res = await fetch("/api/ai-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookId,
                    title: bookTitle,
                    prompt,
                }),
            });
            const data = await res.json();
            setImage({
                imgId: data.img_id,
                bookId: data.book_id,
                imgUrl: data.img_url,
            });
            */

            // 테스트용 랜덤 이미지 생성
            await new Promise((r) => setTimeout(r, 800));

            const fakeImgId = Date.now();
            const fakeImgUrl = `https://picsum.photos/seed/${fakeImgId}/600/400`;

            setImage({
                imgId: fakeImgId,
                bookId: bookId,
                imgUrl: fakeImgUrl,
            });
        } catch (e) {
            console.error(e);
            setError("이미지 생성 중 오류가 발생했어.");
        } finally {
            setLoading(false);
        }
    };

    // 생성된 이미지 등록 → BookCreatePage로 이동
    const handleSelectImage = () => {
        if (!image) {
            alert("먼저 이미지를 생성해줘!");
            return;
        }

        navigate("/register", {
            state: {
                coverImage: image.imgUrl,
                imageId: image.imgId,
                bookId: image.bookId,

                // 기존 입력값 유지
                title: rawBook.title,
                author: rawBook.author,
                description: rawBook.description,
            },
        });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",

                py: 6,
                maxWidth: 960,
                mx: "auto",
                px: 3,
            }}
        >
            <Box
                sx={{
                    maxWidth: 960,
                    bgcolor: "#ffffff",
                    mx: "auto",
                    px: 3,
                }}
            >
                {/* 상단: 도서 정보 + 안내 */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="overline" color="text.secondary">
                        도서 정보
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        『{bookTitle}』
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 0.5, mb: 2 }}
                    >
                        book_id : {bookId}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        도서 제목과 내용을 참고해서, 원하는 표지 이미지를 생성해볼게요.
                    </Typography>

                    <TextField
                        label="이미지 설명 (프롬프트)"
                        placeholder="예: 파스텔톤, 따뜻한 일러스트, 책 읽는 고양이 등"
                        multiline
                        minRows={3}
                        fullWidth
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </Box>

                {/* 가운데: 버튼 + 이미지 카드 */}
                <Stack spacing={3} alignItems="center">
                    {/* 이미지 생성 버튼 */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            maxWidth: 600,
                            height: 44,
                            backgroundColor: "#000",
                            "&:hover": {
                                backgroundColor: "#333",
                            }
                        }}
                        onClick={handleGenerateImage}
                        disabled={loading}
                        startIcon={
                            loading ? <CircularProgress size={18} color="inherit" /> : null
                        }
                    >

                    {loading ? "이미지 생성 중..." : "이미지 생성하기"}
                    </Button>

                    {/* 에러 메시지 */}
                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{ maxWidth: 600, alignSelf: "stretch" }}
                        >
                            {error}
                        </Typography>
                    )}

                    {/* 이미지 카드 */}
                    <Card
                        sx={{
                            width: "100%",
                            maxWidth: 600,
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: "hidden",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={image ? image.imgUrl : noneImg}
                            alt="generated-cover"
                            sx={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                            }}
                        />
                    </Card>


                    {/* 이미지 메타 정보 */}
                    {image && (
                        <Card
                            sx={{
                                width: "100%",
                                maxWidth: 600,
                                borderRadius: 2,
                                bgcolor: "#fafafa",
                            }}
                        >
                            <CardContent sx={{ py: 1.5 }}>
                                <Typography variant="caption" color="text.secondary">
                                    img_id : {image.imgId} / book_id : {image.bookId}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}

                    {/* 이미지 등록 버튼 */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            maxWidth: 600,
                            height: 44,
                            backgroundColor: "#000",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#222",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: "#888",
                                color: "#fff",
                            },
                        }}
                        onClick={handleSelectImage}
                        disabled={!image}
                    >
                        이미지 등록
                    </Button>

                </Stack>
            </Box>
        </Box>
    );
}

export default AiImagePage;
