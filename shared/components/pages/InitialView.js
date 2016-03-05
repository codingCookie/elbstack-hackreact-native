import React, {
  Component,
  Platform,
  View,
  Image,
  PropTypes,
  InteractionManager,
  TouchableHighlight
} from 'react-native'

import { connect } from 'react-redux/native'
import { navigateTo, resetTo, navigateToWithHistory } from '../../actions/navigation'

import TimerMixin from 'react-timer-mixin'

import Dimensions from 'Dimensions'

import Button from '../elements/Button'
import Text from '../elements/Text'
import LoadingIndicator from '../elements/LoadingIndicator'

import ActionBar from '../container/ActionBar'
import SendbirdConnect from '../container/SendbirdConnect'

import colors, { MAIN_COLOR } from '../../constants/Colors'
import globalStyles from '../../constants/GlobalStyles'

class InitialView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            style={styles.logo}
            source={require('../../images/logo.png')}
          />
          <Text style={styles.headline}>
            hottentotten messenger
          </Text>
          <SendbirdConnect />
        </View>
      </View>
    )
  }
}

const window = Dimensions.get('window')

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#6e5baa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    marginBottom: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 100
  }
}

export default connect(
  (state) => {
    return {
      login: state.login
    }
  },
  (dispatch) => {
    return {
      resetTo: (view) => {
        dispatch(resetTo(view))
      },
      navigateTo: (view) => {
        dispatch(navigateTo(view))
      },
      navigateToWithHistory: (route) => {
        dispatch(navigateToWithHistory(route))
      },
      loadCurrentUser: () => {
        dispatch(loadCurrentUser())
      }
    }
  }
)(InitialView)
