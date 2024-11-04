import Header from "./Header";
import Articles from "./Articles";
import { Routes, Route } from "react-router-dom";
import SingleArticle from "./SingleArticle";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;
