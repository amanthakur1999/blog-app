import React from 'react';
import validation from '../utils/validation';

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
    event.target.value = '';
    event.preventDefault();
  };

  render() {
    let { username, email, password, errors } = this.state;
    return (
      <>
        <section>
          <h2>Sign Up</h2>
          <button>Have an account?</button>
          <form onSubmit={this.handleSubmit}>
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

export default SignUp;
