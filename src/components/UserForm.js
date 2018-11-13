import React from 'react';
import moment from 'moment';

const now = moment();

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.user ? props.user.name : '',
      bio: props.user ? props.user.bio : '',
      createdAt: props.user ? moment(props.user.createdAt) : moment(),
      error: ''
    };
  }
  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
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
          error: ''
        }
      })
      this.props.onSubmit({
        name: this.state.name,
        createdAt: this.state.createdAt.valueOf(),
        bio: this.state.bio
      })
    }
  }
  render() {
    return (
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
        <div>
          <button className="button">Save User</button>
        </div>
      </form>
    )
  }
}
