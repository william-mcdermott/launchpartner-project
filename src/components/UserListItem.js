import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const UserListItem = ({ id, name, bio, pic, createdAt }) => (
  <Link className="list-item" to={`/view/${id}`}>
    <div className="list-item-container">
      <div className="list-item-sub">
        <img src={pic} />
      </div>
      <div className="list-item-sub">
        <h3 className="list-item__title">{name}</h3>
        <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
        <p className="list-item__data">{bio}</p>
      </div>
    </div>
  </Link>
)

export default UserListItem;
