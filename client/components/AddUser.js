import React from 'react'
import {connect} from 'react-redux'
import {createUser} from '../store/users'

const initialState = {
  email: '',
  password: '',
  address: '',
  admin: false
}

class AddUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addUser({...this.state})
    this.setState(initialState)
  }
  render() {
    const {email, password, address, admin} = this.state
    return (
      <div id="add-user">
        <h3>Add New User</h3>
        <form id="add-user-form" onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input onChange={this.handleChange} name="email" value={email} />
          <label htmlFor="password">Password:</label>
          <input
            onChange={this.handleChange}
            name="password"
            value={password}
          />
          <label htmlFor="address">Address:</label>
          <input onChange={this.handleChange} name="address" value={address} />
          <label htmlFor="admin">Is Admin:</label>
          <input onChange={this.handleChange} name="admin" value={admin} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addUser: user => dispatch(createUser(user))
  }
}

export default connect(null, mapDispatch)(AddUser)
