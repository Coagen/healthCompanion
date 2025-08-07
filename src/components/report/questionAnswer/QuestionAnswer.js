"use client";
import { useState } from "react";
import styles from "./QuestionAnswer.module.css";

const QuestionAnswer = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    // Simulate an API call (replace with Azure or OpenAI fetch later)
    setTimeout(() => {
      setAnswer(`This is a sample response to your question: "${question}"`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <input
          type="text"
          placeholder="Ask a question about your report..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={handleAsk}
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>

      {answer && (
        <div className={styles.answerBox}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswer;
