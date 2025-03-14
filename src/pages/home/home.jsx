"use client"
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";



const HomePage = () => {

  const headingRef = useRef(null)
  const list = useRef(null)
  const button = useRef(null)
  const para = useRef(null)

  useEffect(()=>{
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.2 } 
    )

    gsap.fromTo(
      list.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.4 } 
    )

    gsap.fromTo(
      button.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.6 }
    )

    gsap.fromTo(
      para.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.8 }
    )

  },[])
  
  return (
    <>
      <div   className="relative h-[calc(100vh)] flex flex-col items-center justify-center text-gray-900 pt-[8%] px-6">
        <div className="relative text-center max-w-5xl w-full ">
          <h1 ref={headingRef} className="text-4xl md:text-7xl font-bold leading-tight text-gray-900">
            Instantly build AI chatbots with your{" "}
            <span className="text-[#0071BA] font-extrabold">
              knowledge base
            </span>
          </h1>
          <ul ref={list} className="mt-12 flex flex-wrap justify-center gap-4 text-lg text-gray-700">
            <li className="flex items-baseline gap-2">
              <i className="fas fa-robot text-[#0071BA]"></i> Build ChatGPT
              powered bots from your sitelinks and files
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-code text-[#0071BA]"></i> Embed them easily
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-chart-line text-[#0071BA]"></i> Boost sales
              conversions
            </li>
            <li className="flex items-baseline ">
              <i className="fas fa-percentage text-[#0071BA] mr-1"></i> Reduce up to
              70% of support queries
            </li>
            <li className="flex items-center gap-2 pb-8">
              <i className="fas fa-headset text-[#0071BA]"></i> Provide instant,
              24/7 support
            </li>
          </ul>
          <Link href={"/signup"}>
            <button ref={button} className=" px-8 py-3 bg-[#0071BA] hover:bg-blue-700 text-white font-semibold rounded-lg text-lg shadow-md">
              Sign up for free
            </button>
          </Link>
          <p ref={para} className="mt-2 text-sm text-gray-500">No credit card required</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;

