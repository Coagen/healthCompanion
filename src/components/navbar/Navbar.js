import { auth } from "@/lib/auth";
import Link from "next/link";

import LogoutButton from "../googleLogin/logoutBtn/LogoutButton";
import styles from "./Navbar.module.css";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className={styles.navbar}>
      <Link className={styles.logo} href="/">
        <div>Health Companion</div>
      </Link>
      <div className={styles.buttons}>
        {session?.user ? (
          <>
            <LogoutButton />
            <Link href="/application">
              <button className={styles.applicationbutton}>Application</button>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <button className={styles.login}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
