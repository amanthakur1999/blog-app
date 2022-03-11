import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="flex-sb">
            <h1>Conduit</h1>
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
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
