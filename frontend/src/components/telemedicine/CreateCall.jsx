import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
const CreateCall = () => {
  const { roomId } = useParams();
  const empty = () => {};

  const meeting = async (element) => {
    const appID = 2131300210;
    const serverSecret = "5b67e505fa07bc2166ff8cde93a292c5";
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
          url: `http://localhost:3000/tele/call/${roomId}`,
        },
      ],
    });
  };

  return <div>{meeting}</div>;
};
export default CreateCall;
