import React, { Component } from 'react'
import { FlatList, Text } from 'react-native'
import PropTypes from 'prop-types'

import UserRow from './UserRow'

import translations from '../../../../i18n'

import styles from './Styles'

const ITEM_HEIGHT = 50

class UserListComponent extends Component {

  constructor() {
    super()

    this.renderItem = ({item}) => {
      return <UserRow user={item} {...this.props} />
    }

    this.emptyList = () => {
      return (
        <Text
          style={styles.placeholder}>
          {translations.t('notUsers')}
        </Text>
      )
    }

    this.itemLayout = (data, index) => (
      {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    )
  }

  componentDidUpdate() {
    if (this.props.data.length) {
        this.flatList.scrollToIndex({animated: true, index: 0});
    }
  }

  render() {
    const data = this.props.data
    // console.log('data', data);
    const contentContainerStyle = data.length ? null : styles.flatlistContainerStyle
    return (
      <FlatList
        ref={(c) => { this.flatList = c }}
        style={styles.container}
        contentContainerStyle={contentContainerStyle}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={this.renderItem}
        getItemLayout={this.itemLayout}
        ListEmptyComponent={this.emptyList}
         />
    )
  }
}

UserListComponent.propTypes = {
  data: PropTypes.array.isRequired,
}

export default UserListComponent
