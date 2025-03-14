"use client";
import { useState } from 'react';
import Sidebar from "../../components/sidebar/sidebar";

export default function CompanyLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className="flex w-full">
        <Sidebar 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className={`flex-1 bg-[#FBFCFD] w-full p-4 transition-all duration-300 ${
          isSidebarOpen ? 'sm:ml-64' : 'sm:ml-0'
        }`}>
          {children}
        </main>
      </div>
    </>
  );
}