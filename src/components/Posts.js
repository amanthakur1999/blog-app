import React from 'react';
// import { articleURL } from '../utils/constant';
import Loader from './Loader';
import Post from './Post';

function Posts(props) {
  const { articles, error } = props;
  console.log(articles);
  if (error) {
    return <p>{error}</p>;
  }
  if (!articles) {
    return <Loader />;
  }
  if (articles.length < 1) {
    <h2>No Articles Found</h2>;
  }
  return (
    <>
      {articles.map((article) => (
        <Post key={article.slug} {...article} />
      ))}
    </>
  );
}

export default Posts;
