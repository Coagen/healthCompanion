"use client";

import { useState } from "react";
import styles from "./RecommendationGenerator.module.css";
import useAnalysisStore from "@/lib/useAnalysis";

const RecommendationGenerator = () => {
  const [selectedOption, setSelectedOption] = useState("exercise");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(""); // Local state only for this component

  const { prompt } = useAnalysisStore(); // Still use prompt from global store

  const handleGenerate = async () => {
    if (!prompt) {
      alert("Prompt not ready. Please process your test report first.");
      return;
    }

    setLoading(true);
    setResponse(""); // clear previous

    const userQuery = {
      exercise: "What exercise is suitable based on these results?",
      medication: "Any recommended medications based on the values?",
      food: "What foods should be taken or avoided?",
    };

    const finalPrompt = `${prompt}\n\nNow specifically answer this:\n${userQuery[selectedOption]}`;

    try {
      const res = await fetch("/api/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await res.json();
      setResponse(data.content);
    } catch (err) {
      console.error("API Error:", err);
      setResponse("Failed to get response from AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className={styles.select}
        >
          <option value="exercise">Suggested Exercise</option>
          <option value="medication">Suggested Medication</option>
          <option value="food">Suggested Food</option>
        </select>
        <button className={styles.button} onClick={handleGenerate}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      <textarea
        className={styles.textarea}
        value={response}
        readOnly
        placeholder="Your recommendation will appear here..."
      />
    </div>
  );
};

export default RecommendationGenerator;
