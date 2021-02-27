import React from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../assets/colors";

const OneLineInput = ({
    placeHolder,
    setValueFunction,
    setErrorMessageFunction,
    passwordHidden,
    setPasswordHidden,
    value,
    keyboardType,
}) => {
    return (
        <View style={styles.aroundInput}>
            <TextInput
                placeholder={placeHolder}
                underlineColorAndroid="transparent" //msgjs21 ne fonctionne pas pendant la saisie sur Android (pas nécessaire sur IOS)
                InputProps={{ disableUnderline: true }}
                style={styles.input}
                value={value && value}
                secureTextEntry={passwordHidden}
                autoCapitalize="none"
                keyboardType={keyboardType ? keyboardType : "default"}
                onChangeText={(text) => {
                    setValueFunction(text);
                    setErrorMessageFunction("");
                }}
            />
            {setPasswordHidden && (
                <Entypo
                    name="eye"
                    size={24}
                    color={colors.grey}
                    onPress={() => {
                        setPasswordHidden(!passwordHidden);
                    }}
                />
            )}
        </View>
    );
};

export default OneLineInput;
const styles = StyleSheet.create({
    aroundInput: {
        borderBottomColor: colors.lightRed,
        borderBottomWidth: 1,
        marginBottom: 20,
        width: Dimensions.get("window").width - 60,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        height: 35,
        fontSize: 16,
    },
});
