import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserRow from './Component'

import firebaseService from '../../../../../services/firebase'

class UserRowContainer extends Component {

  render() {
    // console.log('333', this.props.navigation);
    const user = !!this.props.user ? this.props.user : {};
    return (
      <UserRow
      user={user} {...this.props} />
    );
  }
}

UserRowContainer.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserRowContainer
