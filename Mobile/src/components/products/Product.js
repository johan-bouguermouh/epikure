import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getProduct } from "../../services/product.service";
import { UserContext } from "../../contexts/UserContext";

// on récupère l'id du produit envoyer par la navigation et on le passe à la fonction getProducts

function Product({ route }) {
  const { productId } = route.params;
  const { location, errorMsg } = useContext(UserContext);
  console.log(location);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(productId, location).then((result) => {
      setProduct(result);
      setLoading(false);
    });
  }, [productId]);

  return (
    <View>
      <Text>Products</Text>
    </View>
  );
}

export default Product;
