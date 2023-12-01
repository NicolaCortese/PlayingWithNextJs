import { FaExclamationCircle } from "react-icons/fa";
import Layout from "@/components/layout";
import styles from "@/styles/404.module.css";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          {" "}
          <FaExclamationCircle /> 404
        </h1>
        <h4>Sorry, looks like you got lost!</h4>
        <Link href="/">Head Back Home</Link>
      </div>
    </Layout>
  );
}
