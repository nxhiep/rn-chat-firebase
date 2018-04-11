import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getChannels } from '../../../../store/channel/actions'

import ChannelListComponent from './Component'

class ChannelListContainer extends Component {

  componentDidMount() {
    this.props.getChannels();
  }

  render() {
    // console.log('222', this.props.navigation);
    const data = !! this.props.channels ? this.props.channels : [];
    return (
      <ChannelListComponent
        data={data} {...this.props}/>
    )
  }
}

const mapStateToProps = state => ({
  channels: state.channel.channels,
  error: state.channel.error
})

const mapDispatchToProps = {
  getChannels
}

ChannelListContainer.propTypes = {
  channels: PropTypes.array,
  error: PropTypes.string,
  getChannels: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelListContainer)
