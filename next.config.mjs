/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        NEXT_PUBLIC_BaseUrl: "http://localhost:5000/api",
        NEXT_PUBLIC_Signup_Url: "/signup",
        NEXT_PUBLIC_Login_Url: "/login",
        NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyAAoStJGt0OoZ6q2Y3A2j8KqEsl4T3tDIs",
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "msreccomerce.firebaseapp.com",
        NEXT_PUBLIC_FIREBASE_DATABASE_URL: "https://msreccomerce-default-rtdb.firebaseio.com",
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: "msreccomerce",
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "msreccomerce.appspot.com",
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "652926024597",
        NEXT_PUBLIC_FIREBASE_APP_ID: "1:652926024597:web:e430dca9a60f9d383e949c",
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-37JXCE0DMM",
        MODE: "development",  // development|production
    }
    ,
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-Requested-With, Content-Type, Accept, Authorization",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;