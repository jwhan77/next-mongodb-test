import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const { postId } = req.query;

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  const filtered = movies.filter((item) => item._id.toString() === postId);
  const movie = filtered.length > 0 ? filtered[0] : {};

  res.json(movie);
};

//https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/
