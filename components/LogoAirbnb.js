import React from "react";
import { Image, StyleSheet } from "react-native";

const LogoAirbnb = ({ largeLogo }) => {
    return (
        <Image
            source={require("../assets/logo.png")}
            style={largeLogo ? styles.largeLogo : styles.smallLogo}
            resizeMode="contain"
        />
    );
};
export default LogoAirbnb;

const styles = StyleSheet.create({
    smallLogo: {
        width: 30,
        height: 30,
    },
    largeLogo: {
        width: 130,
        height: 130,
    },
});
