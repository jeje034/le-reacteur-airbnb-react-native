import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../assets/colors";

const RedirectLink = ({ linkText, redirectScreen }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(redirectScreen);
            }}
        >
            <Text style={styles.redirectLink}>{linkText}</Text>
        </TouchableOpacity>
    );
};

export default RedirectLink;

const styles = StyleSheet.create({
    redirectLink: {
        color: colors.lightGreyRedirectLink,
    },
});
