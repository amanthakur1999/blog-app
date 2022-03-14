import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import NoMatch from './NoMatch';
import LogIn from './LogIn';
import SignUp from './SingUp';
import Singlepost from './Singlepost';
import React from 'react';
import { localStorageKey, userVerifyURL } from '../utils/constant';
import FullPageSpiner from './FullPageSpiner';
import NewPost from './NewPost';
import Setting from './Setting';
import Profile from './Profile';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };

  componentDidMount() {
    let storageKey = localStorage[localStorageKey];
    if (storageKey) {
      fetch(userVerifyURL, {
        Method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ isVerifying: false });
    }
  }
  updateUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user,
      isVerifying: false,
    });
    localStorage.setItem(localStorageKey, user.token);
  };
  render() {
    if (this.state.isVerifying) {
      return <FullPageSpiner />;
    }
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp />
        ) : (
          <UnauthenticatedApp updateUser={this.updateUser} />
        )}
      </>
    );
  }
}

function AuthenticatedApp() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/new-post">
        <NewPost />
      </Route>
      <Route exact path="/setting">
        <Setting />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/article/:slug" component={Singlepost} />
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

function UnauthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <LogIn updateUser={props.updateUser} />
      </Route>
      <Route path="/signup">
        <SignUp updateUser={props.updateUser} />
      </Route>

      <Route path="/article/:slug" component={Singlepost} />
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
