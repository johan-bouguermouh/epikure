import React from 'react'
import {Button, Text, View} from 'react-native'

function Productor({navigation}) {
    return (
        <View>
          <Text>Test</Text>
          <Button  
           title="Go to Produit"
            onPress={() => navigation.navigate('Produit')}/>
             <Button  
           title="Go to Magasin"
            onPress={() => navigation.navigate('Magasin')}/>
            
        </View>
      )
}

export default Productor