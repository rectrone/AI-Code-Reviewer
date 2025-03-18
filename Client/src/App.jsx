import { useEffect, useState } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");

  // Ensure PrismJS highlights code on initial load
  useEffect(() => {
    prism.highlightAll();
  }, []);

  // Review code using AI API
  const reviewCode = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(data);
    } catch (error) {
      console.error("Error fetching code review:", error);
      setReview("Failed to get review. Please try again.");
    }
  };

  return (
    <>
    
    <main className="container">
      
      {/* Left Section: Code Editor and Review Button */}
      <section className="left">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) =>
            prism.highlight(code, prism.languages.javascript, "javascript")
          }
          padding={10}
          style={editorStyle}
        />
       
      </section>

      {/* Right Section: Review Result Display */}
      <section className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </section>
    </main>
    <button onClick={reviewCode} className="review-button">
          Review
        </button>
    </>
  );
}

// Inline style for Editor
const editorStyle = {
  fontFamily: '"Fira code", "Fira Mono", monospace',
  fontSize: 16,
  border: "1px solid #ddd",
  borderRadius: "5px",
  height: "100%",
  width: "100%",
  backgroundColor: "#1e1e1e",
  color: "#ffffff",
};

export default App;
