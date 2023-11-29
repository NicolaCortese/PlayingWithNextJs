import Layout from "../components/layout";
import { API_URL } from "../config/index";

export default function HomePage({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Latest Mangas</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
