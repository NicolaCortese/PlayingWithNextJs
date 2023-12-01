import Layout from "@/components/layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function HomePage({ events }) {

  return (
    <Layout>
      <h1>Latest Manga</h1>
      {events.length === 0 && <h3>No Mangas</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events" className="btn-secondary">
          {" "}
          View All Events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC&_limit=3`);
  const json = await res.json();
  const strapiEvents = json.data;
  const events = strapiEvents.map((evt) => evt.attributes)
  console.log("--------------------------------")
  console.log(events[0].image.data.attributes);
  console.log("--------------------------------")
  console.log(events);
  console.log("--------------------------------")

  return {
    props: { events },
    revalidate: 1,
  };
}
