import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function FilterTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://lb-nc-news.onrender.com/api/topics`)
      .then((response) => {
        const testTopics = [];
        for (let i = 0; i < response.data.topics.length; i++) {
          testTopics.push(response.data.topics[i].slug);
        }
        setTopics(testTopics);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "UNSUCCESFUL");
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      {topics.map((topic) => {
        return (
          <Link
            key={topic}
            to={`/articles?topic=${topic}`}
          >
            <button> {topic} </button>
          </Link>
        );
      })}
    </section>
  );
}
