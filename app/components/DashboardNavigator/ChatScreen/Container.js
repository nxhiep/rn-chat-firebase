import React, { Component } from 'react'
import ChatScreen from './Component'
import LogoutButton from './LogoutButton'
import translations from '../../../i18n'
import { View, Text } from 'react-native'
import { AsyncStorage} from 'react-native'
import { loadMessages } from '../../../store/chatData/actions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ChatScreenContainer extends Component {

  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  static navigationOptions = {
    title: translations.t('chat'),
    headerRight: <LogoutButton />
  }

  componentDidMount() {
    const friend = this.props.navigation.state.params.friend;
    AsyncStorage.getItem("user").then((user) => {
      this.setState({currentUser : JSON.parse(user)});
      this.props.loadMessages(this.state.currentUser.id, friend.id)
    }).done();
  }

  render() {
    // console.log('ChatScreenContainer', this.props)
    const courseChannel = this.props.navigation.state.params.channel;
    const friend = this.props.navigation.state.params.friend;
    if(this.state.currentUser == null){
      return <View><Text>User Loading...</Text></View>
    }
    return (
      <ChatScreen {...this.props.chatData} {...this.props.chat} courseChannel={courseChannel} friend={friend} currentUser={this.state.currentUser} />
    )
  }
}

const mapStateToProps = state => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    loadMessages: (currentUserId, friendId) => {
      dispatch(loadMessages(currentUserId, friendId))
    }
  }
}

ChatScreenContainer.propTypes = {
  error: PropTypes.string,
  loadMessages: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreenContainer)
