"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Alert } from "@mui/material";
import { setCookie } from "cookies-next";
import ai from "../../public/images/ai.png";
import { useRouter } from "next/navigation";
import googleLogo from "../../public/images/googleLogo.png";
import gsap from "gsap";




const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("null");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const loginUrl = process.env.NEXT_PUBLIC_Login_Url;
  const baseUrl = process.env.NEXT_PUBLIC_BaseUrl;

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      setLoading(true);
      const { data } = await axios.post(`${baseUrl}${loginUrl}`, loginData);
      localStorage.setItem("userData", JSON.stringify(data.result));
      setCookie("token", data.result.token);
      setCookie("userData", JSON.stringify(data.result));
      router.replace("/dashboard");
    } catch (error) {
      setLoading(false);
      setAlertMessage(
        error?.response?.data?.message || "Something went wrong."
      );
      setAlertSeverity("error");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const googleAuth = () => {
    localStorage.setItem("isGoogleAuth", "true");
    window.location.href = "https://chatbuilder-puce.vercel.app/auth/google";
  };


  const heading = useRef(null)
  const para = useRef(null)
  const headingOne = useRef(null)
  const google = useRef(null)
  const or = useRef(null)
  const input = useRef(null)
  const input2 = useRef(null)
  const btn = useRef(null)
  const secondLast = useRef(null)
  const last = useRef(null)



  useEffect(() => {
    gsap.fromTo(
      heading.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay:0.3 } 
    )

    gsap.fromTo(
      para.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay:0.3 } 
    )

    gsap.fromTo(
      headingOne.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay:0.3 } 
    )

    gsap.fromTo(
      google.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay:0.3 } 
    )

      gsap.fromTo(
      or.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay:0.3 } 
    )

    gsap.fromTo(
      input.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay:0.3 } 
    )

    gsap.fromTo(
      input2.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay:0.3 } 
    )

    gsap.fromTo(
      btn.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay:0.3 } 
    )

    gsap.fromTo(
      secondLast.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 } 
    )

    gsap.fromTo(
      last.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 } 
    )

  }, []);

  const rightHeading = useRef(null)
  const rightPara = useRef(null)



  useEffect(()=>{
    gsap.fromTo(
      rightHeading.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 } 
    )

    gsap.fromTo(
      rightPara.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 } 
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
      <div className="flex min-h-screen absolute top-0 w-full">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white shadow-md text-center">
          <h2 ref={heading} className="text-3xl font-bold mb-4 text-blue-700">
            {" "}
            <i className="fas fa-comments text-5xl text-blue-700 mb-4"></i>{" "}
            Saylani chat
          </h2>
          <p ref={para} className="text-gray-500 w-80 mb-4">
            Your AI-powered chatbot assistant.
          </p>
          <div className="max-w-sm w-full">
            <h3 ref={headingOne} className="text-2xl font-semibold text-blue-700 text-center mb-8">
              Login in with
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
            <form onSubmit={handleLogin}>
              <input
              ref={input}
                type="email"
                placeholder="yourname@gmail.com"
                className="w-full border rounded-md p-2 mb-4 focus:ring focus:ring-blue-300"
                defaultValue="meeer@gmail.com"
              />
              <input
              ref={input2}
                type="password"
                placeholder="Enter Your Password"
                defaultValue="123456"
                className="w-full border rounded-md p-2 mb-4 focus:ring focus:ring-blue-300"
              />
              <button
              ref={btn}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700"
              >
                {loading ? "Logging" : "Login with email"}
              </button>
            </form>
            <p ref={secondLast} className="text-center text-gray-500 mt-4">
              Don'thave an Account?{" "}
              <Link href="/signup" className="text-blue-600">
                Signup
              </Link>{" "}
            </p>
            <p ref={last} className="text-center text-gray-500 mt-4">
              By logging in, you agree to our{" "}
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
          <div className="relative max-w-md text-white text-center p-6">
            <h2 ref={rightHeading} className="text-4xl font-bold">
              Empower Conversations, Elevate Experiences.
            </h2>
            <p ref={rightPara} className="mt-4 text-lg">
              Seamlessly interact with AI to enhance productivity,
              collaboration, and engagement.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
