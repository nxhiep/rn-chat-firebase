import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import relativeDate from 'relative-date'

import styles from './Styles'
import translations from '../../../../../i18n'

const MESSAGE_TEXT_MARGIN = 50

class ChannelRowComponent extends Component {
  constructor() {
    super()
    this.handleButtonPress = (channel) => {
      // console.log('handleButtonPress', channel, this.props.navigation);
      this.props.navigation.push('User', { channel: channel })
    }
  }
  render() {
    const channel = this.props.channel;
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.handleButtonPress(channel)}>
        <Text style={styles.text}>
          {channel.name}
        </Text>
        <Image
          style={styles.icon}
          source={require('../../../../../images/link.png')}/>
      </TouchableOpacity>
    )
  }
}

ChannelRowComponent.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
}

export default ChannelRowComponent
