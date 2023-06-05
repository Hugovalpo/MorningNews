import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Article from "./Article";
import TopArticle from "./TopArticle";
import styles from "../styles/Home.module.css";
import Dialog from "./Dialog";

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddenArticles = useSelector((state) => state.hiddenArticles.value);
  const dialog = useSelector((state) => state.dialogValue.value);

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/articles`)
      .then((response) => response.json())
      .then((data) => {
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);

  // method some check is un article is bookmarked or hidden
  const articles = articlesData.map((data, i) => {
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.title === data.title
    );
    const isHidden = hiddenArticles.some(
      (hidden) => hidden.title === data.title
    );

    return (
      <Article
        key={i}
        {...data}
        isBookmarked={isBookmarked}
        isHidden={isHidden}
      />
    );
  });

  // const articlesfilter = articlesData.filter(
  //   (hidden) => !hiddens.includes(hidden.title)
  // );

  // const articles = articlesfilter.map((data, i) => {
  //   const isBookmarked = bookmarks.some(
  //     (bookmark) => bookmark.title === data.title
  //   );
  //   return <Article key={i} {...data} isBookmarked={isBookmarked} />;
  // });

  let topArticles;
  if (bookmarks.some((bookmark) => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />;
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />;
  }

  return (
    <div>
      {dialog && <Dialog />}
      <Head>
        <title>Morning News - Home</title>
      </Head>
        {topArticles}
       <div className={styles.articlesContainer}>{articles}</div>
    </div>
  );
}

export default Home;
