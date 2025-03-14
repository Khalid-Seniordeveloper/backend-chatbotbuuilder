"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Alert } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ai from "../../public/images/ai.png";
import googleLogo from "../../public/images/googleLogo.png";
import gsap from "gsap";

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("null");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const SignupUrl = process.env.NEXT_PUBLIC_Signup_Url;
  const baseUrl = process.env.NEXT_PUBLIC_BaseUrl;

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };

    if (!data.name || !data.email || !data.password) {
      setAlertMessage("All fields are required.");
      setAlertSeverity("error");
      setShowMessage(true);
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(`${baseUrl}${SignupUrl}`, data);
      console.log(res);
      setAlertMessage(res?.data?.message);
      setAlertSeverity("success");
      setShowMessage(true);
      router.replace("/login");
      setLoading(false);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    } catch (err) {
      setLoading(false);
      setAlertMessage(err?.response?.data?.message);
      setAlertSeverity("error");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  const googleAuth = () => {
    localStorage.setItem("isGoogleAuth", "true");
    window.location.href = "http://localhost:5000/auth/google";
  };

  const heading = useRef(null)
  const para = useRef(null)
  const headingOne = useRef(null)
  const google = useRef(null)
  const or = useRef(null)
  const input = useRef(null)
  const input2 = useRef(null)
  const input3 = useRef(null)
  const btn = useRef(null)
  const secondLast = useRef(null)
  const last = useRef(null)



  useEffect(() => {
    gsap.fromTo(
      heading.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2, 
      } 
    )

    gsap.fromTo(
      para.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2, 
      }
    )

    gsap.fromTo(
      headingOne.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2, 
      } 
    )

    gsap.fromTo(
      google.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2, 
      }
    )

      gsap.fromTo(
      or.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2, 
      }
    )

    gsap.fromTo(
      input.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2, 
      }
    )

    gsap.fromTo(
      input2.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2, 
      } 
    )

    gsap.fromTo(
      input3.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2, 
      } 
    )

    gsap.fromTo(
      btn.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2, 
      }
    )

    gsap.fromTo(
      secondLast.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2,
      } 
    )

    gsap.fromTo(
      last.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.2,
      } 
    )

  }, []);

  const rightHeading = useRef(null)
  const rightPara = useRef(null)



  useEffect(()=>{
    gsap.fromTo(
      rightHeading.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.3, 
      } 
    )

    gsap.fromTo(
      rightPara.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, 
        delay: 0.3, 
      }
    )
  },[])


  return (
    <>
      {showMessage && (
        <div className="fixed top-4 right-4 z-[99999]">
          <Alert
            onClose={() => setShowMessage(false)}
            variant="filled"
            severity={alertSeverity}
          >
            {alertMessage}
          </Alert>
        </div>
      )}
      <div className="flex min-h-screen absolute top-0">
        <div  className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white shadow-md text-center">
          <h2 ref={heading} className="text-4xl font-bold mb-4 text-blue-700">
            <i className="fas fa-comments text-5xl text-blue-700 mb-4"></i>{" "}
            Saylani chat
          </h2>
          <p ref={para} className="text-gray-500 w-80 mb-6">
            Your AI-powered chatbot assistant for seamless conversations and
            instant support.
          </p>
          <div  className="max-w-sm w-full">
            <h3 ref={headingOne} className="text-2xl font-semibold text-blue-700 text-center mb-8">
              Sign in with
            </h3>
            <button
            ref={google}
              onClick={googleAuth}
              className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-3 rounded-md mb-4 shadow hover:bg-gray-200"
            >
              <Image
                src={googleLogo}
                width={70}
                height={70}
                priority={true}
                alt="Google"
              />
            </button>
            <div ref={or} className="text-center text-gray-400 mb-4">or</div>
            <form  onSubmit={register}>
              <input
              ref={input}
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-md p-2 mb-4 focus:ring focus:ring-blue-300"
              />
              <input
              ref={input2}
                type="email"
                placeholder="yourname@gmail.com"
                className="w-full border rounded-md p-2 mb-4 focus:ring focus:ring-blue-300"
              />
              <input
              ref={input3}
                type="password"
                placeholder="Your Password"
                className="w-full border rounded-md p-2 mb-4 focus:ring focus:ring-blue-300"
              />
              <button
              ref={btn}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700"
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </form>
            <p ref={secondLast} className="text-center text-gray-500 mt-4">
              Have an account?{" "}
              <Link href="/login" className="text-blue-600">
                Login Now
              </Link>
            </p>
            <p ref={last} className="text-center text-gray-500 mt-2">
              By signing in, you agree to our{" "}
              <Link href="#" className="text-blue-600">
                Terms & Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <div
        
          className="hidden md:flex md:w-1/2 items-center justify-center relative bg-cover bg-center"
          style={{ backgroundImage: `url(${ai.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-500 opacity-75"></div>
          <div className="relative  w-full text-white text-center p-6">
            <h2 ref={rightHeading} className="text-5xl font-bold">
              Mastermind Better. Succeed Together.
            </h2>
            <p ref={rightPara} className="mt-4 text-lg">
              Get meaningful results with essential tools for brainstorming,
              goal setting, and accountability.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
