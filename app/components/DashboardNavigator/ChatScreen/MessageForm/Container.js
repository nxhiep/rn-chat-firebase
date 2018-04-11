import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { View, Text } from 'react-native'

import { sendMessage, updateMessage } from '../../../../store/chat'

import MessageForm from './Component'


class MessageFormContainer extends Component {

  constructor(props){
    super(props)
  }

  render() {
    // console.log('MessageFormContainer', this.props)
    return (
      <MessageForm
        {...this.props.chat}
        currentUser={this.props.currentUser}
        conversation={this.props.conversation}
        friend={this.props.friend}
        courseChannel={this.props.courseChannel}
        sendMessage={this.props.sendMessage}
        updateMessage={this.props.updateMessage} />
    )
  }
}

const mapStateToProps = state => ({
  ...state,
})

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (conversation, channel, currentUser, friend, message) => {
      dispatch(sendMessage(conversation, channel, currentUser, friend, message))
    }, 
    updateMessage: (text) => {
      dispatch(updateMessage(text))
    }
  }
}

MessageFormContainer.propTypes = {
  sending: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  sendingError: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageFormContainer)
