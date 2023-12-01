import Layout from "@/components/layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>All Manga</h1>
      {events.length === 0 && <h3>No Mangas</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const json = await res.json();
  const strapiEvents = json.data;
  const events = strapiEvents.map((evt) => evt.attributes)

  return {
    props: { events },
    revalidate: 1,
  };
}
