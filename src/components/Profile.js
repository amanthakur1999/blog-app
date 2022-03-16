import React from 'react';
import { articleURL } from '../utils/constant';
import Pagination from './Pagination';
import Posts from './Posts';
import ProfileBanner from './ProfileBanner';

class Profile extends React.Component {
  state = {
    activeTab: 'author',
    articles: [],
  };

  FetchData = () => {
    fetch(articleURL + `/?${this.state.activeTab}=${this.props.user.username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`can not fetch deta for specific user`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.articles);
        this.setState({
          articles: data.articles,
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to  Fetching article' });
      });
  };
  componentDidMount() {
    this.FetchData();
  }
  handelActive = (tab) => {
    this.setState(
      {
        activeTab: tab,
      },
      () => {
        this.FetchData();
      }
    );
  };

  render() {
    const { activeTab } = this.setState;
    const { user } = this.props;

    return (
      <>
        <section>
          <ProfileBanner user={user} />
          <div>
            <div>
              <button
                className={activeTab === 'author' && 'active'}
                onClick={() => this.handelActive('author')}
              >
                My Article
              </button>
              <button
                className={activeTab === 'favorited' && 'active'}
                onClick={() => this.handelActive('favorited')}
              >
                Favorited Article
              </button>
              <Posts articles={this.state.articles} />
              <Pagination />
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default Profile;
