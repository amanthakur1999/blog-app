import React from 'react';

import { articleURL } from '../utils/constant';
import Loader from './Loader';
class Singlepost extends React.Component {
  state = {
    article: '',
    error: '',
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;
    console.log(slug);
    fetch(articleURL + '/' + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.article);
        this.setState({
          article: data.article,
          error: '',
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to  Fetching article' });
      });
  }
  render() {
    // const { author } = this.state.article;
    const { article, error } = this.state;
    // let image = article.author.image;

    console.log(article);
    if (error) {
      return <p>{error}</p>;
    }
    if (!articleURL) {
      return <Loader />;
    }
    return (
      <>
        <section>
          <div className="">
            <h1>{article.title}</h1>
            <div className="flex items-center">
              {/* <img className="" src={image} alt={article.username} /> */}
              <div>
                <h4 className="">{article.title}</h4>
                <time dateTime="">{article.createdAt}</time>
              </div>
            </div>
          </div>
          <p>{article.description}</p>
          <p>{article.body}</p>
        </section>
      </>
    );
  }
}

export default Singlepost;
