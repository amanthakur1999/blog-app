import React from 'react';
import { ROOT_URL } from '../utils/constant';
import { withRouter } from 'react-router';
import Loader from './Loader';
import { Link } from 'react-router-dom';
class ProfileBanner extends React.Component {
  state = {
    profile: null,
    error: null,
    follow: false,
  };

  componentDidMount() {
    let { username } = this.props;

    fetch(ROOT_URL + `profiles/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to fetch profile!');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.profile);
        this.setState({
          profile: data.profile,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  // follow = () => {
  //   let { username } = this.props;
  //   fetch(ROOT_URL + `profiles/${username}/follow`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: `Token ${this.props.user.token}`,
  //     },
  //   }).then((res) => {
  //     if (!res.ok) {
  //     }
  //   });
  // };

  render() {
    if (!this.state.profile) return <Loader />;
    let { username, image } = this.state.profile;
    return (
      <>
        <section>
          <div>
            <img src={image || './images/Smiley.jpg'} alt={username} />
            <h2>{username}</h2>

            <div>
              {this.props.user.username === username ? (
                <Link to="/setting">Edit profile setting</Link>
              ) : (
                <p>
                  {' '}
                  + Follow<span>{username}</span>
                </p>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
}

// function ProfileBanner(props) {
//   let { username } = props.user;
//   return (
//     <>
//       <section>
//         <div>
//           {/* <img src={image || './images/Smiley.jpg'} alt={username} /> */}
//           <h2>{username}</h2>
//           {/* <p>{bio}</p> */}
//           <div>
//             <p>
//               + Follow<span>{username}</span>
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
export default withRouter(ProfileBanner);
