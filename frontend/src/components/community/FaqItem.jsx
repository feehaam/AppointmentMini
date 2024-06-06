import { useState } from "react";

const FaqItem = ({ st }) => {
  const [status, setStatus] = useState(st);
  console.log('faq', status);
  const getTitle = () => {
    return (
      <div
        style={{
          margin: "10px",
          borderBottom: "1px solid #eee",
        }}
      >
        <h3>
          <i class="fas fa-question-circle"></i> {status.title}
        </h3>
      </div>
    );
  };

  if (status !== null) {
    return (
      <div
        style={{
          border: "1px solid #ddf",
          margin: "5px",
          padding: "5px",
          borderRadius: "5px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          backgroundColor: "white",
          backgroundColor: "#eeffee",
        }}
      >
        {getTitle()}
        <div
          style={{
            padding: "10px",
            borderBottom: "1px solid #eee",
            color: "#555",
            backgroundColor: "white",
          }}
        >
          {status.content}
        </div>
        <div style={{ marginLeft: "10px" }}></div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default FaqItem;
