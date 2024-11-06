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
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [comment, setComment] = useState("");
  const [dependancy, setDependancy] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [deleteUser, setDeleteUser] = useState("");
  const [commentToDelete, setCommentToDelete] = useState([]);
  const userNames = [];

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
      .get(`https://lb-nc-news.onrender.com/api/users`)
      .then((users) => {
        setUsers(users.data.users);
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
  }, [dependancy]);

  for (let i = 0; i < users.length; i++) {
    userNames.push(users[i].username);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  function handleNewComment(event) {
    event.preventDefault();
    setComment(event.target.value);
  }

  function handleUserChange(event) {
    setSelectedUser(event.target.value);
  }

  function sumbitComment(event) {
    event.preventDefault();
    let newComment = {
      body: comment,
      username: selectedUser,
    };

    axios
      .post(
        `https://lb-nc-news.onrender.com/api/articles/${URL}/comments`,
        newComment
      )
      .then(() => {
        alert("Post Successful!");
        setDependancy((current) => {
          !current;
        });
      })
      .catch((err) => {
        alert(err, "UNSUCCESSFUL - Try again later");
      });
  }

  function filterComments(event) {
    const currentUser = event.target.value;
    const updatedCommentList = singleArticleComment.filter((user) => {
      return user.author === currentUser;
    });
    setFilteredList(updatedCommentList);
    setDeleteUser(currentUser);
  }

  let placeholder = singleArticleComment;
  if (filteredList.length !== 0) {
    placeholder = filteredList;
  }

  function setDeleteComment(event) {
    setCommentToDelete(event.target.value);
  }

  function deleteComment(event) {
    event.preventDefault();
    axios
      .delete(`https://lb-nc-news.onrender.com/api/comments/${commentToDelete}`)
      .then(() => {
        alert("Delete Successful!");
        setDependancy((current) => !current);
        setFilteredList(singleArticleComment);
      });
  }
  return (
    <>
      <section>
        <h2> Here's all comments about Article {URL}</h2> {body}
        <br></br>
        -----------------------------------------------------------------{" "}
      </section>
      <section>
        <h2>Add a new comment</h2>
        <br></br>
        <form onSubmit={sumbitComment}>
          <label>
            Add your comment:
            <input
              type="text"
              id="commentInput"
              onInput={handleNewComment}
              required
            ></input>
            <br></br>
            <label> Select user:</label>
            <select onChange={handleUserChange} required>
              <option> </option>
              {userNames.map((user) => {
                return (
                  <option key={user} value={user}>
                    {" "}
                    {user}
                  </option>
                );
              })}
            </select>
            <button type="submit"> Add comment</button>
          </label>
        </form>
        <br></br>
        -----------------------------------------------------------------{" "}
      </section>
      <section>
        <h2>Delete a comment</h2>
        <label> Login as: </label>
        <br></br>
        <select onChange={filterComments} required>
          <option> </option>
          {userNames.map((user) => {
            return (
              <option key={user} value={user}>
                {" "}
                {user}
              </option>
            );
          })}
        </select>
        <br></br>
        <br></br>
        <label>Select comment (by ID) to delete:</label>
        <br></br>
        <select onChange={setDeleteComment}>
          {" "}
          <option> </option>
          {placeholder.map((comment) => {
            if (deleteUser !== comment.author) {
              return (
                <option disabled={true} key={comment.comment_id}>
                  {" "}
                  No Comments Made...{" "}
                </option>
              );
            }
            return (
              <option
                key={comment.comment_id}
                value={comment.comment_id}
                required
              >
                {" "}
                {comment.comment_id}
              </option>
            );
          })}
        </select>
        <br></br>
        <br></br>
        <button onClick={deleteComment}> Delete comment </button>
        <br></br>
        -----------------------------------------------------------------{" "}
      </section>
      {placeholder.map((comment) => {
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
