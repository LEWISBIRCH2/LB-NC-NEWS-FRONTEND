import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SingleArticle() {
  const URL = useLocation().pathname.slice(10);
  const [sinArt, setSinArt] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://lb-nc-news.onrender.com/api/articles/${URL}`)
      .then((art) => {
        setSinArt(art.data.article[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "UNSUCCESSFUL");
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h2>Article ID:</h2> {sinArt.article_id}
      <h2> Title:</h2> {sinArt.title}
      <h2> Topic:</h2> {sinArt.topic}
      <h2> Author:</h2> {sinArt.author}
      <h2> Body:</h2> {sinArt.body}
      <h2> Created At:</h2> {sinArt.created_at}
      <h2> Votes:</h2> {sinArt.votes}
      <h2> Image:</h2> {sinArt.article_img_url}
      <h2> Comment Count:</h2> {sinArt.comment_count}
    </section>
  );
}
