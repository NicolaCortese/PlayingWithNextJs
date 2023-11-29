const { events } = require("./data.json");

export default function handler(req, res) {
  const slug = req.query.slug;
  const evt = events.filter((ev) => ev.slug === slug);

  res.status(200).json(evt);
}
