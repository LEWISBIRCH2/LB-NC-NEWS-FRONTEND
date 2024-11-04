import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SingleArticleComments() {
  let URL = useLocation().pathname.slice(10, 12);
  if (URL[1] === "/") {
    URL = useLocation().pathname.slice(10, 11);
  }

  const [singleArticleComment, setSingleArticleComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://lb-nc-news.onrender.com/api/articles/${URL}`)
      .then((article) => {
        setBody(article.data.article[0].body);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "UNSUCCESSFUL");
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://lb-nc-news.onrender.com/api/articles/${URL}/comments`)
      .then((comments) => {
        setSingleArticleComment(comments.data.comments);
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
    <>
      <h2> Here's all comments about Article {URL}</h2>
      <p> {body} </p>
      {singleArticleComment.map((comment) => {
        return (
          <section key={comment.comment_id}>
            <h2> Comment ID:</h2> {comment.comment_id}
            <h2> Author:</h2> {comment.author}
            <h2> Body:</h2> {comment.body}
            <h2> Created At:</h2> {comment.created_at}
            <h2> Votes:</h2> {comment.votes}
            <br></br>
            -----------------------------------------------------------------
          </section>
        );
      })}
    </>
  );
}
