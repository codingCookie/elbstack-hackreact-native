import { SENDBIRD_LIST_CHANNELS, SENDBIRD_LIST_CHANNELS_ERROR } from '../constants/ActionTypes'
import sendbird from 'sendbird'

export function listChannels() {
    const page = 1
    const limit = 20

    return dispatch => {
        sendbird.getChannelList({
            page: page,
            limit: limit,
            successFunc: (data) => {
                dispatch({
                    type: SENDBIRD_LIST_CHANNELS,
                    data: data
                })
            },
            errorFunc: (status, error) => {
                dispatch({
                    type: SENDBIRD_LIST_CHANNELS_ERROR,
                    status: status,
                    error: error
                })
            }
        })
    }
}


export function joinChannel(url) {

    return dispatch => {
        sendbird.joinChannel(
            url,
            {
                "successFunc": function (data) {
                    console.log(data);
                    sendbird.connect({
                        "successFunc": function (data) {
                            console.log(data);
                            // do something
                        },
                        "errorFunc": function (status, error) {
                            console.log(status, error);
                            // do something
                        }
                    });
                    // do something
                },
                "errorFunc": function (status, error) {
                    console.log(status, error);
                    // do something
                }
            }
        );
    }
}