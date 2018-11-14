import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

export class ViewUserPage extends React.Component {
  render() {
    return (
      <div>
        <div className="content-container">
          <h1 className="page-header__title">{this.props.user.name}</h1>
        </div>
        <div className="content-container">
          <img src={this.props.user.pic} className="view_image"/>
          <p className="view_bio">{this.props.user.bio}</p>
          <div>
            <Link className="button" to={`/edit/${this.props.user.id}`}>Edit User</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find((user) => {
      return user.id === props.match.params.id;
    })
  }
};

export default connect(mapStateToProps)(ViewUserPage);
