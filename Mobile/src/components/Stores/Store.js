import React from 'react'
import { Button,Text, View } from 'react-native'

function Store({navigation}) {
  return (
    <View>
        <Text>Magasin</Text>
        <Button  
           title="Go to Produit"
            onPress={() => navigation.navigate('Produit')}/>
            <Button  
           title="Go to Producteur"
            onPress={() => navigation.navigate('Producteur')}/>
    </View>
  )
}

export default Store