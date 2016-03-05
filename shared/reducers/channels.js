import { SENDBIRD_LIST_CHANNELS, SENDBIRD_JOINED_CHANNEL } from '../constants/ActionTypes'

export default function channels(state = {list: []}, action) {
  switch (action.type) {
    case SENDBIRD_LIST_CHANNELS:
      return Object.assign(
        {},
        state,
        {
          page: action.data.page,
          next: action.data.next,
          list: action.data.channels.reduce((memo, channel)=> ({
            ...memo,
            [channel.id]: channel
          }), {})
        }
      )
    case SENDBIRD_JOINED_CHANNEL:
      const newState = {
        ...state
      }
      newState.list[action.channel_id].joined = true
      return newState;
    default:
      return state
  }
}