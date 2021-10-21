import React from 'react';
import { ImageBackground, View, StyleSheet, Image } from 'react-native';

function WelcomeScreen(props) {
    return (
       <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
       >
           <Image style={styles.logo} source={require("../assets/Plant-logos.jpeg")}/>
           <View style={styles.continueButton}></View>
       </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    continueButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#3DE411",
    },
    logo: {
        width: 100,
        height: 100,
        position: "absolute",
        top: 105,
    },
})

export default WelcomeScreen;