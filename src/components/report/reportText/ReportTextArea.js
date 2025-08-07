"use client";
import { useState } from "react";
import styles from "./ReportTextArea.module.css";
import useAnalysisStore from "@/lib/useAnalysis";

const ReportTextArea = () => {
  const prompt = useAnalysisStore((state) => state.prompt);
  const aiResponse = useAnalysisStore((state) => state.aiResponse);
  const setAIResponse = useAnalysisStore((state) => state.setAIResponse);

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      alert("Prompt is empty.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setAIResponse(data.content);
    } catch (error) {
      alert("Failed to get response from AI.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Report Analysis</h3>
      <textarea
        className={styles.textarea}
        value={aiResponse || "No analysis yet..."}
        readOnly
      />
      <button
        className={styles.button}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>
    </div>
  );
};

export default ReportTextArea;
