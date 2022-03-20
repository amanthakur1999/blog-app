import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

function Post(props) {
  const { author, createdAt, title, description, slug, favoritesCount } = props;
  return (
    <>
      <article>
        <header>
          <div>
            <Link to="/profile">
              <img src={author.image || 'hello'} alt={author.username} />
            </Link>
            <div>
              <Link to={`/profile/${author.username}`}>
                <p>{author.username}</p>
              </Link>
              <time dateTime="">
                {moment(createdAt).format('ddd MMM D YYYY')}
              </time>
            </div>
          </div>
          <div>
            <span>&hearts;</span>
            <span>{favoritesCount}</span>
          </div>
        </header>
        <Link to={`/article/${slug}`}>
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </Link>
        <footer>
          <Link to={`/article/${slug}`} className="read-more-btn">
            Read More
          </Link>
        </footer>
      </article>
    </>
  );
}

export default Post;
