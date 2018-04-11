import { StackNavigator } from 'react-navigation'

import ChannelScreen from './ChannelScreen'
import ChatScreen from './ChatScreen'
import UserScreen from './UserScreen'

const routeConfig = {
  Channel: { screen: ChannelScreen },
  User: { screen: UserScreen },
  Chat: { screen: ChatScreen },
}

export default StackNavigator(routeConfig)
