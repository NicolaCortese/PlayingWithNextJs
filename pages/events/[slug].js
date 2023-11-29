import { useRouter } from "next/router";

export default function EventPage() {
  const router = useRouter();

  return <div>Event Page {router.query.slug}</div>;
}
