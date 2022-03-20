import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { articleURL } from '../utils/constant';
import Loader from './Loader';
import moment from 'moment';
import AddComment from './AddComment';
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

  handelDelete = (slug) => {
    fetch(articleURL + '/' + slug, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to delete!');
        }
      })
      .then((data) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
    if (!this.state.article) {
      return <Loader />;
    }
    let { author, title, createdAt, description, body, tagList, slug } =
      this.state.article;
    return (
      <>
        <section>
          <div className="">
            <h1>{title}</h1>
            <div className="flex items-center">
              <img className="" src={author.image} alt={author.username} />
              <div>
                <h2>{author.username}</h2>
                <h4 className="">{title}</h4>
                <time dateTime="">
                  {moment(createdAt).format('ddd MMM D YYYY')}
                </time>
              </div>
              {this.props.user &&
              this.props.user.username === author.username ? (
                <div>
                  <button>
                    <Link to={`/editArticle/${slug}`}>Edit Article</Link>
                  </button>
                  <button onClick={() => this.handelDelete(slug)}>
                    Detele Article
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <h3>{description}</h3>
          <p>{body}</p>

          <div>
            {tagList.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
        {this.props.user === null ? (
          <footer>
            <div>
              <p>
                <Link to="/signup">Sign up</Link> or{' '}
                <Link to="/login"> Log in</Link>
                or add to comments on this article
              </p>
            </div>
          </footer>
        ) : (
          <AddComment slug={slug} user={this.props.user} />
        )}
      </>
    );
  }
}

export default withRouter(Singlepost);
