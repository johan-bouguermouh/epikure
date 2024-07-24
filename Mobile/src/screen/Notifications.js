import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native";
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import notify_end from "../../assets/notify_end.png";

const data = [
  {
    title: "Profitez des Dernières Fraises de la Saison !",
    body: "Les fraises locales sont encore disponibles pour quelques jours seulement. Commandez les vôtres avant qu'il ne soit trop tard ! 🍓",
  },
  {
    title: "Début de la Saison des Tomates 🍅",
    body: "Les tomates locales arrivent enfin sur les étals ! Riches en lycopène, elles sont parfaites pour votre santé cardiovasculaire. Découvrez les producteurs près de chez vous.",
  },
  {
    title: "Astuces Santé : Les Bienfaits des Myrtilles",
    body: "Les myrtilles locales sont pleines d'antioxydants qui boostent votre système immunitaire. Trouvez vos producteurs de myrtilles sur notre application ! 🫐",
  },
  {
    title: "Mangez Local et de Saison : Les Aubergines",
    body: "Les aubergines sont maintenant en saison. Essayez une nouvelle recette méditerranéenne ce week-end avec des produits frais et locaux ! 🍆",
  },
  {
    title: "Journée de l'Agriculture Raisonnée 🌱",
    body: "Célébrez la journée de l'agriculture raisonnée en soutenant les producteurs locaux qui utilisent des méthodes durables. Trouvez des produits près de chez vous.",
  },
  {
    title: "Coup de Projecteur sur les Pommes de Terre Nouvelles",
    body: "Les pommes de terre nouvelles sont disponibles ! Savoureuses et nutritives, elles sont idéales pour toutes vos recettes estivales. Recherchez des producteurs locaux sur notre application.",
  },
  {
    title: "Recette de la Semaine : Ratatouille aux Légumes Locaux",
    body: "Préparez une ratatouille avec des légumes frais de saison. Commandez des courgettes, aubergines et tomates de votre région aujourd'hui !",
  },
  {
    title: "Les Bienfaits du Miel Local",
    body: "Saviez-vous que le miel local peut aider à combattre les allergies saisonnières ? Trouvez votre apiculteur local et profitez de ce superaliment naturel.",
  },
  {
    title: "Nouveau Producteur Ajouté !",
    body: "Un nouveau producteur de légumes bio a rejoint notre réseau ! Découvrez leurs produits frais et savoureux dès maintenant.",
  },
  {
    title: "Réduisez Votre Empreinte Carbone 🌍",
    body: "En achetant des produits locaux, vous réduisez les émissions de CO2. Soutenez l'agriculture raisonnée et faites un geste pour la planète aujourd'hui.",
  },
];

function NotificationCard({ item, onDismiss }) {
  return (
    <Swipeable
      renderRightActions={() => (
        <View style={styles.deleteButton}>
          <MaterialCommunityIcons
            name="delete-empty-outline"
            size={33}
            color="white"
          />
        </View>
      )}
      onSwipeableRightOpen={onDismiss}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </Swipeable>
  );
}

function Notifications() {
  const [notifications, setNotifications] = useState(data);

  const handleDismiss = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingBottom: 48 }}>
        {notifications.length > 0 ? (
          notifications.map((item, index) => (
            <NotificationCard
              key={index}
              item={item}
              onDismiss={() => handleDismiss(index)}
            />
          ))
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              source={notify_end}
              style={{ width: 300, height: 300, marginTop: "30%" }}
            />
            <Text style={{ fontSize: 16 }}>Aucune notification</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E5E6DE",
  },
  card: {
    backgroundColor: "#FFF6F4",
    padding: 20,
    marginVertical: 4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 0.7,
    borderColor: "#D9B3D9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#E89680",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Notifications;
