import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const UserListItem = ({ id, name, bio, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{name}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
    </div>
    <p className="list-item__data">{bio}</p>
  </Link>
)

export default UserListItem;
