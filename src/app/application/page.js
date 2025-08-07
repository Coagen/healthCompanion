"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAnalysisStore from "@/lib/useAnalysis";

import Hero from "@/components/hero/Hero";
import styles from "./Application.module.css";

export default function AppPage() {
  const [file, setFile] = useState(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // 🔁 send to login page
    }
  }, [status, router]);

  const setAnalysisResult = useAnalysisStore(
    (state) => state.setAnalysisResult
  );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return alert("Please upload a report first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data.error);
        alert("Analysis failed: " + data.error);
        return;
      }

      // console.log("Analysis result:", data);
      setAnalysisResult(data);
      router.push("/application/analysis");
      //
    } catch (error) {
      console.error("Upload error:", error);
      alert("An unexpected error occurred.");
    }
  };
  return (
    <div>
      <Hero />
      <section className={styles.uploadSection}>
        <h2>Upload Your Medical Report</h2>
        <input
          className={styles.fileInput}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        <button className={styles.analyzeBtn} onClick={handleAnalyze}>
          Analyze Report
        </button>
      </section>
    </div>
  );
}
