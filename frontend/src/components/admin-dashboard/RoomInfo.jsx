import AxiosInstance from "scripts/axioInstance";

const { useEffect, useState } = require("react");

const RoomInfo = ({ doctorId }) => {
  const [room, setRoom] = useState();

  useEffect(() => {
    AxiosInstance.get(`http://localhost:7200/rooms/doctor/${doctorId}`)
      .then((response) => {
        console.log(response);
        setRoom(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <>{room ? room : "No room data available"} </>;
};

export default RoomInfo;
