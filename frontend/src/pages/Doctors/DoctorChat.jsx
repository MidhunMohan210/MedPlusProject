/* eslint-disable react/no-unknown-property */
import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import { BASE_URL, docToken } from "../../config";
import { toast } from "react-toastify";
import Error from "../../components/About/Error";


const ENDPOINT = "http://localhost:7000";

var socket, selectedChatCompare;

function DoctorChat() {
  const [error,setError]=useState("")
  const doctorInfo = JSON.parse(localStorage.getItem("doctorInfo"));
  // console.log(doctorInfo);

  const [rooms, setRooms] = useState([]);
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState([]);
  const [patient, setPatient] = useState("");
  const [content, setContent] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [notification, setNotification] = useState([]);

  console.log(patient);
  useEffect(()=>{
    socket=io(ENDPOINT)
    socket.emit("setup",doctorInfo)
    socket.on("connection",()=>setSocketConnected(true))
  },[])

  //////fetch rooms///////

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/doctors/get-doctor-rooms/${doctorInfo._id}`,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${docToken}`,
            },
          }
        );

        let result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setRooms(result);
      } catch (error) {
        setError(error)
        console.log("error", error);
      }
    };
    fetchRoom();
  }, [doctorInfo._id]);

  ////fetch messages //////

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/doctors/get-room-messages/${chatId}`,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${docToken}`,
            },
          }
        );

        let result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setChats(result);
        setMessageSent(false);
        selectedChatCompare = chats;
        socket.emit("join_chat",chatId)
      } catch (error) {
    
        console.log("error", error);
      }
    };
    fetchMessages();
  }, [chatId, messageSent]);


  //// sendHandler /////

  const sendHandler = async () => {
    if (content === "") {
      toast.error("Message cannot be empty");
      return;
    }

    const sendMessage = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/doctors/sendChat/${chatId}/${doctorInfo._id}/Doctor/${patient._id}/${doctorInfo.name}`,
          {
            method: "post",
            headers: {
              Authorization: `Bearer ${docToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: content }),
          }
        );

        let result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setContent("");
        setMessageSent(true);
        socket.emit('new message',result)
      } catch (error) {
        console.log("error", error);
      }
    };
    sendMessage();
  };


useEffect(() => {
  const handleNewMessage = (newMessageReceived) => {
    console.log("newMessageReceived", newMessageReceived);
    toast.success(`New message from ${newMessageReceived.room.user.name}`);

    if (!selectedChatCompare || chatId !== newMessageReceived.room._id) {
      // Do nothing if the message is not for the current chat
    } else {
      setChats((prevChats) => [...prevChats, newMessageReceived]);
    }
  };

  // Subscribe to the socket event
  socket.on('message received', handleNewMessage);

  // Cleanup: Unsubscribe from the socket event when the component unmounts
  return () => {
    socket.off('message received', handleNewMessage);
  };
}, [chatId, selectedChatCompare, setChats]); // Make sure to include all dependencies in the dependency array


  // console.log(chatId);
  // console.log(patient);
  // console.log(chats);

  return (

    <div>
      {error && <Error errorMessage={error.message} />}
      { !error && (
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">QuickChat</div>
            </div>

            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                
              </div>

              {rooms.length > 0 ? (
                rooms.map((chat, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-1 mt-4 -mx-2  overflow-y-auto"
                    onClick={() => {
                      setChatId((prevChatId) => chat._id);
                      setPatient((prevPatient) => chat.user);
                    }}
                  >
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                      <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                        M
                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {chat.user.name}
                      </div>
                    
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col space-y-1 mt-4 -mx-2  overflow-y-auto">
                  <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                    <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                      U
                    </div>
                    <div className="ml-2 text-sm font-semibold">No chats</div>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                {chatId ? (
                  chats && chats.length > 0 ? (
                    chats.map((chat, index) => (
                      <div key={index} className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                          {chat.senderType === "User" ? (
                            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                              <div className="flex flex-row items-center">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                  A
                                </div>
                                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                  <div> {chat.content}</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="col-start-6 col-end-13 p-3 rounded-lg">
                              <div className="flex items-center justify-start flex-row-reverse">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                  A
                                </div>
                                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                  <div> {chat.content}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1>No Chats available!!</h1>
                  )
                ) : null}
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    {/* <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg> */}
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button
                      // onClick={() => sendHandler()}
                      className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                    >
                      {/* <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg> */}
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => sendHandler()}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        )}
    </div>
  );
}

export default DoctorChat;
