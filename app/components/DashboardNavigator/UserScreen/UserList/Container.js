import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getUsers } from '../../../../store/user/actions'
import { AsyncStorage} from 'react-native'

import { View, Text } from 'react-native'

import UserListComponent from './Component'
import LoadingIndicator from '../../../AuthScreen/LoadingIndicator'

class UserListContainer extends Component {

  constructor(){
    super();
    this.state = {
      currentUser: null
    }
    AsyncStorage.getItem("user").then((user) => {
      this.setState({currentUser : JSON.parse(user)});
    }).done();
  }

  componentDidMount() {
    const channel = this.props.navigation.state.params.channel;
    this.props.getUsers(channel.id);
  }

  render() {
    // console.log('this.props', this.props)
    if(!!this.state.currentUser){
      const users = !! this.props.users ? this.props.users : [];
      const data = users.filter((a) => {
        return a.id != this.state.currentUser.id
      })
      // console.log('UserListContainer', data, this.state.currentUser);
      return (
        <UserListComponent
          data={data} {...this.props} />
      )
    } else {
      return <View><Text>Loading...</Text></View>
    }
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  error: state.user.errorUsers
})

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (channelId) => {
      dispatch(getUsers(channelId))
    }
  }
}

UserListContainer.propTypes = {
  users: PropTypes.array,
  error: PropTypes.string,
  getUsers: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer)
