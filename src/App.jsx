<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

=======
// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookCreatePage from "./pages/register/BookCreatePage.jsx";
import AiImagePage from "./pages/aiImg/AiImagePage.jsx";
import BookUpdatePage from "./pages/update/BookUpdatePage.jsx";

>>>>>>> 363353d833bbd03871f625b802584a0f813e1606
import Home from "./pages/home";
import Login from "./pages/login";
import Join from "./pages/join";

<<<<<<< HEAD

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
=======
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/register" element={<BookCreatePage />} />
                <Route path="/ai-image" element={<AiImagePage />} />
                <Route path="/book/update/:bookId" element={<BookUpdatePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;   // ✅ 이게 반드시 필요!
>>>>>>> 363353d833bbd03871f625b802584a0f813e1606
