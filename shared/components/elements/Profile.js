import React, {
  Component,
  Image,
  View
} from 'react-native'

import Text from './Text'
import { connect } from 'react-redux/native'

class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.userName}</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    margin: 20
  }
}


export default connect(
    state => ({
        userName: state.sendbird.user_name
    }),
    null
)(Profile)