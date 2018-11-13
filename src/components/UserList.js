import React from 'react';
import { connect } from 'react-redux';
import UserListItem from './UserListItem';

export const UserList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Users</div>
      <div className="show-for-desktop">User</div>
      <div className="show-for-desktop">Pic</div>
    </div>
    <div className="list-body">
      {
        props.users.length === 0 ? (
          <div>
            <span className="list-item list-item--message">No users</span>
          </div>
        ) : (
          props.users.map((user) => <UserListItem key={user.id} {...user}/>)
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(UserList);
