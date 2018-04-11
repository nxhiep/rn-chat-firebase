import React from 'react'
import { View } from 'react-native'

import MessagesList from './MessagesList'
import MessageForm from './MessageForm'

import styles from './Styles'

const ChatScreenComponent = props =>
  <View style={styles.container}>
    <MessagesList {...props} />
    <MessageForm {...props} />
  </View>

export default ChatScreenComponent
