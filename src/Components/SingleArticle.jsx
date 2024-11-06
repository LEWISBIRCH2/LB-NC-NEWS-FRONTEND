import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { upvoteFunction, downvoteFunction } from "./Voting";
import filterTopics from "./Topics";

export default function SingleArticle() {
  const URL = useLocation().pathname.slice(10);
  const [singleArticle, setSingleArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [votes, setVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://lb-nc-news.onrender.com/api/articles/${URL}`)
      .then((article) => {
        setSingleArticle(article.data.article[0]);
        setLoading(false);
      })
      .catch((err) => {
        alert("Article not found - check for typing errors");
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  function triggerUpvoteFunctions(props) {
    updateVotes();
    if (votes !== 1 && downVotes === 0) {
      upvoteFunction(props);
    } else {
      alert("Vote already sent!");
    }
  }

  function updateVotes() {
    setVotes((state) => {
      if (state === 1 || downVotes === -1) {
        return state;
      }
      return state + 1;
    });
  }

  function triggerDownvoteFunctions(props) {
    updateDownVotes();
    if (downVotes !== -1 && votes === 0) {
      downvoteFunction(props);
    } else {
      alert("Vote already sent!");
    }
  }

  function updateDownVotes() {
    setDownVotes((state) => {
      if (state === -1 || votes === 1) {
        return state;
      }
      return state - 1;
    });
  }

  return (
    <>
      <Link to={`/articles`}>
        <button>Back to all articles</button>
      </Link>

      <section>
        <h2>Article ID:</h2> {singleArticle.article_id}
        <h2> Title:</h2> {singleArticle.title}
        <h2> Topic:</h2> {singleArticle.topic}
        <h2> Author:</h2> {singleArticle.author}
        <h2> Body:</h2> {singleArticle.body}
        <h2> Created At:</h2> {singleArticle.created_at}
        <h2> Votes:</h2>{" "}
        {Number(singleArticle.votes) + (Number(votes) + Number(downVotes))}
        <button
          id="upvoteButton"
          type="button"
          onClick={triggerUpvoteFunctions}
          article_id={singleArticle.article_id}
          votes={singleArticle.votes}
        >
          {" "}
          Upvote!{" "}
        </button>
        <button
          id="downvoteButton"
          type="button"
          onClick={triggerDownvoteFunctions}
          article_id={singleArticle.article_id}
          votes={singleArticle.votes}
        >
          {" "}
          Downvote!{" "}
        </button>
        <h2> Image:</h2> <img src={singleArticle.article_img_url}></img>
        <h2> Comment Count: </h2> {singleArticle.comment_count}
        <Link to={`/articles/${URL}/comments`}>
          <h2> Click here to see comments about this article! </h2>
        </Link>
      </section>
    </>
  );
}
