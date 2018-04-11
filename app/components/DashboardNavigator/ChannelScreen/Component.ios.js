import React from 'react'
import { KeyboardAvoidingView } from 'react-native'

import ChannelList from './ChannelList'

import styles from './Styles'

const ChannelScreenComponent = (props) =>
  <KeyboardAvoidingView
    style={styles.container}
    behavior='padding'
    keyboardVerticalOffset={64}>

    <ChannelList {...props}/>
  </KeyboardAvoidingView>

export default ChannelScreenComponent
