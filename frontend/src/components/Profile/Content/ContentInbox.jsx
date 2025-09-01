import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { server } from "../../../server";
import { LuSendHorizontal } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import { IoReturnUpBack } from "react-icons/io5";
import { IoIosImages } from "react-icons/io";
import socketIO from "socket.io-client";

const SOCKET_ENDPOINT = "http://localhost:4000";

function UserInbox() {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Setup socket
  useEffect(() => {
    const s = socketIO(SOCKET_ENDPOINT, { transports: ["websocket"] });
    setSocket(s);

    if (user?._id) {
      s.emit("addUser", user._id);
    }

    s.on("getMessage", (msg) => {
      setArrivalMessage(msg);
    });

    return () => s.disconnect();
  }, [user?._id]);

  // Handle arrival messages and update conversation list
  useEffect(() => {
    if (arrivalMessage && currentChat?._id === arrivalMessage.conversationId) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.map((conv) =>
        conv._id === arrivalMessage?.conversationId
          ? {
              ...conv,
              lastMessage: arrivalMessage.text || "[Image sent]",
              updatedAt: arrivalMessage.createdAt,
            }
          : conv
      );
      return updatedConversations.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    });
  }, [arrivalMessage, currentChat]);

  // Fetch conversations on component load
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${server}/conversation/get-all-conversation-user/${user._id}`
        );
        setConversations(res.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch conversations");
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchConversations();
  }, [user?._id]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setCurrentChat(conversation);
    fetchMessages(conversation._id);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setCurrentChat(null);
    setMessages([]);
  };

  const fetchMessages = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/message/get-all-messages/${id}`);
      setMessages(res.data.data || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    formData.append("sender", user._id);
    formData.append("conversationId", selectedConversation._id);

    try {
      const res = await axios.post(
        `${server}/message/create-new-message`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const sentMessage = res.data.data;
      setMessages((prev) => [...prev, sentMessage]);

      const receiverId = selectedConversation.members.find(
        (m) => m !== user._id
      );
      socket?.emit("sendMessage", { ...sentMessage, receiverId });

      await axios.put(
        `${server}/conversation/update-last-message/${selectedConversation._id}`,
        {
          lastMessage: "[Image sent]",
          lastMessageId: sentMessage._id,
        }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = null; // Reset file input
    }
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const receiverId = selectedConversation.members.find((m) => m !== user._id);
    const payload = {
      conversationId: selectedConversation._id,
      sender: user._id,
      text: newMessage,
    };

    try {
      const res = await axios.post(
        `${server}/message/create-new-message`,
        payload
      );
      const sentMessage = res.data.data;

      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage("");

      socket?.emit("sendMessage", { ...sentMessage, receiverId });

      await axios.put(
        `${server}/conversation/update-last-message/${selectedConversation._id}`,
        {
          lastMessage: sentMessage.text || "[Image sent]",
          lastMessageId: sentMessage._id,
        }
      );
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      <style>
        {`
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
          ::-webkit-scrollbar-thumb { background: #c5c5c5; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
          * { scrollbar-width: thin; scrollbar-color: #c5c5c5 #f1f1f1; }
        `}
      </style>
      
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row h-[calc(100vh-100px)]">
          <div className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 ${selectedConversation ? "hidden md:block" : "block"}`}>
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>
            </div>
            {loading ? (
              <div className="p-4 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 animate-pulse">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : conversations.length > 0 ? (
              <div className="overflow-y-auto h-[calc(100%-80px)]">
                {conversations.map((conversation) => (
                  <MessageListItem
                    key={conversation._id}
                    conversation={conversation}
                    isSelected={selectedConversation?._id === conversation._id}
                    onClick={() => handleSelectConversation(conversation)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">No conversations yet</div>
            )}
          </div>
          <div className={`flex-1 ${selectedConversation ? "block" : "hidden md:block"}`}>
            {selectedConversation ? (
              <UserConversationDetails
                conversation={selectedConversation}
                onBack={handleBackToList}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                messages={messages}
                user={user}
                handleSendMessage={handleSendMessage}
                handleImageUpload={handleImageUpload}
                uploading={uploading}
                fileInputRef={fileInputRef}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 p-4">
                <MdOutlineMessage size={30} className="text-blue-500 mb-3" />
                <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                <p className="text-center text-gray-600">Choose a conversation from the list to view messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const MessageListItem = ({ conversation, isSelected, onClick }) => {
  const formatTime = (ts) => {
    if (!ts) return "";
    const date = new Date(ts);
    const diffInHours = (new Date() - date) / (1000 * 60 * 60);
    if (diffInHours < 24) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div onClick={onClick} className={`flex items-center p-4 border-b border-gray-100 cursor-pointer transition-colors ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"}`}>
      <div className="relative flex-shrink-0">
        <img src={conversation.shopAvatar || "https://via.placeholder.com/150"} alt="Shop" className="w-12 h-12 rounded-full object-cover" />
        <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white"></div>
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{conversation.shopName || "Unknown Shop"}</h3>
          <span className="text-xs text-gray-500 whitespace-nowrap">{formatTime(conversation.updatedAt)}</span>
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage || "No messages yet"}</p>
      </div>
    </div>
  );
};

const UserConversationDetails = ({
  conversation,
  onBack,
  newMessage,
  setNewMessage,
  messages,
  user,
  handleSendMessage,
  handleImageUpload,
  uploading,
  fileInputRef,
}) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center shrink-0">
        <button onClick={onBack} className="md:hidden mr-3 p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
          <IoReturnUpBack size={20} />
        </button>
        <div className="relative">
          <img src={conversation.shopAvatar || "https://via.placeholder.com/40"} alt="Shop" className="w-10 h-10 rounded-full object-cover" />
          <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white"></div>
        </div>
        <div className="ml-3">
          <h2 className="font-semibold text-gray-900">{conversation.shopName || "Unknown Shop"}</h2>
          <p className="text-xs text-gray-500">Active now</p>
        </div>
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id || Date.now()} className={`flex mb-4 ${message.sender === user._id ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md rounded-xl p-3 ${message.sender === user._id ? "bg-blue-500 text-white rounded-br-none" : "bg-white border border-gray-200 rounded-bl-none shadow-sm"}`}>
                {message.images?.url ? (
                  <img src={message.images.url} alt="sent" className="w-48 h-48 object-cover rounded-lg mb-2" />
                ) : (
                  <p className="break-words">{message.text}</p>
                )}
                <p className="text-xs mt-1 text-right opacity-80">
                  {new Date(message.createdAt || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <MdOutlineMessage size={30} className="text-blue-500 mb-3" />
            <p>No messages yet. Start a conversation!</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center bg-white shrink-0">
        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" multiple className="hidden" />
        <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="p-3 text-gray-600 hover:text-blue-500 disabled:opacity-50 transition-colors">
          {uploading ? <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin"></div> : <IoIosImages size={24} />}
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 mx-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage} disabled={!newMessage.trim()} className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors">
          <LuSendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserInbox;