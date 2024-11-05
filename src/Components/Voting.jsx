import axios from "axios";

export function upvoteFunction(props) {
  const previousArticle = {
    article_id: props.target.attributes.article_id.value,
    votes: props.target.attributes.votes.value,
  };
  axios
    .patch(
      `https://lb-nc-news.onrender.com/api/articles/${previousArticle.article_id}`,
      { inc_votes: 1 }
    )
    .then((response) => console.log(response, "Upvoted!"))
    .catch((err) => {
      alert(err, "ERROR - Please try again later");
    });
}

export function downvoteFunction(props) {
  const previousArticle = {
    article_id: props.target.attributes.article_id.value,
    votes: props.target.attributes.votes.value,
  };
  axios
    .patch(
      `https://lb-nc-news.onrender.com/api/articles/${previousArticle.article_id}`,
      { inc_votes: -1 }
    )
    .then((response) => console.log(response, "Downvoted!"))
    .catch((err) => {
      alert(err, "ERROR - Please try again later");
    });
}

