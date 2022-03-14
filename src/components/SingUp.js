import React from 'react';
import validation from '../utils/validation';
import { SignUpURL } from '../utils/constant';
import { withRouter } from 'react-router';

class SignUp extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: {
      username: '',
      email: '',
      password: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.error };
    validation(errors, name, value);
    this.setState({ [name]: value, errors });
  };
  handelSubmit = (event) => {
    const { username, email, password } = this.state;
    event.preventDefault();
    fetch(SignUpURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
          // throw new Error('Fatch is not successful');
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ username: '', email: '', password: '' });
        this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    let { username, email, password, errors } = this.state;
    return (
      <>
        <section>
          <h2>Sign Up</h2>
          <button>Have an account?</button>
          <form onSubmit={this.handelSubmit}>
            <input
              onChange={this.handleChange}
              type="text"
              name="username"
              placeholder="Username"
              value={username}
            />
            <span>{errors.username}</span>
            <input
              onChange={this.handleChange}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
            />
            <span className="text-red-500">{errors.email}</span>
            <input
              onChange={this.handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
            />
            <span>{errors.password}</span>
            <button
              type="submit"
              disabled={errors.username || errors.email || errors.password}
            >
              Sign Up
            </button>
          </form>
        </section>
      </>
    );
  }
}

export default withRouter(SignUp);
