import React from "react";
import { Text, StyleSheet } from "react-native";

const MainTitle = ({ title }) => {
    return <Text style={styles.title}>{title}</Text>;
};

export default MainTitle;

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
    },
});
