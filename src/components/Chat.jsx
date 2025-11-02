import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
const Chat = () => {
  const { targetUserId } = useParams();
  const loggedInUser = useSelector((state) => state.user);
  const userId = loggedInUser?.user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const getChat = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true
    });
    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    getChat();
  }, []);
  useEffect(() => {
    // as soon as page load the socket connection is make joinChat event emit
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: loggedInUser?.user?.firstName,
      userId,
      targetUserId
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + "reciedv.......", text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);
  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: loggedInUser?.user?.firstName,
      lastName: loggedInUser?.user?.lastName,
      userId,
      targetUserId,
      text: newMessage
    });
    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-500 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-y-scroll p-5">
        {/* display messages */}
        {messages.map((msg, index) => (
          <>
            <div
              key={index}
              className={`chat ${
                loggedInUser?.user?.firstName === msg.firstName
                  ? "chat-end"
                  : "chat-start"
              }`}
            >
              <div className="chat-header">
                {msg?.firstName + " " + msg.lastName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
            {/* <div className="chat chat-start">
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">2 hour ago</time>
              </div>
              <div className="chat-bubble">I loved you.</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div> */}
          </>
        ))}
      </div>
      <div className="p-5 border border-gray-600 flex gap-2 items-center">
        {/* buton to send messages */}
        <input
          className="border flex-1 border-gray-600  text-red-500"
          type="text"
          name=""
          id=""
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
