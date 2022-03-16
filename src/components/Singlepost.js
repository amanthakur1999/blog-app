import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { articleURL } from '../utils/constant';
import Loader from './Loader';
import moment from 'moment';
class Singlepost extends React.Component {
  state = {
    article: [],
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
    let { title, createdAt, description, body, tagList, error } =
      this.state.article;
    console.log(tagList);

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
            <h1>{title}</h1>
            <div className="flex items-center">
              <img
                className=""
                src={this.props.user.image}
                alt={this.props.user.username}
              />
              <div>
                <h2>{this.props.user.username}</h2>
                <h4 className="">{title}</h4>
                <time dateTime="">
                  {moment(createdAt).format('ddd MMM D YYYY')}
                </time>
              </div>
            </div>
          </div>
          <h3>{description}</h3>
          <p>{body}</p>

          {/* <div>
            {tagList.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div> */}
        </section>
        {this.props.user === null ? (
          <footer>
            <div>
              <p>
                <Link to="/signup">Sign up</Link> or{' '}
                <Link to="/login"> Log in</Link>
              </p>
            </div>
          </footer>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default withRouter(Singlepost);
