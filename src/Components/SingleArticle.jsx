import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SingleArticle() {
  const URL = useLocation().pathname.slice(10);
  const [singleArticle, setSingleArticle] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://lb-nc-news.onrender.com/api/articles/${URL}`)
      .then((article) => {
        setSingleArticle(article.data.article[0]);
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
      <h2>Article ID:</h2> {singleArticle.article_id}
      <h2> Title:</h2> {singleArticle.title}
      <h2> Topic:</h2> {singleArticle.topic}
      <h2> Author:</h2> {singleArticle.author}
      <h2> Body:</h2> {singleArticle.body}
      <h2> Created At:</h2> {singleArticle.created_at}
      <h2> Votes:</h2> {singleArticle.votes}
      <h2> Image:</h2> {singleArticle.article_img_url}
      <h2> Comment Count: </h2> {singleArticle.comment_count}
      <Link to={`/articles/${URL}/comments`}>
        <h2> Click here to see comments about this article! </h2>
      </Link>
    </section>
  );
}
