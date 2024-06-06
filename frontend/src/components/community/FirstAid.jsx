import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import FirstAidItems from "./FirstAidItems";
import AxiosInstance from "scripts/axioInstance";

const FirstAid = () => {
  const [status, setStatus] = useState([]);
  const [page, setPage] = useState([]);
  
  const [isEnded, setIsEnded] = useState(false);
  const size = 8;
  const sortedReverse = true;

  useEffect(() => {
    setPage(0);
  }, []);

  useEffect(() => {
    AxiosInstance.get(
      `http://localhost:7500/posts/list/firstaid/${page}/${size}/${sortedReverse}`, status
    )
      .then((response) => {
        let list = response.data;
        let data = [...status]
        console.log(list);
        let loaded = 0;
        for (let i = 0; i < list.length; i++) {
          data[page * size + i] = list[i];
          loaded++;
        }
        if(loaded < size) setIsEnded(true)
        setStatus(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  return (
    <>
      <Row>
        <Col>
          {status.map((st, index) => (
            <FirstAidItems key={index} st={st} />
          ))}
        </Col>
      </Row>

      {isEnded ? (
        <Row
          style={{
            justifyContent: "center",
            margin: "5px",
            marginTop: "10px",
            padding: "10px",
            fontWeight: "bold",
            backgroundColor: "#eee",
          }}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          There are no posts remaining.
        </Row>
      ) : (
        <Row
          style={{
            justifyContent: "center",
            margin: "5px",
            marginTop: "10px",
            padding: "10px",
            fontWeight: "bold",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            cursor: "pointer",
          }}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Load more posts
        </Row>
      )}
    </>
  );
};
export default FirstAid;
