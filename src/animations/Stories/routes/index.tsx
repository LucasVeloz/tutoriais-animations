import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { ActiveStorie } from '../Screens/ActiveStorie';
import { Stories } from '../Screens/Stories';

const { Navigator, Screen } = createSharedElementStackNavigator();


export const SharedNavigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false, 
        gestureEnabled: false,
        cardOverlayEnabled: true,
        detachPreviousScreen: false,
        presentation: 'modal',
        cardStyle: {
          backgroundColor: 'transparent'
        },
        cardStyleInterpolator: ({ current: { progress }}) => ({
          cardStyle: {
            opacity: progress
          }
        })
      
    }}>
      <Screen 
        name='Main' 
        component={Stories}
      />
      <Screen 
        name='Secondary' 
        component={ActiveStorie} 
        sharedElements={({ params }) => [`image-${params.id}`]}
      />
    </Navigator>
  )
}
