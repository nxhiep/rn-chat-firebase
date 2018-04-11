import React from 'react'
import { KeyboardAvoidingView } from 'react-native'

import UserList from './UserList'

import styles from './Styles'

const UserScreenComponent = (props) =>
  <KeyboardAvoidingView
    style={styles.container}
    behavior='padding'
    keyboardVerticalOffset={64}>

    <UserList {...props}/>
  </KeyboardAvoidingView>

export default UserScreenComponent
