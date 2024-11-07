import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterTopics from "./Topics";
import { useLocation } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterTarget, setFilterTarget] = useState("title");
  const [isAscending, setIsAscending] = useState("asc");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://lb-nc-news.onrender.com/api/articles?limit=50")
      .then((articleList) => {
        setArticles(articleList.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "Could not retrieve data");
      });
  }, []);

  function handleSort(event) {
    if (event.target.value === "Title") {
      setFilterTarget("title");
    }
    if (event.target.value === "Date") {
      setFilterTarget("created_at");
    }
    if (event.target.value === "Votes") {
      setFilterTarget("votes");
    }
  }

  function handleOrder(event) {
    if (event.target.value === "Ascending") {
      setIsAscending("asc");
    }
    if (event.target.value === "Descending") {
      setIsAscending("desc");
    }
  }

  useEffect(() => {
    axios
      .get(
        `https://lb-nc-news.onrender.com/api/articles?sort_by=${filterTarget}&order=${isAscending}&limit=50`
      )
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.log(error, "UNSUCCESSFUL");
      });
  }, [filterTarget, isAscending]);

  if (loading) {
    return <p>Loading...</p>;
  }

  let TopicURL = useLocation().search.slice(7);

  if (TopicURL !== "") {
    return (
      <>
        <h2> Here's all the articles based on {TopicURL} </h2>
        <Link to={`/articles`}>
          <button>Back to all articles</button>
        </Link>
        <ul>
          {articles.map((article) => {
            if (article.topic === TopicURL)
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
      <section>
        <h2> Sort by... </h2>
        <select onChange={handleSort}>
          <option>Title </option>
          <option>Date </option>
          <option>Votes </option>
        </select>
        <select onChange={handleOrder}>
          <option>Ascending</option>
          <option>Descending</option>
        </select>
      </section>

      <h2> Here's a list of all available articles... </h2>
      {articles.map((article) => {
        return (
          <Link to={`/articles/${article.article_id}`} key={article.article_id}>
            <ol>
              {" "}
              <ul>
                {article.title} <br></br>
                Date: {article.created_at}
                <br></br>
                Votes: {article.votes}
                <br></br>
              </ul>{" "}
            </ol>
          </Link>
        );
      })}
    </>
  );
}
