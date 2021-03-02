import React, {Component} from 'react'
import {connect} from 'react-redux'

export class AllProducts extends Component {
  componentDidMount() {}

  render() {
    const {isLoggedIn, allProducts} = this.props

    return (
      <div>
        <h1>Hello everyone</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}
