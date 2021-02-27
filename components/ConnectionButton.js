import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../assets/colors";

const ConnectionButton = ({
    text,
    onPressAsyncFunction,
    requestInProgress,
    marginBottom,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { marginBottom: marginBottom ? marginBottom : 12 },
            ]}
            disabled={requestInProgress ? true : false}
            onPress={async () => {
                onPressAsyncFunction();
            }}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default ConnectionButton;

const styles = StyleSheet.create({
    button: {
        borderColor: colors.red,
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 20,
    },
    text: {
        fontSize: 17,
        color: colors.lightGreyConnectionButtons,
    },
});
