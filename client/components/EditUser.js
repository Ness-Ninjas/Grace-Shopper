import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/singleUser'
import {updateUser} from '../store/users'
import {Link} from 'react-router-dom'

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      address: '',
      admin: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    await this.props.getUser(this.props.match.params.userId)
    this.setState(this.props.user)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.editUser({...this.state})
  }
  render() {
    const {isLoggedIn} = this.props
    const {email, address, admin} = this.state

    return (
      <div id="edit-user">
        <h1>Edit User</h1>
        <form id="edit-user-form" onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input onChange={this.handleChange} name="email" value={email} />
          <label htmlFor="address">address:</label>
          <input onChange={this.handleChange} name="address" value={address} />
          <label htmlFor="admin">Is Admin:</label>
          <input onChange={this.handleChange} name="admin" value={admin} />
          <button type="submit">Submit</button>
          <Link to="/admin/users">Cancel</Link>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.singleUser
  }
}

const mapDispatch = (dispatch, {history}) => {
  return {
    getUser: userId => dispatch(fetchSingleUser(userId)),
    editUser: user => dispatch(updateUser(user, history))
  }
}

export default connect(mapState, mapDispatch)(EditUser)
