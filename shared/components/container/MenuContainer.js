import React, {
  Component,
  Platform,
  ScrollView,
  Image,
  View,
  Dimensions
} from 'react-native'

import { connect } from 'react-redux/native'
import { navigateTo, resetTo } from '../../actions/navigation'

import globalStyles from '../../constants/GlobalStyles'

import Profile from '../elements/Profile'
import Text from '../elements/Text'
import MenuGroupLabel from '../elements/MenuGroupLabel'
import MenuItem from '../elements/MenuItem'
import MenuItemContainer from './MenuItemContainer'

const window = Dimensions.get('window')

class MenuContainer extends Component {
  render() {

    const publicChannels = []

    let publicChannelsDummy = []
    publicChannelsDummy.forEach((channelName) => {
      publicChannels.push(
        <MenuItemContainer key={'MenuChannel' + channelName} text={channelName} navTarget='conversation'/>
      )
    })

    this.props.joinedChannels.forEach(channel => {
      publicChannels.push(
        <MenuItemContainer key={'MenuChannel' + channel.name} text={channel.name} navTarget='conversation'/>
      )
    });

    return (
      <View style={styles.background}>
        <View style={styles.statusbar}></View>
        <View style={styles.container}>
          <ScrollView style={styles.scrollContainer}>

            <Profile />

            <MenuItem
              key={'MenuChannelsList'}
              text="list channels"
              handlePress={this.props.navigateTo.bind(this, 'channels')}
              style={styles.highlight}/>
            <MenuGroupLabel text='Joined Channels'/>
            {publicChannels.length > 0 ? publicChannels : <Text style={styles.noJoinedChannles}>no joined channels</Text>}

            <MenuGroupLabel text='More'/>
            <MenuItemContainer text='Settings' navTarget='settings'/>
            {Platform.OS === 'android' ?
              <View style={{height: 100, width: window.width}}/> : null
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = {
  background: {
    flex: 1,
    backgroundColor: '#6e5baa',
  },
  container: {
    flexDirection: 'row'
  },
  scrollContainer: {
    flex: 1,
    width: window.width * 0.8,
    height: window.height - 20,
    backgroundColor: 'transparent'
  },
  profileInfoContainer: {
    padding: 15,
    flex: 1,
    alignItems: 'center'
  },
  profileInfoText: {
    ...globalStyles.userName,
    color: '#fff',
    marginTop: 5,
    marginBottom: 3
  },
  subProfileInfoText: {
    ...globalStyles.s,
    color: '#fff',
    marginBottom: 8
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#fff'
  },
  statusbar: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 0,
    width: window.width * 0.8,
    flex: 1
  },
  highlight: {
    backgroundColor: '#32c5e6',
    marginTop: 20,
    marginBottom: 20
  },
  noJoinedChannles: {
    margin: 20,
    color: '#fff'
  }
}

if (Platform.OS === 'ios') {
  styles.statusbar.height = 20
}

export default connect(
  (state) => {
    return {
      login: state.login,
      notifications: state.notifications,
      joinedChannels: Object
        .keys(state.channels.list)
        .map(id => state.channels.list[id])
        .filter(channel => channel.joined)
    }
  },
  (dispatch) => {
    return {
      resetTo: (view) => {
        dispatch(resetTo(view))
      },
      navigateTo: (view) => {
        dispatch(navigateTo(view));
      },
      logout: () => {
        dispatch(logout())
      },
      getUnreadMessageCount: (userId) => {
        dispatch(getUnreadMessageCount(userId))
      }
    }
  }
)(MenuContainer)
