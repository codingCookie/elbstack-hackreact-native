import React, {
    Platform,
    Component,
    View,
    ScrollView,
    InteractionManager,
    TouchableHighlight,
    Switch
} from 'react-native'
import { connect } from 'react-redux/native'

import { listChannels, joinChannel } from '../../actions/channels'

import ActionBar from '../container/ActionBar'
import LoadingIndicator from '../elements/LoadingIndicator'
import Text from '../elements/Text'
import IntroText from '../elements/IntroText'

class ChannelsPage extends Component {
    state = {
        interactionsFinished: false
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({interactionsFinished: true})

            this.props.listChannels()
        })
    }

    render() {
        let interactionsFinishedMarkup = <LoadingIndicator/>

        if (this.state.interactionsFinished) {
            interactionsFinishedMarkup = <Text>Lade Channels</Text>
        }

        const channels = this.props.channels

        if (channels) {
            interactionsFinishedMarkup = Object.keys(channels).map(
                (id) => (
                    <TouchableHighlight
                        key={'channel_id:' + id}
                        onPress={this.props.joinChannel.bind(this, channels[id].channel_url)}
                        activeOpacity={0.6}
                        underlayColor="transparent">
                        <Text style={styles.listitem}>{channels[id].name}</Text>
                    </TouchableHighlight>)
            )
        }

        return (
            <View style={styles.container}>
                <ActionBar title="Available Channels"/>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
                    {interactionsFinishedMarkup}
                </ScrollView>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f7f8fc'
    },
    listitem: {
        fontSize: 25
    }
}


export default connect(
    (state) => ({
        channels: state.channels.list
    }),
    (dispatch) => {
        return {
            listChannels: () => dispatch(listChannels()),
            joinChannel: (url) => dispatch(joinChannel(url))
        }
    }
)(ChannelsPage)
