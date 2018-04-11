import React, { Component } from 'react'

import ChannelScreen from './Component'

class ChannelScreenContainer extends Component {

  render() {
    // console.log('111', this.props.navigation);
    return (
      <ChannelScreen {...this.props} />
    )
  }
}

export default ChannelScreenContainer
