import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import RoomScreen from "./containers/RoomScreen";

import LogoAirbnb from "./components/LogoAirbnb";
import AroundMeScreen from "./containers/AroundMeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userIdAndToken, setUserIdAndToken] = useState(null);

    const setIdAndToken = async (idAndToken) => {
        if (idAndToken && idAndToken.id && idAndToken.token) {
            AsyncStorage.setItem(
                "AirbnbIdAndToken",
                JSON.stringify(idAndToken)
            );
        } else {
            AsyncStorage.removeItem("AirbnbIdAndToken");
        }

        setUserIdAndToken(idAndToken);
    };

    useEffect(() => {
        // Fetch the token and the id from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userIdAndToken = {};

            try {
                userIdAndToken = JSON.parse(
                    await AsyncStorage.getItem("AirbnbIdAndToken")
                );
            } catch (error) {
                console.log("An error occured:", error);
            }
            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            setIsLoading(false);
            setUserIdAndToken(userIdAndToken);
        };

        bootstrapAsync();
    }, []);

    /*

    */

    return (
        <NavigationContainer>
            {isLoading ? null : userIdAndToken === null ? ( // We haven't finished checking for the token yet
                // No token found, user isn't signed in
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="SignIn"
                        options={{ animationEnabled: false }}
                    >
                        {() => <SignInScreen setIdAndToken={setIdAndToken} />}
                    </Stack.Screen>
                    <Stack.Screen name="SignUp">
                        {() => <SignUpScreen setIdAndToken={setIdAndToken} />}
                    </Stack.Screen>
                </Stack.Navigator>
            ) : (
                // User is signed in
                <Stack.Navigator>
                    <Stack.Screen
                        name="Tab"
                        options={{
                            headerShown: false,
                            animationEnabled: false,
                        }}
                    >
                        {() => (
                            <Tab.Navigator
                                tabBarOptions={{
                                    activeTintColor: "tomato",
                                    inactiveTintColor: "gray",
                                }}
                            >
                                <Tab.Screen
                                    name="Home"
                                    options={{
                                        tabBarLabel: "Home",
                                        tabBarIcon: ({ color, size }) => (
                                            <Ionicons
                                                name={"ios-home"}
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator
                                            screenOptions={{
                                                headerTitle: () => (
                                                    <LogoAirbnb />
                                                ),
                                                headerTitleAlign: "center",
                                                headerStyle: {
                                                    backgroundColor: "white",
                                                },
                                                headerTitleStyle: {
                                                    color: "black",
                                                },
                                            }}
                                        >
                                            <Stack.Screen
                                                name="Home"
                                                options={
                                                    {
                                                        // headerTitle: () => (
                                                        //     <LogoAirbnb />
                                                        // ),
                                                        //headerTitleAlign: "center",
                                                        // headerStyle: {
                                                        //     backgroundColor:
                                                        //         "white",
                                                        // },
                                                        // headerTitleStyle: {
                                                        //     color: "black",
                                                        // },
                                                    }
                                                }
                                            >
                                                {() => <HomeScreen />}
                                            </Stack.Screen>
                                            <Stack.Screen name="Room">
                                                {(props) => (
                                                    <RoomScreen {...props} />
                                                )}
                                            </Stack.Screen>

                                            <Stack.Screen
                                                name="Profile"
                                                options={{
                                                    title: "User Profile",
                                                }}
                                            >
                                                {() => <ProfileScreen />}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>
                                <Tab.Screen
                                    name="AroundMe"
                                    options={{
                                        tabBarLabel: "Around me",
                                        tabBarIcon: ({ color, size }) => (
                                            <Octicons
                                                name="location"
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator
                                            screenOptions={{
                                                headerTitle: () => (
                                                    <LogoAirbnb />
                                                ),
                                                headerTitleAlign: "center",
                                                headerStyle: {
                                                    backgroundColor: "white",
                                                },
                                                headerTitleStyle: {
                                                    color: "black",
                                                },
                                            }}
                                        >
                                            <Stack.Screen name="AroundMe">
                                                {(props) => (
                                                    <AroundMeScreen
                                                        {...props}
                                                    />
                                                )}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>
                                <Tab.Screen
                                    name="Profile"
                                    options={{
                                        tabBarLabel: "My profile",
                                        tabBarIcon: ({ color, size }) => (
                                            <AntDesign
                                                name="user"
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator
                                            screenOptions={{
                                                headerTitle: () => (
                                                    <LogoAirbnb />
                                                ),
                                                headerTitleAlign: "center",
                                                headerStyle: {
                                                    backgroundColor: "white",
                                                },
                                                headerTitleStyle: {
                                                    color: "black",
                                                },
                                            }}
                                        >
                                            <Stack.Screen name="Profile">
                                                {(props) => (
                                                    <ProfileScreen
                                                        {...props}
                                                        userIdAndToken={
                                                            userIdAndToken
                                                        }
                                                        setIdAndToken={
                                                            setIdAndToken
                                                        }
                                                    />
                                                )}
                                            </Stack.Screen>
                                            {/* <Stack.Screen>
                                                {() => (
                                                    <ProfileScreen
                                                        setIdAndToken={setIdAndToken}
                                                    />
                                                )}
                                            </Stack.Screen name=> */}
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>
                            </Tab.Navigator>
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
