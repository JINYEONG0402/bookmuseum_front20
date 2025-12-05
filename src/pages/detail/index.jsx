import React from "react";
import "./detail.css";

function Detail() {
  // 📌 나중에 백엔드에서 데이터 받아오면 이 부분만 바꾸면 됨!
  const book = {
    title: "고양이와 함께한 순간",
    date: "2025-01-01",
    image: "/cat-book.png", // public 폴더에 넣어두면 됨
    description: `
"우리는 때때로 너무 빨리 지나가 버리는 순간들을 뒤늦게 사랑하게 된다."
이 책은 일상 속에서 살아가는 사람들이 아주 작고 순한 순간들,
무심코 지나쳤던 감정과 풍경들을 다시 바라보도록 이끄는 이야기다.

저자는 반복되는 하루 속에서도 미묘한 움직임에서 조용히 피어나는 감정을
끌어 올려 글로 남긴다.

새벽의 흐릿한 지하철, 퇴근길 버스 창문에서 느껴지는 사람들의 체온,
오래된 동네 골목의 바람 등 모든 장면이 누군가의 기억 같은 느낌이다.

삶은 종종 거창한 목표보다 작은 순간들의 겹침으로 이루어진다.
사실 우리가 행복을 향해 나아간다고 말하는 것도 대부분 순간들이다.

그 순간들은 아무 일 없이 보이지만, 생각이 쌓여 지금의 나를 만든다.
저자는 그렇게 말한다.
"행복은 거대한 파도가 아니라, 매일 우리 곁을 스치고 지나가는 작은 물결이다."

우리도 어쩌면 이미 충분히 감정의 세계를 품고 살아가는 중이다.
기쁨과 슬픔, 설렘과 멈춤은 큰 일들이 아니라 가장 사소한 것에서 출발한다.

가끔은 너무 바쁘게 지나가며 놓친 것들을 돌아보길 바란다.
또 어떤 날은 아무것도 아닌 일들로 인해 웃음이 새어나오기도 한다.

이 책에서 다루는 이야기들은 거창하지 않다.
그러나 독자의 마음을 가장 조용하게 흔드는 이야기들이다.

평범한 일상 속에서 특별함을 만들고 싶은 모든 사람에게 바친다.
    `,
  };

  return (
    <div className="detail-container">
      <h2 className="detail-title">도서 상세 정보</h2>

      <div className="detail-box">
        {/* 왼쪽 이미지 */}
        <div className="detail-image-wrapper">
          <img src={book.image} alt="book" className="detail-image" />
        </div>

        {/* 오른쪽 내용 */}
        <div className="detail-content">
          <div className="detail-header">
            <h3 className="book-title">{book.title}</h3>
            <span className="book-date">📅 {book.date}</span>
          </div>

          <pre className="book-description">{book.description}</pre>
        </div>
      </div>
    </div>
  );
}

export default Detail;
