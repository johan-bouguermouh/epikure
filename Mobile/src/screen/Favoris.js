import React from 'react'
import {Button,Text, View} from 'react-native'

function Favoris({navigation}) {
    return (
        <View>
          <Text>Test</Text>
          <Button  
           title="Go to Produit"
            onPress={() => navigation.navigate('Produit')}/>
             <Button  
           title="Go to Recette"
            onPress={() => navigation.navigate('Recette')}/>
              <Button  
           title="Go to Magasin"
            onPress={() => navigation.navigate('Magasin')}/>
        </View>
      )
}

export default Favoris
