import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import axios from "axios";
import MultipleActivityIndicator from "../components/MultipleActivityIndicator";
import RoomCard from "../components/RoomCard";
import colors from "../assets/colors";

/*
<SafeAreaView style={styles.container}>
*/
const marginHorizontal = 20;

export default function HomeScreen() {
    console.log("HomeScreen : deb");

    const [isDownloading, setIsDownloading] = useState(true);
    const [offers, setOffers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://express-airbnb-api.herokuapp.com/rooms"
                );
                setOffers(response.data);
                setIsDownloading(false);
            } catch (error) {
                console.log("An error occured :", error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {isDownloading ? (
                <View style={styles.isDownloadingView}>
                    <MultipleActivityIndicator />
                </View>
            ) : (
                <>
                    {
                        <FlatList
                            data={offers}
                            keyExtractor={(item) => String(item._id)}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.touchableOpacity}
                                    onPress={() => {
                                        navigation.navigate("Room", {
                                            id: item._id,
                                        });
                                    }}
                                >
                                    <RoomCard room={item} />
                                </TouchableOpacity>
                            )}
                        />
                    }
                    {/* <Button
                        title="Go to Profile"
                        onPress={() => {
                            navigation.navigate("Profile", { userId: 123 });
                        }}
                    /> */}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    isDownloadingView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    touchableOpacity: {
        borderBottomColor: colors.lightGreyReviewsAndSeparator,
        borderBottomWidth: 1,
        marginBottom: 20,
        marginHorizontal: 20,
        marginTop: 10,
    },
});
