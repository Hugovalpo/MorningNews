import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { hideArticle } from "../reducers/hiddenArticles";

function Article(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);


  // can bookmark
  const handleBookmarkClick = () => {
    if (!user.token) {
      return;
    }
    fetch(`http://localhost:3000/users/canBookmark/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
            dispatch(addBookmark(props));
          }
        }
      });
  };

  // hide article
  const addHideArticle = () => {
    dispatch(hideArticle(props));
    console.log(props.author);
  };

  // change color bookmarked
  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#E9BE59" };
  }

  if (props.isHidden) {
    // article is hide
    return;
  } else {
    return (
      <div className={styles.articles}>
        <div className={styles.articleHeader}>
          <h3>{props.title}</h3>
          <FontAwesomeIcon
            onClick={() => handleBookmarkClick()}
            icon={faBookmark}
            style={iconStyle}
            className={styles.bookmarkIcon}
          />
          <FontAwesomeIcon
            icon={faEyeSlash}
            onClick={() => addHideArticle()}
            className={styles.hideIcon}
          />
        </div>
        <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
        <div className={styles.divider}></div>
        {props.urlToImage && (
          <Image
            src={props.urlToImage}
            alt={props.title}
            width={600}
            height={314}
          />
        )}
        <p>{props.description}</p>
      </div>
    );
  }
}

export default Article;
