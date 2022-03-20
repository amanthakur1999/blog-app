import React from 'react';
import { articleURL } from '../utils/constant';
import Comments from './Comments';
class AddComment extends React.Component {
  state = {
    comment: '',
    body: '',
    error: '',
  };

  handelChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handelSubmit = (event) => {
    event.preventDefault();

    fetch(articleURL + `/${this.props.slug}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: this.state.body,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('unble to comment');
        }
        return res.json();
      })
      .then((data) => {
        this.fetchComment();
        this.setState({
          body: '',
        });
      })
      .catch((error) => {
        this.setState({ errors: error });
      });
  };

  fetchComment = () => {
    fetch(articleURL + `/${this.props.slug}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('unble comments');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.comments);
        this.setState({
          comment: data.comments,
        });
      })
      .catch((error) => {
        this.setState({
          error: 'unble to fetch comment',
        });
      });
  };

  render() {
    return (
      <>
        <section>
          <div>
            <form action="" onSubmit={this.handelSubmit}>
              <textarea
                name="body"
                type="text"
                rows="4"
                placeholder="add comments"
                onChange={this.handelChange}
                value={this.state.body}
                required={true}
              >
                {' '}
              </textarea>

              <div>
                <div>
                  <img src="he" alt="img" />
                </div>
                <button type="submit">Add Comment</button>
              </div>
            </form>
          </div>
          <Comments
            slug={this.props.slug}
            fetchComment={this.fetchComment}
            state={this.state}
            user={this.props.user}
          />
        </section>
      </>
    );
  }
}
export default AddComment;
