///////////////////////////////////////////////// NOTE /////////////////////////////////////////////////////////////////

// // It should be noted that this component is no longer in use by the application,
// // though it is still kept here in the files
// // so that I can reference it, should I need to

/////////////////////////////////////////////// End Note ///////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { SafeAreaView, View, StyleSheet } from "react-native";

// import colors from "../config/colors";
// import firebase from "../../firebase";

// import LogCard from "../components/LogCard";
// import AppButton from "../components/AppButton";
// import routes from "../navigation/routes";
// import AppText from "./AppText";
// import { createIconSetFromFontello } from "react-native-vector-icons";
// import { geocodeAsync, reverseGeocodeAsync } from "expo-location";

// // sources used to aid in the creation of this component: https://www.youtube.com/watch?v=v0TKYSkZ2tI&ab_channel=DailyWebCoding

// function SightingList({ filter }) {
//   const [sightingList, setSightingList] = useState();
//   const [isFilter, setIsFilter] = useState();
//   //   const [filterSpecies, setFilterSpecies] = useState();

//   const sightingRef = firebase.database().ref("Sightings");
//   // get the sightings from the database
//   useEffect(() => {
//     sightingRef.on("value", (snapshot) => {
//       const sightings = snapshot.val();

//       const sightingList = [];

//       if (filter) {
//         console.log(filter);
//         if (filter == "No Filter") {
//           for (let id in sightings) {
//             sightingList.push(sightings[id]);
//           }
//           setSightingList(sightingList); // put each sighting object into an array called sightingList
//         } else {
//           console.log("FILTER ADDED!");
//           for (let id in sightings) {
//             if (sightings[id].species === filter) {
//               sightingList.push(sightings[id]);
//             }
//           }
//           setSightingList(sightingList);
//         }
//       } else {
//         for (let id in sightings) {
//           sightingList.push(sightings[id]);
//         }
//         setSightingList(sightingList); // put each sighting object into an array called sightingList
//       }
//     });
//   }, []);

//   //   get sightings for specific species
//   const filterSpecies = (species) => {
//     sightingRef.on("value", (snapshot) => {
//       const sightings = snapshot.val();

//       const sightingList = [];
//       for (let id in sightings) {
//         if (sightings[id].species === species) {
//           sightingList.push(sightings[id]);
//         }
//       }
//       setSightingList(sightingList);
//     });
//   };

//   //   if (filter) {
//   //     setIsFilter(true);
//   //   }
//   //   if filter is supplied by user from logscreen

//   //   if (isFilter) {
//   //     let species = filter;
//   //     console.log(species);
//   //     filterSpecies(species);
//   //     setIsFilter(false);
//   //   }

//   return (
//     <View style={styles.list}>
//       {sightingList ? (
//         sightingList.map((sighting, index) => (
//           <LogCard
//             title={sighting.species}
//             location={sighting.coarse}
//             // location="Location"
//             type={sighting.type.label}
//             caption={sighting.notes}
//             source={sighting.image}
//             key={index}
//           />
//         ))
//       ) : (
//         <AppText>"Error Rendering Sighting List"</AppText>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   list: {
//     paddingBottom: 30,
//   },
// });

// export default SightingList;
