import React from 'react'
import { Button, View } from 'react-native';

function Home({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Go to Profile"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      );
}

export default Home
