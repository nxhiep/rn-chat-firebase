import React, { Component } from 'react'
import { FlatList, Text } from 'react-native'
import PropTypes from 'prop-types'

import firebaseService from '../../../../services/firebase'

import MessageRow from './MessageRow'

import translations from '../../../../i18n'

import styles from './Styles'

const ITEM_HEIGHT = 50

class MessageListComponent extends Component {

  constructor() {
    super()

    this.state = {
      firstLoaded: false,
      refresh: false
    }

    this.renderItem = (item) => {
      return <MessageRow 
        {...this.props}
        message={item.item}/>
    }

    this.emptyList = () => {
      return (
        <Text
          style={styles.placeholder}>
          {translations.t('notMessages')}
        </Text>
      )
    }

    this.itemLayout = (data, index) => (
      {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    )
  }

  componentDidMount() {
    const url = this.props.courseChannel.id + '/' + this.props.currentUser.id + '/channel/updated';
    // console.log('MessageListComponent', this.props.channel, 'url', url)

    firebaseService.database().ref(url).on("value", 
      (dataJson) => {
        if(!this.state.firstLoaded){
          this.setState({ firstLoaded: true })
          return;
        }
        var data = dataJson.val();
        console.log('on value dataJson', data)
        var timeString = data.date.slice(0, data.date.indexOf(' -'))
        const time = new Date(timeString).getTime();
        this.props.conversation.discussions.push({ id: time + "-" + data.user, content: data.data, createDate: time, fullName: data.user});
        this.setState({refresh: true})
      },
      function (err) {
      }
    );
  }

  componentDidUpdate() {
    if (this.props.conversation.discussions.length) {
        this.flatList.scrollToIndex({animated: true, index: 0});
    }
  }

  render() {
    // console.log('MessageListComponent render', this.props)
    const conversation = this.props.conversation
    // console.log('conversation', conversation, 'discussions', conversation.discussions);
    const discussions = !!conversation.discussions ? conversation.discussions.sort(function(a, b){
      return b.createDate - a.createDate;
    }) : [];
    // console.log('conversation.discussions', conversation.discussions, discussions);
    const contentContainerStyle = discussions.length ? null : styles.flatlistContainerStyle
    return (
      <FlatList
        ref={(c) => { this.flatList = c }}
        style={styles.container}
        contentContainerStyle={contentContainerStyle}
        data={discussions}
        extraData={this.state.refresh}
        onPress={() => { this.setState({ refresh: !refresh}) }}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        getItemLayout={this.itemLayout}
        ListEmptyComponent={this.emptyList}
        inverted />
    )
  }
}

MessageListComponent.propTypes = {
  conversation: PropTypes.shape({
    discussions: PropTypes.array
  })
}

export default MessageListComponent
