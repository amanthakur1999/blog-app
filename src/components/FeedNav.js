import React from 'react';
import { Link } from 'react-router-dom';

function FeedNav(props) {
  return (
    <nav>
      <ul>
        <li onClick={props.deleteTab}>
          <Link activeClassName={props.activeTab === '' && 'active'} to="/">
            Globle Feed
          </Link>
        </li>
        {props.activeTab && (
          <li>
            <Link activeClassName={props.activeTab && 'active'} to="/">
              #{props.activeTab}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default FeedNav;
