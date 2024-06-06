import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "scripts/axioInstance";
const CreateCall = () => {
  const { roomId } = useParams();
  const empty = () => {};

  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const meeting = async (element) => {
    const appID = 277620708;
    const serverSecret = "713a60c6068324f8e8717c46426a041e";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Type your name"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
      sharedLinks: [
        {
          name: "Copy link",
          url: `http://localhost:3000/common/call/${roomId}`,
        },
      ],
    });
  };

  useEffect(() => {
    const url = `http://localhost:7400/tele/verify/${roomId}`;
    AxiosInstance.get(url)
      .then((result) => {
        setLoading(false);
      })
      .catch((error) => {
        setDenied(true);
        setErrorMessage(error.response.data.message);

        // REMOVE THE NEXT LINE! Added for testing purpose.
        // setLoading(false);
      });
  }, []);

  return (
    <div>
      <div ref={loading ? empty : meeting} style={{ width: "100%" }} />
      {loading && (
        <div className="card m-4 p-4">
          {denied ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>
              Please wait while your access to appointment <b>{roomId}</b> is
              being verified.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CreateCall;
