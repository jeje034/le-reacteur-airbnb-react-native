import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Constants from "expo-constants";
import axios from "axios";

import unknownUserImage from "../assets/woman.png";
import colors from "../assets/colors";
import OneLineInput from "../components/OneLineInput";
import MultiLineInput from "../components/MultiLineInput";
import ConnectionButton from "../components/ConnectionButton";
import ErrorOrInformationMessage from "../components/ErrorOrInformationMessage";

export default function ProfileScreen({
    userIdAndToken,
    setIdAndToken, //setUserIdAndToken sert juste pour la déconnexion
}) {
    const [isDownloading, setIsDownloading] = useState(true);
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [errorOrInformationMessage, setErrorOrInformationMessage] = useState(
        {}
    );
    const [isImageModified, setIsImageModified] = useState(false);
    const [isTextModified, setIsTextModified] = useState(false);

    console.log("deb ProfileScreen keyb");

    const handleLogOutButton = () => {
        setIdAndToken(null);
    };

    const uploadPicture = async () => {
        setErrorOrInformationMessage("");
        const cameraRollPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraRollPerm.status === "granted") {
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
            });

            if (pickerResult && pickerResult.uri) {
                setUrlImage(pickerResult.uri);

                if (!isImageModified) {
                    setIsImageModified(true);
                }
            }

            /*
=> Object {
  "cancelled": false,
  "height": 2250,
  "type": "image",
  "uri": "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FAirbnb+J%25C3%25A9r%25C3%25B4me-79f923a5-a607-43cf-ad11-a0f075e04176/ImagePicker/970f9884-c296-4a32-9ae2-2416b8090b32.jpg", 
  "width": 3000,
}
*/
        }
    };

    const takePicture = async () => {
        setErrorOrInformationMessage("");
        const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();

        if (cameraPerm.status !== "granted") {
            return;
        }
        const cameraRollPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraRollPerm.status !== "granted") {
            return;
        }

        const pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (pickerResult && pickerResult.uri) {
            setUrlImage(pickerResult.uri);
            if (!isImageModified) {
                setIsImageModified(true);
            }
        }
    };

    const handleUpdateButton = () => {
        if (isImageModified) {
            updateImage();
        }

        if (isTextModified) {
            updateText();
        }
    };

    const updateImage = async () => {
        try {
            let imageExtension = "";

            if (urlImage.indexOf(".") >= 0) {
                const partsOfImageUrl = urlImage.split(".");
                imageExtension = partsOfImageUrl[partsOfImageUrl.length - 1];
            }
            const formData = new FormData();
            formData.append("photo", {
                uri: urlImage,
                name: username,
                type: `image/${imageExtension}`,
            });
            const response = await axios.put(
                `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${userIdAndToken.token}`,
                    },
                }
            );

            if (response.data) {
                console.log("response.data:", response.data);
                setUrlImage(response.data.photo[0].url);
                setIsImageModified(false);

                setErrorOrInformationMessage({
                    message: "Image updated",
                    type: "information",
                });
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setErrorOrInformationMessage({
                    message: error.response.data.error,
                });
            } else {
                //dans le cas dune erreur hors axios, on n'aura pas forcémment de error.response
                console.log("An error occured during image update:", error);
            }
        }
    };

    const updateText = async () => {
        try {
            const sentObject = {
                email,
                username,
                description,
            };
            const response = await axios.put(
                "https://express-airbnb-api.herokuapp.com/user/update",
                sentObject,
                {
                    headers: {
                        Authorization: `Bearer ${userIdAndToken.token}`,
                    },
                }
            );

            if (response.data) {
                console.log("response.data:", response.data);
                setIsTextModified(false);
                setErrorOrInformationMessage({
                    message: "Information(s) updated",
                    type: "information",
                });
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setErrorOrInformationMessage({
                    message: error.response.data.error,
                });
                console.log(
                    "An error occured during text update:",
                    error.response.data.error
                );
            } else {
                //dans le cas dune erreur hors axios, on n'aura pas forcémment de error.response
                console.log("An error occured during text update :", error);
            }
        }
    };

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

                if (
                    response.data.photo &&
                    response.data.photo &&
                    response.data.photo[0] &&
                    response.data.photo[0].url
                ) {
                    console.log("User has image:", response.data.photo[0].url);
                    setUrlImage(response.data.photo[0].url);
                } else {
                    console.log("User without image.");
                }

                setIsDownloading(false);
            } catch (error) {
                console.log("An error occured :", error.message);

                setErrorOrInformationMessage({
                    message: "An error occurs.",
                });
            }
        };
        fetchData();
    }, []);

    /*

    */

    //J'ai mis cet objet style à l'intérieur de la fonction ProfileScreen pour pouvoir utiliser useBottomTabBarHeight().
    //Une autre solution aurait été de mettre minHeight directement sur le composant dans un tableau comme ceci :
    //return (
    //  <KeyboardAwareScrollView
    //      style={styles.container}
    //      contentContainerStyle={[styles.contentContainerStyle,
    //      {minHeiht: ...},]}
    //    >
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "white",
        },
        contentContainerStyle: {
            justifyContent: "space-around",
            flex: 1,
            minHeight:
                Dimensions.get("window").height -
                Constants.statusBarHeight -
                useBottomTabBarHeight(),
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
            // width: 85,
            // height: 85,
            // borderRadius: 42,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: colors.lightRed,
        },
        userImage: {
            height: 150,
            width: 150,
            borderRadius: 75,
            // height: 75,
            // width: 75,
            // borderRadius: 37,
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

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
        >
            <View style={styles.topView}>
                <View style={styles.aroundUserImage}>
                    {urlImage ? (
                        <Image
                            style={styles.userImage}
                            source={{ uri: urlImage }}
                        />
                    ) : (
                        <Image
                            style={styles.userImage}
                            source={unknownUserImage}
                        />
                    )}
                </View>
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
                    setErrorMessageFunction={setErrorOrInformationMessage}
                    keyboardType="email-address"
                    setIsModifiedFunction={setIsTextModified}
                />
                <OneLineInput
                    placeHolder="username"
                    setValueFunction={setUsername}
                    value={username}
                    setErrorMessageFunction={setErrorOrInformationMessage}
                    setIsModifiedFunction={setIsTextModified}
                />
                <MultiLineInput
                    placeHolder="Describe yourself in a few words..."
                    setValueFunction={setDescription}
                    value={description}
                    setErrorMessageFunction={setErrorOrInformationMessage}
                    setIsModifiedFunction={setIsTextModified}
                />
            </View>

            <View style={styles.bottomView}>
                {
                    <ErrorOrInformationMessage
                        message={errorOrInformationMessage}
                    />
                }
                <ConnectionButton
                    text="Update"
                    onPressAsyncFunction={handleUpdateButton}
                    marginBottom={20}
                />
                <ConnectionButton
                    text="Log out"
                    onPressAsyncFunction={handleLogOutButton}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}
