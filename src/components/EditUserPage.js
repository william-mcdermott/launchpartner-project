import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { startEditUser } from '../actions/users'

export class EditUserPage extends React.Component {
  onSubmit = (user) => {
    this.props.startEditUser(this.props.user.id, user);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit User</h1>
          </div>
        </div>
        <div className="content-container">
          <UserForm
            user={this.props.user}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startEditUser: (id, user) => dispatch(startEditUser(id, user)),
})

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find((user) => {
      return user.id === props.match.params.id;
    })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);
