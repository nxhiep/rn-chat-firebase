import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ChannelRow from './Component'

import firebaseService from '../../../../../services/firebase'

class ChannelRowContainer extends Component {

  render() {
    // console.log('333', this.props.navigation);
    const channel = !!this.props.channel ? this.props.channel : {};
    return (
      <ChannelRow
        channel={channel} {...this.props} />
    );
  }
}

ChannelRowContainer.propTypes = {
  channel: PropTypes.object.isRequired,
}

export default ChannelRowContainer
