import Header from "./Header";
import Articles from "./Articles";
import { Routes, Route } from "react-router-dom";
import SingleArticle from "./SingleArticle";
import SingleArticleComments from "./SingleArticleComments";

function App() {
  return (
    <>
      <Header />
      <Routes>
      <Route path="/"element={<Articles />} />
        <Route path="/articles"element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route
          path="/articles/:article_id/comments"
          element={<SingleArticleComments />}
        />
      </Routes>
    </>
  );
}

export default App;
