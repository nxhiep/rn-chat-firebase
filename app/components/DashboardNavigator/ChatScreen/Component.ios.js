import React from 'react'
import { KeyboardAvoidingView } from 'react-native'

import MessagesList from './MessagesList'
import MessageForm from './MessageForm'

import styles from './Styles'

const ChatScreenComponent = props => {
  // console.log('ChatScreenComponent', props)
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={64}>
      <MessagesList {...props} />
      <MessageForm {...props} />
    </KeyboardAvoidingView>
  ) 
}
export default ChatScreenComponent
