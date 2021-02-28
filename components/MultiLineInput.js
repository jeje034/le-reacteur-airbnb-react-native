import React from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../assets/colors";

const MultiLineInput = ({
    placeHolder,
    setValueFunction,
    setErrorMessageFunction,
    value,
    setIsModifiedFunction,
}) => {
    /*

*/

    //Attention, le texte peut être souligné car il est inconnu du dictionnaire !
    return (
        <TextInput
            placeholder={placeHolder}
            underlineColorAndroid={"rgba(0,0,0,0)"}
            multiline={true}
            InputProps={{ disableUnderline: true }}
            value={value && value}
            style={styles.input}
            onChangeText={(text) => {
                setValueFunction(text);
                setErrorMessageFunction("");
                setIsModifiedFunction && setIsModifiedFunction(true);
            }}
        />
    );
};

export default MultiLineInput;

const styles = StyleSheet.create({
    input: {
        width: Dimensions.get("window").width - 60,
        height: 100,
        fontSize: 16,
        borderColor: colors.lightRed,
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});
