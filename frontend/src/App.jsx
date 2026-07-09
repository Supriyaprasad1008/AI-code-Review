import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

export default function App() {
  const [code, setCode] = useState(`function example() {
  return "Hello World";
}`);
  const [review, setReview] = useState("");

  const handleReview = () => {
    axios.post("http://localhost:3000/ai/getResponse/", { code })
      .then((response) => {
        console.log(response.data);
        setReview(response.data);
      })
      .catch((error) => {
        console.error("Error occurred while fetching AI response:", error);
      });
  };

  return (
    <div className="relative h-screen w-full bg-[#181119] flex flex-col p-6 overflow-hidden text-[#d4c4d5]">

      {/* Animation */}
      <style>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-slow-spin {
          animation: slow-spin 8s linear infinite;
        }
      `}</style>

      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[10%] w-[600px] h-[500px] rounded-full bg-[#bfa38a]/15 blur-[140px]" />
      <div className="absolute top-[20%] right-[-10%] w-[700px] h-[600px] rounded-full bg-[#522f5c]/25 blur-[160px]" />
      <div className="absolute top-[-10%] right-[20%] w-[400px] h-[400px] rounded-full bg-[#d946ef]/10 blur-[120px]" />

      <div className="relative z-10 flex flex-col h-full">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-serif text-[#ebd2f0]">
            AI Code Review Workbench
          </h1>
        </div>

        <div className="grid flex-1 md:grid-cols-2 gap-2 min-h-0">

          {/* LEFT PANEL */}
          <div className="relative rounded-2xl overflow-hidden border border-[#de4bf2]/20">

            {/* Animated Border */}
            <div className="absolute inset-[-50%] bg-[conic-gradient(from_180deg,transparent_40%,#ec4899,transparent_60%)] animate-slow-spin opacity-30" />

            {/* Card */}
            <div className="relative z-10 h-full rounded-2xl bg-[#1c111e]/95 flex flex-col overflow-hidden">

              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: {
                      enabled: false,
                    },
                    fontSize: 15,
                    automaticLayout: true,
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    contextmenu: false,
                    padding: {
                      top: 15,
                    },
                    roundedSelection: false,
                    scrollbar: {
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8,
                    },
                  }}
                />
              </div>

              {/* Review Button */}
              <button
                onClick={handleReview}
                className="absolute bottom-5 right-5 w-30 h-10 px-8 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition-all duration-300 text-white font-semibold shadow-lg active:scale-95"
              >
                Review
              </button>

            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="relative py-2 rounded-l overflow-hidden border border-[#de4bf2]/20">

            {/* Animated Border */}
            <div className="absolute inset-[-50%] bg-[conic-gradient(from_180deg,transparent_40%,#ec4899,transparent_60%)] animate-slow-spin opacity-30" />

            {/* Card */}
            <div className="relative z-10 h-full rounded-l bg-[#1c111e]/95 overflow-y-auto no-scrollbar">
              <div className="px-8 py-6 text-gray-300 leading-7">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {review}
                </ReactMarkdown>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}