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
    const response = await axios.post(
      "http://localhost:4000/ai/get-review",
      { code }
    );

    setReview(response.data.result);
  } catch (error) {
    console.error("Error fetching code review:", error.response?.data || error.message);
    setReview("Failed to get review. Please try again.");
  }
};


  return (
    
    <>
  <div className="container">
    <section className="left">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) =>
          prism.highlight(code, prism.languages.javascript, "javascript")
        }
        padding={10}
        className="code-editor"
      />
    </section>

    <section className="right">
      <Markdown rehypePlugins={[rehypeHighlight]}>
        {review}
      </Markdown>
    </section>
  </div>

  <button onClick={reviewCode} className="review-button">
    Review
  </button>
</>
  )}

export default App;
