"use client";
import axios from "axios";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { getCookie } from "cookies-next";
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";

const CurrentChatbox = ({ chatId, chatbot }) => {
  const messagesEndRef = useRef(null);
  const [botPic, setBotPic] = useState("");
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageId, setMessageId] = useState(chatId || null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [abortController, setAbortController] = useState(new AbortController());
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/chatbot/getmessages/${selectedChat}`
      );
      const fetchedMessages = response.data.data || [];
      setChatMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), ...fetchedMessages],
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages[selectedChat]]);

  useEffect(() => {
    const cookieData = getCookie("userData");
    if (cookieData) {
      const parsedUser = JSON.parse(cookieData);
      setUserId(parsedUser._id);
    }
  }, []);

  useEffect(() => {
    if (chatId) {
      setMessageId(chatId);
      setSelectedChat(chatId);

      if (chatbot?.greetingMessage) {
        setChatMessages((prev) => ({
          ...prev,
          [chatId]: [
            {
              _id: chatbot._id,
              text: chatbot.greetingMessage,
              sender: "bot",
              timestamp: Date.now(),
            },
          ],
        }));
      }
    }
  }, [chatId, chatbot]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);


  const sendMessage = async () => {
    if (message.trim() === "" || !selectedChat) return;
  
    const controller = new AbortController();
    setAbortController(controller);
  
    const dummyUserMessageId = `user-${Date.now()}`;
    const dummyBotMessageId = `bot-${Date.now()} + 1`;
  
    const userMessage = {
      text: message,
      sender: "user",
      _id: dummyUserMessageId,
      timestamp: Date.now(),
    };
  
    const soundEffect = new Audio("/chat.mp3");
    soundEffect.play();
    setChatMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), userMessage],
    }));
    setMessage("");
  
    try {
      setIsTyping(true);
      setIsStreaming(true); // Start streaming
  
      const response = await fetch(
        `http://localhost:5000/api/chatbot/ask?question=${encodeURIComponent(
          message
        )}&chatbotId=${selectedChat}`,
        { signal: controller.signal }
      );
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = "";
  
      setChatMessages((prev) => ({
        ...prev,
        [selectedChat]: [
          ...(prev[selectedChat] || []),
          {
            _id: dummyBotMessageId,
            text: "Thinking...",
            sender: "bot",
            timestamp: Date.now(),
          },
        ],
      }));
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        setIsTyping(false);
  
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
  
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.replace("data: ", "").trim();
  
            if (data.startsWith("[DONE")) {
              const jsonStartIndex = data.indexOf("{");
              if (jsonStartIndex !== -1) {
                const jsonStr = data.substring(jsonStartIndex);
                try {
                  const { userMessageId, botMessageId } = JSON.parse(jsonStr);
                  setChatMessages((prev) => ({
                    ...prev,
                    [selectedChat]: prev[selectedChat].map((msg) => {
                      if (msg._id === dummyUserMessageId) {
                        return { ...msg, _id: userMessageId };
                      } else if (msg._id === dummyBotMessageId) {
                        return {
                          ...msg,
                          _id: botMessageId,
                          text: botResponse.trim(),
                        };
                      }
                      return msg;
                    }),
                  }));
                } catch (err) {
                  console.error("Error parsing message IDs:", err);
                }
              }
              setIsStreaming(false); // Stop streaming
              return;
            } else {
              botResponse += data + " ";
  
              setChatMessages((prev) => {
                const updatedMessages = prev[selectedChat].map((msg) =>
                  msg._id === dummyBotMessageId
                    ? { ...msg, text: botResponse.trim() + "..." }
                    : msg
                );
                return { ...prev, [selectedChat]: updatedMessages };
              });
            }
          }
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error("Error sending message:", error);
      }
    } finally {
      setIsTyping(false);
      setIsStreaming(false); // Ensure streaming is stopped
    }
  };
  
  const stopStreaming = () => {
    abortController.abort();
    setIsStreaming(false);
  };
  
  // ... rest of the code
  
  <div className="flex items-center bg-gray-50 p-3 border-t border-gray-300">
    <input
      type="text"
      placeholder="Type a message..."
      className="flex-grow p-2 bg-white text-gray-900 rounded-lg outline-none border border-gray-300 focus:border-blue-500"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      disabled={isTyping}
    />
    {isStreaming ? (
      <button
        onClick={stopStreaming}
        className="ml-3 w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    ) : (
      <button
        onClick={sendMessage}
        disabled={isTyping}
        className="ml-3 w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 disabled:opacity-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    )}
  </div>

  const fetchChatHistory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/chatbot/getchathistory",
        { id: userId }
      );
      setChatHistory(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching chat history:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (chatHistory.length > 0) {
      const currentChat = chatHistory.find((chat) => chat._id === selectedChat);
      setBotPic(currentChat?.botPicUrl || "");
    }
  }, [chatHistory, selectedChat]);

  useEffect(() => {
    if (userId) {
      fetchChatHistory();
    }
  }, [userId]);

  const MessageBubble = ({ msg, botPic }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
  
    const handleTextToSpeech = (text) => {
      if (isSpeaking) {
        speechSynthesis.cancel(); // Stop speaking
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false); // Reset state when speech ends
        speechSynthesis.speak(utterance); // Start speaking
        setIsSpeaking(true);
      }
    };
  
    // Cleanup speech synthesis on component unmount
    useEffect(() => {
      return () => {
        if (isSpeaking) {
          speechSynthesis.cancel(); // Stop speaking when component unmounts
          setIsSpeaking(false); // Reset state
        }
      };
    }, [isSpeaking]);
  
    // Stop speech on page refresh
    useEffect(() => {
      const handleBeforeUnload = () => {
        if (isSpeaking) {
          speechSynthesis.cancel(); // Stop speaking before page refreshes
          setIsSpeaking(false); // Reset state
        }
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [isSpeaking]);
  
    return (
      <div
        className={`flex items-start mb-3 pr-1 ${
          msg.sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        {msg.sender === "bot" && (
          <img
            src={
              botPic ||
              "https://pics.craiyon.com/2024-01-10/TvlRGJDhR9-J2TbOqngHpw.webp"
            }
            alt="Bot"
            className="w-10 h-10 bg-gray-300 mr-4 rounded-full object-cover"
          />
        )}
  
        <div
          className={`relative inline-block px-3 py-2 rounded-lg shadow-sm ${
            msg.sender === "user" ? "bg-blue-100" : "bg-white"
          } border border-gray-200 min-h-[40px] max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] break-words overflow-hidden`}
        >
          <ReactMarkdown
            key={`${msg._id}-${msg.text}`}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className="markdown-content"
          >
            {msg.text}
          </ReactMarkdown>
  
          {/* Timestamp */}
          {msg.timestamp && (
            <p className="text-xs pr-2 text-gray-500 mt-0.5">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          )}
  
          {/* Speaker Icon (for bot messages only) */}
          {msg.sender === "bot" && (
            <button
              className="absolute bottom-1 right-1 text-gray-400 hover:text-gray-600"
              onClick={() => handleTextToSpeech(msg.text)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {/* Speaker Icon */}
                {isSpeaking ? (
                  // Unmute Icon (speaker with sound waves)
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                ) : (
                  // Mute Icon (speaker with a slash)
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM16.5 12l4.5 4.5-1.5 1.5-4.5-4.5-4.5 4.5-1.5-1.5 4.5-4.5-4.5-4.5 1.5-1.5 4.5 4.5 4.5-4.5 1.5 1.5-4.5 4.5z" />
                )}
              </svg>
            </button>
          )}
        </div>
  
        {msg.sender === "user" && (
          <img
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
            alt="User"
            className="w-10 h-10 bg-gray-300 ml-2 rounded-full object-cover"
          />
        )}
      </div>
    );
  };
  const [like, setLike] = useState(false);
  const handleLike = () => {
    if (!like) {
      setLike(true);
      setDisLike(false);
    }
  };
  const [disLike, setDisLike] = useState(false);

  const handleDisLike = () => {
    if (!disLike) {
      setDisLike(true);
      setLike(false);
    }
  };

  const deleteChats = async (chatId) => {
    if (!chatId) {
      alert("Chat not found.");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/chatbot/deleteChats/${chatId}`);
      console.log(response);
  
      setChatMessages((prev) => {
        const updatedMessages = { ...prev };
        
        if (chatbot?.greetingMessage) {
          updatedMessages[chatId] = [
            {
              _id: chatbot._id,
              text: chatbot.greetingMessage,
              sender: "bot",
              timestamp: Date.now(),
            },
          ];
        } else {
          delete updatedMessages[chatId]; 
        }
  
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <>
      <section className="w-full  h-auto md:h-[80vh] flex flex-col bg-[#FFFFFF] shadow-lg rounded-xl overflow-hidden m-auto flex-grow border border-gray-200">
        <div className="flex items-center bg-blue-500 p-4 space-x-3 text-white justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={
                botPic ||
                "https://pics.craiyon.com/2024-01-10/TvlRGJDhR9-J2TbOqngHpw.webp"
              }
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
              alt="Bot"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {chatHistory.find((chat) => chat._id === selectedChat)?.name ||
                  "Chat"}
              </h2>
              <p className="text-sm">
                {new Date(
                  chatHistory.find((chat) => chat._id === selectedChat)
                    ?.createdAt || Date.now()
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button onClick={() => deleteChats(chatId)}>
              <i className="fa-solid fa-rotate-right"></i>
            </button>

            <button
              onClick={handleLike}
              disabled={like}
              className={` rounded-full transition-all ${
                like ? "text-green-500" : "text-white"
              }`}
            >
              <i className="fa-solid fa-thumbs-up"></i>
            </button>
            <button
              onClick={handleDisLike}
              disabled={disLike}
              className={` rounded-full transition-all ${
                disLike ? "text-red-500" : "text-white"
              }`}
            >
              <i className="fa-solid fa-thumbs-down transform -scale-x-100"></i>
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-2 bg-[#FFFFFF] h-[70vh] space-y-3 ">
          {chatMessages[selectedChat]?.map((msg) => (
            <MessageBubble key={msg._id} msg={msg} />
          ))}

          {isTyping && (
              <div className="flex items-start gap-2 mb-3 pr-1">
                <img
                  src={
                    botPic ||
                    "https://pics.craiyon.com/2024-01-10/TvlRGJDhR9-J2TbOqngHpw.webp"
                  }
                  alt="Bot"
                  className="w-10 h-10 bg-gray-300 rounded-full object-cover"
                />
                <div className="px-2 py-2 rounded-lg shadow-sm bg-white border border-gray-200 min-h-[32px] w-35">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          <div ref={messagesEndRef} />
        </div>
        {(like || disLike) && (
          <div className="flex justify-center mb-3">
            <p
              className={`text-center flex justify-center text-sm max-w-[50%] font-medium px-2 py-1 rounded-lg ${
                like ? "text-green-600 bg-green-200" : "text-red-600 bg-red-200"
              }`}
            >
              {like
                ? "USER HAS GIVEN THE CHAT A POSITIVE RATING"
                : "USER HAS GIVEN THE CHAT A NEGATIVE RATING"}
            </p>
          </div>
        )}
        <div className="flex items-center bg-gray-50 p-3 border-t border-gray-300">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow p-2 bg-white text-gray-900 rounded-lg outline-none border border-gray-300 focus:border-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={isTyping}
          />
          {isStreaming ? (
            <button
              onClick={stopStreaming}
              className="ml-3 w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={sendMessage}
              disabled={isTyping}
              className="ml-3 w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 disabled:opacity-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default CurrentChatbox;