import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import colors from "../assets/colors";

const MultipleActivityIndicator = () => {
    return (
        <View style={styles.horizontal}>
            <ActivityIndicator size="large" color={colors.lightRed} />
            <ActivityIndicator size="small" color={colors.lightRed} />
            <ActivityIndicator size="large" color={colors.lightRed} />
        </View>
    );
};

export default MultipleActivityIndicator;
const styles = StyleSheet.create({
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});
