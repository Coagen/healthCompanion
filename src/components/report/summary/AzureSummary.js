"use client";

import useAnalysisStore from "@/lib/useAnalysis";

import styles from "./AzureSummary.module.css";
import Table from "./reportTable/Table";
const AzureSummary = () => {
  const analysis = useAnalysisStore((state) => state.analysisResult);
  const tables = analysis?.analyzeResult.tables;
  // console.log(analysis);
  if (!analysis) {
    return <p>No report data available.</p>;
  }

  const cleanedData = analysis.analyzeResult.keyValuePairs
    .map((item) => ({
      key: item.key?.content || "",
      value: item.value?.content || "",
      confidence: item.confidence ?? null,
    }))
    .filter(
      (item) => item.key !== "" && item.value !== "" && item.confidence !== null
    );
  const uniqueByKey = cleanedData.filter(
    (item, index, self) => index === self.findIndex((t) => t.key === item.key)
  );

  return (
    <div className={styles.summaryBox}>
      <h3>Azure Analysis Summary</h3>
      {uniqueByKey.map((el, index) => (
        <div key={index}>
          <p>
            <strong>{el.key}:</strong> {el.value}{" "}
            <strong>Confidence Level:</strong> {el.confidence}%
          </p>
        </div>
      ))}
      {tables.map((el, i) => (
        <Table key={i} tableData={el} />
      ))}
    </div>
  );
};

export default AzureSummary;
