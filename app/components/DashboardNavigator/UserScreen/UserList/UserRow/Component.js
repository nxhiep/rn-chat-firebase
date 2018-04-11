import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import relativeDate from 'relative-date'

import styles from './Styles'
import translations from '../../../../../i18n'

const MESSAGE_TEXT_MARGIN = 50

class UserRowComponent extends Component {
  constructor() {
    super()
    this.handleButtonPress = (user) => {
      // console.log('handleButtonPress', user, this.props);
      const channel = this.props.navigation.state.params.channel;
      this.props.navigation.push('Chat', { channel: channel, friend: user })
    }
  }
  render() {
    const user = this.props.user;
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.handleButtonPress(user)}>
        <Text style={styles.text}>
          {user.displayName}
        </Text>
        <Image
          style={styles.icon}
          source={require('../../../../../images/link.png')}/>
      </TouchableOpacity>
    )
  }
}

UserRowComponent.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
}

export default UserRowComponent
