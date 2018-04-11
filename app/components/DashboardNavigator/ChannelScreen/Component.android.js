import React from 'react'
import { View } from 'react-native'

import ChannelList from './ChannelList'

import styles from './Styles'

const ChannelScreenComponent = (props) =>
  <View style={styles.container}>
    <ChannelList {...props} />
  </View>

export default ChannelScreenComponent
