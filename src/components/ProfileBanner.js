function ProfileBanner(props) {
  let { username, image, bio } = props.user;
  return (
    <>
      <section>
        <div>
          <img src={image || './images/Smiley.jpg'} alt={username} />
          <h2>{username}</h2>
          <p>{bio}</p>
          <div>
            <p>
              + Follow<span>{username}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export default ProfileBanner;
