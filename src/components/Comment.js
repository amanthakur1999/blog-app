import React from 'react';
import moment from 'moment';

function Comment(props) {
  let { id, author, body, createdAt } = props.comment;

  return (
    <>
      <section>
        <h2>{body}</h2>
        <div>
          <div>
            <img src={author.image} alt={author.username} />
            <span>{author.username}</span>
            <span> {moment(createdAt).format('ddd MMM D YYYY')}</span>
          </div>
        </div>
        {author.username === props.user.username ? (
          <button
            onClick={() => {
              props.handelDelete(id);
            }}
          >
            delete
          </button>
        ) : (
          ''
        )}
      </section>
    </>
  );
}

export default Comment;
