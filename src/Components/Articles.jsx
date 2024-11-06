import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterTopics from "./Topics";
import { useLocation } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const URL = useLocation().search.slice(7);

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

  if (URL !== "") {
    return (
      <>
        <h2> Here's all the articles based on {URL} </h2>
        <Link to={`/articles`}>
          <button>Back to all articles</button>
        </Link>
        <ul>
          {articles.map((article) => {
            if (article.topic === URL)
              return (
                <Link
                  to={`/articles/${article.article_id}`}
                  key={article.article_id}
                >
                  <li> {article.title}</li>
                </Link>
              );
          })}
        </ul>
      </>
    );
  }

  return (
    <>
      <section>
        <h2>Browse by Topic:</h2>
        {<FilterTopics />}
      </section>

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
