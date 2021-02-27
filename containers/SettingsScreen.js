import React from "react";
import { Button, Text, View } from "react-native";

export default function SettingsScreen({ setIdAndToken }) {
    return (
        <View>
            <Text>Hello Settings</Text>

            <Button
                title="Log Out"
                onPress={() => {
                    setIdAndToken(null);
                }}
            />
        </View>
    );
}
