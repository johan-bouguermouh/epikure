import React from 'react'
import {Button,Text, View} from 'react-native'

function Recettes({navigation}) {
    return (
        <View>
          
          <Text>Test</Text>
          <Button  
           title="Go to Recette"
            onPress={() => navigation.navigate('Recette')}/>
        </View>

      )
}

export default Recettes
