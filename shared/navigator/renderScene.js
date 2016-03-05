import React, { Text, View } from 'react-native'

import InitialView from '../components/pages/InitialView'
import MessengerPage from '../components/pages/MessengerPage'
import SettingsPage from '../components/pages/SettingsPage'
import ChannelsPage from '../components/pages/ChannelsPage'

export default function renderScene(route) {
  let currentView
  switch (route.name) {
    case 'welcome':
      currentView = <InitialView />
      break
    case 'messenger':
      currentView = <MessengerPage />
      break
    case 'settings':
      currentView = <SettingsPage />
      break
    case 'channels':
      currentView = <ChannelsPage />
      break
    default:
      currentView = <View style={{flex: 1, backgroundColor: '#fff'}}><Text>404</Text></View>
  }

  return currentView
}
