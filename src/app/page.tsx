"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  router.push("/auth/login");

  return <main className={styles.main}></main>;
}
