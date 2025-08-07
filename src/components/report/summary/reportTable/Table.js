import { useState } from "react";

import styles from "./Table.module.css";
import useAnalysisStore from "@/lib/useAnalysis";
export default function Table({ tableData }) {
  const [testCol, setTestCol] = useState(null);
  const [unitCol, setUnitCol] = useState(null);
  const [resultCol, setResultCol] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);

  if (!tableData || !tableData.cells) return <p>No table data</p>;

  const table = Array.from({ length: tableData.rowCount }, () =>
    Array(tableData.columnCount).fill("")
  );

  tableData.cells.forEach((cell) => {
    const { rowIndex, columnIndex, content } = cell;
    table[rowIndex][columnIndex] = content;
  });

  const headers = table[0]; // First row

  const handleGenerate = () => {
    if (testCol === null || unitCol === null || resultCol === null) {
      alert("Please select all 3 columns.");
      return;
    }

    const rows = table
      .slice(1)
      .map((row) => ({
        test: row[testCol]?.trim() || "",
        unit: row[unitCol]?.trim() || "",
        result: row[resultCol]?.trim() || "",
      }))
      .filter((row) => row.test && row.unit && row.result);

    setFilteredRows(rows);

    // ✅ Generate prompt right here (no useEffect needed)
    const testSummary = rows
      .map(
        (row) =>
          `Test: ${row.test}, Normal Range: ${row.unit}, Patient Result: ${row.result}`
      )
      .join("\n");

    const prompt = `
I have the following medical test results:
${testSummary}
Based on this data:
- Identify if any result is outside normal range.
- Explain what each test is generally about.
- Give simple health suggestions (e.g., food, medication, or exercise).
- Keep the explanation in simple terms for a non-medical person.
  `;

    useAnalysisStore.getState().setPrompt(prompt);
  };

  return (
    <div>
      <h3>Select Columns to Display</h3>
      <div className={styles.selectRow}>
        <div>
          <label className={styles.lblTxt}>Test</label>
          <select onChange={(e) => setTestCol(Number(e.target.value))}>
            <option value="">Select</option>
            {headers.map((col, i) => (
              <option key={i} value={i}>
                {col || `Column ${i + 1}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.lblTxt}>Unit</label>
          <select onChange={(e) => setUnitCol(Number(e.target.value))}>
            <option value="">Select</option>
            {headers.map((col, i) => (
              <option key={i} value={i}>
                {col || `Column ${i + 1}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.lblTxt}>Result</label>
          <select onChange={(e) => setResultCol(Number(e.target.value))}>
            <option value="">Select</option>
            {headers.map((col, i) => (
              <option key={i} value={i}>
                {col || `Column ${i + 1}`}
              </option>
            ))}
          </select>
        </div>

        <button className={styles.button} onClick={handleGenerate}>
          Generate Table
        </button>
      </div>

      {filteredRows.length > 0 && (
        <table className={styles.table} border="1">
          <thead>
            <tr>
              <th>Test</th>
              <th>Unit / Normal Values</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, i) => (
              <tr key={i}>
                <td>{row.test}</td>
                <td>{row.unit}</td>
                <td>{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
