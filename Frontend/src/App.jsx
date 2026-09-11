import React from "react";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./store/DataContext";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";

export default function App() {
  return (
    <DataProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <MobileNav />
          <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </main>
        </div>
      </div>
    </DataProvider>
  );
}
