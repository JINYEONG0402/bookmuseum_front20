# 창작 도서 관리 시스템 "걷기가 서재" (프론트엔드)
> **백엔드 깃허브 링크** : [https://github.com/Y9957/demo]

## 1. 프로젝트 소개
걷기가 서재의 “작가의 산책” 서비스는 누구나 작가가 되어 자유롭게 글을 집필하고 공개할
수 있는 창작 플랫폼 입니다. 본 깃허브 프로젝트는 걷기가 서재의 UI 디자인, UX 상호작용 서버 api 연동 등의 서비스를 제공하는 클라이언트단을 담당하고 있습니다

## 2. 주요 기능
- 회원가입 / 로그인 / 로그아웃 
- 도서 목록 조회 및 상세 보기 
- 창작글 등록/삭제/수정
- 좋아요, 댓글 등 UX 상호작용
- 마이페이지(내 도서 / 좋아요한 도서 조회)
- 백엔드 API와의 비동기 통신 (axios 기반)
   
## 3. 기술 스택
- React.js
- JavaScript
- Navigater
- fetch (API 통신)
- localStorage 관리

## 4. UI 디자인
📄 UI 설계(Figma)
```
🔗 https://www.figma.com/design/zsT7VhkMluKt9uq4AteEPI/BOOK-UI
```

## 5. 시스템 아키텍처 구조
BookMuseum 프론트엔드는 React-router, axios 비동기 함수, status 상태관리 시스템

그리고 Spring Boots 백엔드 + OpenAI 이미지 생성 API와 연동되는 구조로 설계되었습니다 .

### 📌 전체 요청 흐름
```
① [javascripts] 화면구상과 상호작용
② [navigate] 상호작용 시 화면 이동 (필요 시 상태저장)
③ [API 호출] 특정 버튼과 상호작용시 fetch를 사용하여 API 요청
```

### 📌 javascripts - 화면구상과 상호작용 (마이페이지 등록 버튼)
```
        <div style={styles.container}>
            {/* 헤더 영역: 제목 + (아래 오른쪽 버튼) */}
            <h3 style={styles.title}>마이페이지</h3>

            {/* 제목 바로 아래, 오른쪽 정렬된 버튼 */}
            <div style={styles.registerRow}>
                <button style={styles.registerBtn} onClick={goToRegister}>
                    + 도서 등록하기
                </button>
            </div>
      </div>
```

### 📌 Navigate -페이지 이동 (마이페이지에서 책 상세페이지 이동)
```
    const handleGoDetail = (id) => {
        const targetBook = myBooks.find((b) => b.id === id);
        if (!targetBook) return;

        navigate("/detail", {
            state: { book: { } },
        });
    };
```

### 📌 fetch - API 호출(책 등록 API 호출)

```
        try {
            const res = await fetch("http://localhost:8080/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                credentials: "include",  
                body: JSON.stringify(apiPayload),
            });

```

## 6. 프로젝트 설계 문서 링크 (optional)
프로젝트 전반의 흐름, ERD 구조, API 명세서, 협업 규칙 등이 담겨 있습니다.
📄 프로젝트 흐름(notion)
```
🔗 https://www.notion.so/4-20-_-2bf1779ea17e8055b273d610729db2e2

```
📄 ERD 구조와 API 명세서
```
🔗 https://drive.google.com/file/d/1HQs4t6HzsPvZyDS_ad77loR5L-eWW3dj/view?usp=sharing

🔗 https://docs.google.com/spreadsheets/d/131vSMyB1M9gsBOHBgG41y6cmInuIWBZRxlcFOYFgs3s/edit?usp=sharing
```


## 7. 개발 진행중 배운 점 및 개선점 (optional)
### 🔍 1) — 컴포넌트 구조화와 재사용성의 중요성

- 공통 UI(버튼, 카드, 모달 등)를 컴포넌트화하면서 유지보수성이 크게 향상되었다.

### 🔍 2) — 상태 관리의 역할과 데이터 흐름 이해

- 전역 상태(localStorage 활용)를 도입해 데이터 흐름을 명확히 이해하게 되었다.

### 🔍 3) — 개선할 점
- API 로딩·실패 시 시각적 피드백(로딩 스피너, 오류 메시지 등) 추가 필요
- 또한 비동기 요청 실패 처리 로직을 더 체계적으로 관리 필요
