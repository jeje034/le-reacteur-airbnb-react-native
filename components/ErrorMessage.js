import React from "react";
import { StyleSheet, Text } from "react-native";

import colors from "../assets/colors";

const ErrorMessage = ({ errorMessage }) => {
    return <Text style={styles.errorMessage}>{errorMessage}</Text>;
};

export default ErrorMessage;
const styles = StyleSheet.create({
    errorMessage: {
        color: colors.lightRedForError,
        marginBottom: 10,
    },
});
