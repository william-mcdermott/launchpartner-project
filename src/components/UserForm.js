import React from 'react';
import moment from 'moment';

const now = moment();

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.user ? props.user.name : '',
      bio: props.user ? props.user.bio : '',
      pic: props.user ? props.user.pic : '',
      createdAt: props.user ? moment(props.user.createdAt) : moment(),
      button: undefined,
      error: ''
    };
  }
  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };
  onPicChange = (e) => {
    const pic = e.target.files[0];
    this.setState(() => ({ pic }));
  };
  onBioChange = (e) => {
    const bio = e.target.value;
    this.setState(() => ({ bio }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.name || !this.state.bio) {
      this.setState(() => {
        return {
          error: 'Please provide name and a description of yourself.'
        }
      })
    } else {
      this.setState(() => {
        return {
          button: 'Updating...',
          error: ''
        }
      })
      this.props.onSubmit({
        name: this.state.name,
        createdAt: this.state.createdAt.valueOf(),
        pic: this.state.pic,
        bio: this.state.bio
      })
    }
  }
  render() {
    return (
      <div id="user-form">
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="text"
            placeholder="Name"
            autoFocus
            className="text-input"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <textarea
            placeholder="Add a description of yourself."
            className="textarea"
            value={this.state.bio}
            onChange={this.onBioChange}
          >
          </textarea>
          <label>
            Profile picture
            <input
            type="file"
            // placeholder="Profile picture URL"
            className="text-input"
            onChange={this.onPicChange}
            />
          </label>
          <div>
            <button className="button">{this.state.button ? this.state.button : 'Save User'}</button>
          </div>
        </form>
      </div>
    )
  }
}
