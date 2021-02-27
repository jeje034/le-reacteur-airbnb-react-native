import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import axios from "axios";

import unknownUserImage from "../assets/woman.png";
import colors from "../assets/colors";
import OneLineInput from "../components/OneLineInput";
import MultiLineInput from "../components/MultiLineInput";
import ConnectionButton from "../components/ConnectionButton";

export default function ProfileScreen({
    userIdAndToken,
    setIdAndToken, //setUserIdAndToken sert juste pour la déconnexion
}) {
    const [isDownloading, setIsDownloading] = useState(true);
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [requestInProgress, setRequestInProgress] = useState(false); //msgjs21 Gérer
    console.log("deb ProfileScreen");

    const handleLogOutButton = () => {
        setIdAndToken(null);
    };
    const handleUpdateButton = () => {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://express-airbnb-api.herokuapp.com/user/${userIdAndToken.id}`,
                    {
                        headers: {
                            Authorization: "Bearer " + userIdAndToken.token,
                        },
                    }
                );
                setEmail(response.data.email);
                setUsername(response.data.username);
                setDescription(response.data.description);

                setIsDownloading(false);
            } catch (error) {
                console.log("An error occured :", error.message);
                alert("An error occurs."); //msgjs21 si temps metre un <Text> en rouge
            }
        };
        fetchData();
    }, []);

    /*
<View style={[styles.container, styles.contentContainerStyle]}>
</View>
*/

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
        >
            <View style={styles.topView}>
                <TouchableOpacity style={styles.aroundUserImage}>
                    <Image style={styles.userImage} source={unknownUserImage} />
                </TouchableOpacity>
                <View style={styles.chooseOrTakePhoto}>
                    <TouchableOpacity
                        onPress={() => {
                            uploadPicture();
                        }}
                    >
                        <MaterialIcons
                            name="photo-library"
                            size={30}
                            color={colors.greyForIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => {
                            takePicture();
                        }}
                    >
                        <FontAwesome5
                            name="camera"
                            size={30}
                            color={colors.greyForIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.mediumView}>
                <OneLineInput
                    placeHolder="email"
                    setValueFunction={setEmail}
                    value={email}
                    setErrorMessageFunction={setErrorMessage}
                    keyboardType="email-address"
                />
                <OneLineInput
                    placeHolder="username"
                    setValueFunction={setUsername}
                    value={username}
                    setErrorMessageFunction={setErrorMessage}
                />
                <MultiLineInput
                    placeHolder="Describe yourself in a few words..."
                    setValueFunction={setDescription}
                    value={description}
                    setErrorMessageFunction={setErrorMessage}
                />
            </View>

            <View style={styles.bottomView}>
                {/* <ErrorMessage errorMessage={errorMessage} /> */}

                <ConnectionButton
                    text="Update"
                    requestInProgress={requestInProgress}
                    onPressAsyncFunction={handleUpdateButton}
                    marginBottom={20}
                />
                <ConnectionButton
                    text="Log out"
                    requestInProgress={requestInProgress}
                    onPressAsyncFunction={handleLogOutButton}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: Constants.statusBarHeight, //J'ai dû mettre ce padding dpuis que j'ai mis KeyboardAwareScrollView. msgjs21 Mais
        //sous iOs, le KeyboardAwareScrollView fait que le le justifyContent: "space-around" de contentContainerStyle ne s'applique pas => issue
    },
    contentContainerStyle: {
        justifyContent: "space-around",
    },

    topView: {
        flexDirection: "row",
        justifyContent: "center",
    },
    isDownloadingView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    aroundUserImage: {
        width: 170,
        height: 170,
        borderRadius: 85,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderBottomColor: colors.lightRed,
    },
    userImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    chooseOrTakePhoto: {
        justifyContent: "space-around",
        marginLeft: 20,
    },
    mediumView: {
        alignItems: "center",
    },
    bottomView: {
        //        marginHorizontal: 20,
        alignItems: "center",
    },
});
