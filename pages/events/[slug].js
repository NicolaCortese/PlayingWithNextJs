import Layout from "components/layout";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { API_URL } from "@/config/index";

export default function EventPage({ evt }) {
  const deleteEvent = (e) => {
    console.log("delete event");
  };

  if (evt !== undefined) {
    const { attributes } = evt;
    console.log(attributes);

    return (
      <Layout>
        <div className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${evt.id}`}>
              <FaPencilAlt /> Edit Event
            </Link>
            <a href="#" className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>
          <span>
            {attributes.date} at {attributes.time}
          </span>
          <h1>{attributes.name}</h1>
            <div className={styles.image}>
              <Image
                src={attributes.image.data.attributes.formats.medium.url}
                width={960}
                height={600}
              />
            </div>
          <h3>Performers:</h3>
          <p>{attributes.performers}</p>
          <h3>Description</h3>
          <p>{attributes.description[0].children[0].text}</p>
          <h3>Venue: {attributes.venue}</h3>
          <p>{attributes.address}</p>
          <Link href="/events" className={styles.back}>
            {"< "}Go Back
          </Link>
        </div>
      </Layout>
    );
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC`);
  const json = await res.json();
  const strapiEvents = json.data;
  const events = strapiEvents.map((evt) => evt.attributes);

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  console.log("--------------------------------");
  console.log("about to make the call");
  console.log("--------------------------------");
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  );
  const json = await res.json();
  const events = json.data;

  // console.log("--------------------------------");
  // console.log(events[0]);
  // console.log("--------------------------------");

  return {
    props: {
      evt: events[0],
      revalidate: 1,
    },
  };
}
// export async function getServerSideProps({ query: { slug } }) {
//   console.log("about to make the call");
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
