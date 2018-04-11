import React from 'react'
import { View } from 'react-native'

import UserList from './UserList'

import styles from './Styles'

const UserScreenComponent = (props) =>
  <View style={styles.container}>
    <UserList {...props} />
  </View>

export default UserScreenComponent
