import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MessageRow from './Component'

import firebaseService from '../../../../../services/firebase'

class MessageRowContainer extends Component {

  render() {
    // console.log('MessageRowContainer', this.props)
    const isCurrentUser = this.props.message && this.props.currentUser && (this.props.currentUser.id == this.props.message.userId);
    return (
      <MessageRow
        message={this.props.message}
        isCurrentUser={isCurrentUser}/>
    );
  }
}

MessageRowContainer.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageRowContainer
