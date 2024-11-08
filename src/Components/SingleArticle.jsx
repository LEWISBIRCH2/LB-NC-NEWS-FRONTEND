import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { upvoteFunction, downvoteFunction } from "./Voting";

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
        <button className="backSingle">Back to all articles</button>
      </Link>

      <section id="fullGrid">
        <p className="gridTitle">{singleArticle.title}</p>

        <div id="boxOne">
        
            <h2 className="gridOne">Article ID:</h2> {singleArticle.article_id}
     
            <h2 className="gridOne"> Topic:</h2> {singleArticle.topic}
   
            <h2 className="gridOne"> Author:</h2> {singleArticle.author}

            <h2 className="gridOne"> Created On:</h2>{" "}
            {new Date(singleArticle.created_at).toString().slice(0, 24)}
  
            <h2 className="gridOne"> Votes:</h2>{" "}
            {Number(singleArticle.votes) + (Number(votes) + Number(downVotes))}
       <br></br>
       <br></br>

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
        </div>
        <p className="gridBody">{singleArticle.body}</p>
        <img id="img" src={singleArticle.article_img_url}></img>
        <Link to={`/articles/${URL}/comments`}>
          <p id='comments'>
            {" "}
            Click here to see comments about this article!{" "}
          </p>
        </Link>
      </section>
    </>
  );
}
