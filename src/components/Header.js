import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="flex-sb">
            <h1>Conduit</h1>
            {props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}
          </nav>
        </div>
      </header>
    </>
  );
}

function NonAuthHeader() {
  return (
    <ul className="flex">
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/"
        exact
      >
        <li>Home</li>
      </NavLink>

      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/signup"
      >
        <li>Signup</li>
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/login"
      >
        <li>Login</li>
      </NavLink>
    </ul>
  );
}
function AuthHeader() {
  return (
    <ul className="flex">
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/"
        exact
      >
        <li>Home</li>
      </NavLink>

      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/new-post"
      >
        <li>NewArticle</li>
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/setting"
      >
        <li>Settings</li>
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/profile"
      >
        <li>Profile</li>
      </NavLink>
    </ul>
  );
}

export default Header;
