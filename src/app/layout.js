import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import Head from "next/head";
import Footer from "@/components/footer/Footer";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Health Companion</title>
        <meta
          name="description"
          content="AI-powered medical report analysis and personalized health advice."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <header>
          <Navbar />
        </header>
        <main>
          <SessionProvider>{children}</SessionProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
