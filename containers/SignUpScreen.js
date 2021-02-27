import React, { useState } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import Constants from "expo-constants";

// Colors
import colors from "../assets/colors";
const {
    darkGrey,
    grey,
    lightGrey,
    yellow,
    blue,
    green,
    white,
    lightRed,
    lightRedForError,
    red,
    lightGreyRedirectLink: lightGreyRegister,
    lightGreyConnectionButtons: lightGreySignIn,
} = colors;

import LogoAirbnb from "../components/LogoAirbnb";
import MainTitle from "../components/MainTitle";
import OneLineInput from "../components/OneLineInput";
import ConnectionButton from "../components/ConnectionButton";
import RedirectLink from "../components/RedirectLink";
import MultipleActivityIndicator from "../components/MultipleActivityIndicator";
import ErrorOrInformationMessage from "../components/ErrorOrInformationMessage";
import MultiLineInput from "../components/MultiLineInput";

export default function SignUpScreen({ setIdAndToken }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [requestInProgress, setRequestInProgress] = useState(false);

    const handleSignUpButton = async () => {
        try {
            if (
                !email ||
                !username ||
                !description ||
                !password ||
                !confirmPassword
            ) {
                setErrorMessage("Please fill all fields");
                return;
            }
            if (password !== confirmPassword) {
                setErrorMessage("Both passwords are different");
                return;
            }
            setRequestInProgress(true);

            const response = await axios.post(
                "https://express-airbnb-api.herokuapp.com/user/sign_up",
                {
                    email,
                    username,
                    description,
                    password,
                }
            );
            setRequestInProgress(false);
            if (response.data && response.data.token && response.data.id) {
                setIdAndToken({
                    id: response.data.id,
                    token: response.data.token,
                });
            } else {
                console.log(
                    "response.data received without error but without id or token :",
                    response.data
                );
                setErrorMessage("An error occured");
            }
        } catch (error) {
            setRequestInProgress(false);
            console.log("Error.response:", error.response);

            const errorMessage = error.response.data.error;

            if (
                errorMessage === "This email already has an account." ||
                errorMessage === "This username already has an account."
            ) {
                setErrorMessage(errorMessage);
            } else {
                setErrorMessage("An error occured");
            }
        }
    };

    {
        /* 
                            
        */
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
                <View style={styles.globalView}>
                    <View style={styles.topView}>
                        <LogoAirbnb largeLogo={true} />
                        <MainTitle title="Sign in" />
                    </View>

                    <View style={styles.mediumView}>
                        <OneLineInput
                            placeHolder="email"
                            setValueFunction={setEmail}
                            setErrorMessageFunction={setErrorMessage}
                            keyboardType="email-address"
                        />
                        <OneLineInput
                            placeHolder="username"
                            setValueFunction={setUsername}
                            setErrorMessageFunction={setErrorMessage}
                        />
                        <MultiLineInput
                            placeHolder="Describe yourself in a few words..."
                            setValueFunction={setDescription}
                            setErrorMessageFunction={setErrorMessage}
                        />
                        <OneLineInput
                            placeHolder="password"
                            setValueFunction={setPassword}
                            setErrorMessageFunction={setErrorMessage}
                            passwordHidden={passwordHidden}
                            setPasswordHidden={setPasswordHidden}
                        />
                        <OneLineInput
                            placeHolder="confirm password"
                            setValueFunction={setConfirmPassword}
                            setErrorMessageFunction={setErrorMessage}
                            passwordHidden={passwordHidden}
                            setPasswordHidden={setPasswordHidden}
                        />
                    </View>

                    <View style={styles.bottomView}>
                        {requestInProgress && <MultipleActivityIndicator />}

                        <ErrorOrInformationMessage
                            message={{ message: errorMessage, type: "error" }}
                        />

                        <ConnectionButton
                            text="Sign up"
                            requestInProgress={requestInProgress}
                            onPressAsyncFunction={handleSignUpButton}
                        />
                        <RedirectLink
                            linkText="Already have an account ? Sign in"
                            redirectScreen="SignIn"
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1,
    },
    keyboardAwareScrollView: {
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    },
    globalView: {
        alignItems: "center",
        justifyContent: "space-around",
        height: Dimensions.get("window").height,
    },
    topView: {
        alignItems: "center",
        //borderColor: yellow,
        //borderWidth: 2,
    },
    mediumView: {
        alignItems: "center",
    },
    bottomView: {
        alignItems: "center",
    },
});
