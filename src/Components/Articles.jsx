import axios from "axios";
import { useState, useEffect } from "react";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://lb-nc-news.onrender.com/api/articles")
      .then((artList) => {
        setArticles(artList.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "Could not retrieve data");
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2> Here's a list of all available articles... </h2>
      {articles.map((art) => {
        return (
          <li>
            {" "}
            <ul key={art.article_id}>{art.title}</ul>{" "}
          </li>
        );
      })}
    </>
  );
}
