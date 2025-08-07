// src/app/login/page.js
import LoginButton from "@/components/googleLogin/loginBtn/LoginButton";
import styles from "./Login.module.css";
import { handleSignin } from "@/lib/actions";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/application"); // 🔁 Redirect if already logged in
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Login to Health Companion</h2>

        <form className={styles.form} action={handleSignin}>
          <LoginButton />
          <p className={styles.signupText}>
            Don't have an account?{" "}
            <span className={styles.signupLink}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
