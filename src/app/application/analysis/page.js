import AzureSummary from "@/components/report/summary/AzureSummary";

import styles from "./Analysis.module.css";
import ReportTextArea from "@/components/report/reportText/ReportTextArea";
import RecommendationGenerator from "@/components/report/recommendation/RecommendationGenerator";
import QuestionAnswer from "@/components/report/questionAnswer/QuestionAnswer";
function Analysis() {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <AzureSummary />
        <ReportTextArea analysis="Your medical report indicates healthy liver function but slightly elevated cholesterol levels. Please consult your doctor for further evaluation." />
      </div>

      <div className={styles.bottomSection}>
        <RecommendationGenerator />
        <QuestionAnswer />
      </div>
    </div>
  );
}

export default Analysis;
