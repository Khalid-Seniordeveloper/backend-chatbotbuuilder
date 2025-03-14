"use client";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import gsap from "gsap";

export default function Feature() {
  const headingRef = useRef(null);
  const secondheading = useRef(null);
  const para = useRef(null);

  const controls = useAnimation();
  const isInView = useInView(headingRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden"); // Reset when out of view
    }
  }, [controls, isInView]);

  const button = useRef(null);

  useEffect(()=>{


    gsap.fromTo(
      button.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.6 }
    )

   

  },[])
 
  
 
  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };
  
  
  const itemVariants = {
    hidden: { opacity: 0, },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }, 
    },
  };
  return (
    <>
      <Navbar />
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center max-w-full mt-8 mx-auto">
          <motion.h2
            ref={headingRef}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 30 },
            }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#0071BA]"
          >
            Start with a Free Chatbot
          </motion.h2>
          <motion.h1
            ref={secondheading}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 30 },
            }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight leading-tight text-black drop-shadow-lg"
          >
            Build Smart Conversations in Minutes
          </motion.h1>
          <motion.p
            ref={para}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 30 },
            }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="mt-4 text-lg  text-gray-500"
          >
            Automate customer support, generate leads, and increase engagement
            effortlessly.
          </motion.p>
          <button
  ref={button}
  className="mt-6 px-8 py-3 bg-gradient-to-r from-[#25124A] to-blue-700 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-full shadow-lg"
>
  Get Started →
         </button>


        </div>

        <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16"
    >
      {[
        { icon: "fa-credit-card", title: "No Credit Card Required", desc: "Try it for free without any commitment." },
        { icon: "fa-gift", title: "100% Free to Start", desc: "Test the chatbot before making any decision." },
        { icon: "fa-box", title: "Generous Free Quota", desc: "• 1 chatbot\n• 20 messages\n• 50 webpages\n• 50k characters" },
        { icon: "fa-magic", title: "Powerful AI Features", desc: "• Customizable bots\n• Embedded widget\n• Chat history" },
      ].map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="feature-box flex flex-col items-center text-center bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <i className={`fas ${feature.icon} text-5xl text-[#0071BA]`}></i>
          <h3 className="font-bold text-xl mt-4 text-black">{feature.title}</h3>
          <p className="text-gray-500 mt-2 whitespace-pre-line">{feature.desc}</p>
        </motion.div>
      ))}
    </motion.div>
      </div>

      <div className="relative z-10 bg-gradient-to-b from-[#0071BA] via-[#1e0e3e] to-[#0071BA] py-16 px-6 mt-16 w-full">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white">
            Feature Overview
          </h2>
            <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="feature-container grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12"
        >
          {[
            {
              icon: "fa-link",
              title: "Integrate with Your Site",
              desc: "Easily embed your chatbot into any website.",
            },
            {
              icon: "fa-cogs",
              title: "Fully Customizable",
              desc: "Change chatbot behavior, appearance, and responses.",
            },
            {
              icon: "fa-hourglass-half",
              title: "Ready in 5 Minutes",
              desc: "Your chatbot will be live and learning instantly.",
            },
            {
              icon: "fa-code",
              title: "No Coding Required",
              desc: "Easily create bots with an intuitive interface.",
            },
            {
              icon: "fa-file-alt",
              title: "Chat History & Insights",
              desc: "Analyze past interactions and improve responses.",
            },
            {
              icon: "fa-chart-bar",
              title: "Advanced Analytics",
              desc: "Monitor chatbot performance and user engagement.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="font-bold text-lg text-black flex items-center">
                <i className={`fas ${item.icon} mr-3 text-[#0071BA]`}></i> {item.title}
              </h3>
              <p className="text-gray-500 font-semibold mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold text-black">
          Why Choose Our AI Chatbot?
        </h2>
        <p className="text-gray-500 mt-4 max-w-3xl font-semibold mx-auto">
          Our chatbot uses cutting-edge AI to understand user queries and
          provide smart responses. It helps businesses automate conversations,
          provide 24/7 support, and increase customer engagement.
        </p>

        <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
          {[
            {
              icon: "fa-robot",
              title: "AI-Powered Conversations",
              desc: "Our chatbot learns from interactions and adapts to users.",
            },
            {
              icon: "fa-users",
              title: "Engage Your Customers",
              desc: "Instant responses improve user experience and retention.",
            },
            {
              icon: "fa-lock",
              title: "Data Privacy & Security",
              desc: "We ensure that your data is protected and encrypted.",
            },
          ].map((adv, index) => (
            <motion.div
            key={index}
            variants={itemVariants}
            className="advantage-card flex flex-col items-center text-center bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
              <i className={`fas ${adv.icon} text-5xl text-[#0071BA]`}></i>
              <h3 className="font-bold text-xl mt-4 text-black">{adv.title}</h3>
              <p className="text-gray-500  mt-2">{adv.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </>
  );
}