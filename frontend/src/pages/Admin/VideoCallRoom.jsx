import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function VideoCallRoom() {
  const { roomId } = useParams();

  const myMeeeting = async (element) => {
    const appID = 120567934;
    const serverSecret = "1d137a3c1f39d93bb5cae21bf20c0ed1";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "MedPlus"
    );

    const zc=ZegoUIKitPrebuilt.create(kitToken)
    zc.joinRoom({
        container:element,
        sharedLinks:[{
            name:'Copy Link',
            url:`https://www.medplus.midhunmohan.online/admin/room/${roomId}`
        }],
        scenario:{
            mode:ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton:false
    })
  };

  return <div>
    <div ref={myMeeeting} />
  </div>;
}

export default VideoCallRoom;
