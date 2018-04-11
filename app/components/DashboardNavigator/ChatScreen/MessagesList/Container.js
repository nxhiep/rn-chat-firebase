import React, { Component } from 'react'
import MessageListComponent from './Component'
import { View, Text } from 'react-native';

class MessagesListContainer extends Component {

  render() {
    // console.log('MessagesListContainer', this.props)
    if(!this.props.loaded){
      return (<View><Text>Messgages Loading...</Text></View>)
    } else {
      return (
        <MessageListComponent
          {...this.props}/>
      )
    }
  }
}

export default (MessagesListContainer)
