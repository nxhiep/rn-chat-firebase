import React, { Component } from 'react'

import LogoutButton from '../ChatScreen/LogoutButton'
import translations from '../../../i18n'

import UserScreen from './Component'

class UserScreenContainer extends Component {

  static navigationOptions = {
    title: translations.t('chat'),
    headerRight: <LogoutButton />
  }

  render() {
    return (
      <UserScreen {...this.props} />
    )
  }
}

export default UserScreenContainer
