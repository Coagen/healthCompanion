import Image from "next/image";

import intro1 from "../../../public/1.jpg";
import intro2 from "../../../public/2.jpg";
import intro3 from "../../../public/3.jpg";

import styles from "./Intro.module.css";
export default function Introduction() {
  return (
    <section className={styles.intro}>
      <h2>How Health Companion Helps You</h2>

      <div className={styles.item}>
        <div className={styles.imageWrapper}>
          <Image
            src={intro1}
            width={300}
            height={400}
            alt="AI Analysis"
            className={styles.image}
          />
        </div>
        <div className={styles.text}>
          <h3>Medical Report Analysis</h3>
          <p>
            Health Companion uses AI to interpret your medical reports with
            precision and clarity. No more confusion over lab values or medical
            jargon—get plain-language summaries instantly. Our system identifies
            key markers, abnormalities, and medical conditions from your
            uploaded reports. Whether it's a blood test, radiology scan summary,
            or pathology report, we break it down for you. The analysis
            highlights potential health concerns and explains what they mean for
            your body. You’ll receive personalized insights that help you
            understand your current health status. Our AI is trained on clinical
            data and guided by healthcare knowledge from trusted sources. We
            empower you with accurate interpretations without replacing your
            doctor. Stay informed and confident—your health shouldn't be a
            mystery.
          </p>
        </div>
      </div>

      <div className={`${styles.item} ${styles.reverse}`}>
        <div className={styles.imageWrapper}>
          <Image
            src={intro2}
            width={300}
            height={400}
            alt="Advice"
            className={styles.image}
          />
        </div>
        <div className={styles.text}>
          <h3>Personalized Health Advice</h3>
          <p>
            Health Companion goes beyond analysis — it offers actionable advice
            based on your medical reports. Using AI intelligence and healthcare
            knowledge, it recommends lifestyle changes tailored to you. Receive
            diet suggestions that align with your specific lab results and
            health goals. Get exercise tips suitable for your body condition,
            whether you need to boost heart health or reduce weight. Understand
            which habits to adopt — and which to avoid — based on your unique
            biomarkers. When relevant, the system can suggest common medications
            or supplements to discuss with your doctor. Our advice engine is
            dynamic and adapts as your health data evolves over time. You’ll
            feel supported, not overwhelmed, with clear, friendly
            recommendations. It’s like having a virtual health coach in your
            pocket — always informed, always focused on you.
          </p>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.imageWrapper}>
          <Image
            src={intro3}
            width={300}
            height={400}
            alt="Secure"
            className={styles.image}
          />
        </div>
        <div className={styles.text}>
          <h3>Data Privacy & Security</h3>
          <p>
            Your trust is our top priority — Health Companion keeps your medical
            data safe and confidential. All uploaded reports are encrypted and
            stored securely using industry-standard protocols. We follow strict
            compliance practices, ensuring your data stays private and protected
            at every step. Only you have access to your health history, and
            nothing is shared without your clear consent. Our AI processes your
            information locally or through secure cloud services with
            medical-grade safeguards. No third-party tracking, no misuse — just
            responsible, ethical use of your data. We’re transparent about how
            data is handled, giving you full control over your privacy settings.
            Sessions are securely authenticated, and your identity is verified
            through encrypted tokens. Whether you’re uploading a report or
            chatting with the AI, your security is never compromised. With
            Health Companion, your personal health data is exactly that —
            personal.
          </p>
        </div>
      </div>
    </section>
  );
}
