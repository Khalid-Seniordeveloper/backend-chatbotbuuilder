"use client";
import axios from "axios";
import { use } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import CurrentChatbox from "@/pages/chatting/chat";
import loadingImg from "../../../../public/images/loading.gif";


export default function Page({ params }) {
  const [chatbotExists, setChatbotExists] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatbot, setChatbot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const resolvedParams = use(params);

  const { slug } = resolvedParams;

  useEffect(() => {
    const fetchChatBotData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chatbot/single/${slug}`
        );
        setChatbot(res.data.chatbot || null);
      } catch (error) {
        console.log("Error fetching chatbot =>", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchChatBotData();
    }
  }, [slug]);

  useEffect(() => {
    const cookieData = getCookie("userData");
    if (cookieData) {
      const parsedUser = JSON.parse(cookieData);
      setUserId(parsedUser._id);
    }
  }, []);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/chatbot/getchathistory",
          { id: userId }
        );
        setChatHistory(response.data.data || []);
      } catch (error) {
        console.log("Error fetching chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchChatHistory();
    }
  }, [userId]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      setChatbotExists(chatHistory.some((chat) => chat._id === slug));
    }
  }, [chatHistory, slug]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Image src={loadingImg} alt="Loading..." width={50} height={50} />
        </div>
      ) : chatbotExists && chatbot ? (
        <CurrentChatbox chatId={slug} chatbot={chatbot} />
      ) : (
        <p className="text-red-500 text-center mt-4">
          No chatbot was found for the given ID: "{slug}".
        </p>
      )}
    </>
  );
}