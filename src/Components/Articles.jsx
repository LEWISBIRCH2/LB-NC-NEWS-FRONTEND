import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://lb-nc-news.onrender.com/api/articles")
      .then((articleList) => {
        setArticles(articleList.data.articles);
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
      {articles.map((article) => {
        return (
          <Link to={`/articles/${article.article_id}`} key={article.article_id}>
            <li>
              {" "}
              <ul>{article.title}</ul>{" "}
            </li>
          </Link>
        );
      })}
    </>
  );
}
