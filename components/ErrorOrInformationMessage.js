import React from "react";
import { StyleSheet, Text } from "react-native";

import colors from "../assets/colors";

const ErrorOrInformationMessage = ({ message }) => {
    return (
        <Text
            style={
                message.type === "information"
                    ? styles.informationMessage
                    : styles.errorMessage
            }
        >
            {message.message}
        </Text>
    );
};

export default ErrorOrInformationMessage;
const styles = StyleSheet.create({
    errorMessage: {
        color: colors.lightRedForError,
        marginBottom: 10,
    },
    informationMessage: {
        color: "black",
        marginBottom: 10,
    },
});
