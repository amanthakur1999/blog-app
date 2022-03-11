import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import NoMatch from './NoMatch';
import LogIn from './LogIn';
import SignUp from './SingUp';
import Singlepost from './Singlepost';

function App() {
  return (
    <>
      <Header />
      {/* <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/article/:slug" component={Singlepost} />
        <Route path="*" element={<NoMatch />} />
      </Routes> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/article/:slug" component={Singlepost} />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
}

export default App;
