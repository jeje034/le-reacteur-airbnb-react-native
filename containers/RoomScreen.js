import React, { useEffect, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import axios from "axios";

import MultipleActivityIndicator from "../components/MultipleActivityIndicator";
import RoomCard from "../components/RoomCard";

export default function RoomScreen({ route }) {
    const [displayFullText, setDisplayFullText] = useState(false);
    const [isDownloading, setIsDownloading] = useState(true);
    const [room, setRoom] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
                );
                setRoom(response.data);

                setIsDownloading(false);
            } catch (error) {
                console.log("An error occured :", error.message);
            }
        };
        fetchData();
    }, []);

    /*

*/

    return (
        <View style={styles.container}>
            {isDownloading ? (
                <View style={styles.isDownloadingView}>
                    <MultipleActivityIndicator />
                </View>
            ) : (
                <>
                    <RoomCard
                        room={room}
                        imageFullScreen={true}
                        swiperFlatList={true}
                    />
                    <Text
                        style={styles.description}
                        numberOfLines={!displayFullText ? 3 : null}
                        onPress={() => {
                            setDisplayFullText(!displayFullText);
                        }}
                    >
                        {room.description}
                    </Text>
                    {Dimensions.get("window").height >= 720 && (
                        <TouchableOpacity
                            onPress={() => setDisplayFullText(!displayFullText)}
                        >
                            {displayFullText ? (
                                <View style={styles.expand}>
                                    <Text style={styles.expandBis}>
                                        Show less
                                    </Text>
                                    <MaterialIcons
                                        name="expand-less"
                                        size={16}
                                        color="grey"
                                    />
                                </View>
                            ) : (
                                <View style={styles.expand}>
                                    <Text style={styles.expandBis}>
                                        Show more
                                    </Text>
                                    <MaterialIcons
                                        name="expand-more"
                                        size={16}
                                        color="grey"
                                    />
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                    <MapView
                        // La MapView doit obligatoirement avoir des dimensions
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: room.location[1],
                            longitude: room.location[0],
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                        showsUserLocation={true}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: room.location[1],
                                longitude: room.location[0],
                            }}
                            title=""
                            description=""
                        />
                    </MapView>
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
    description: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    expand: {
        flexDirection: "row",
        marginBottom: 20,
    },
    expandBis: {
        color: "grey",
        marginLeft: 20,
    },
});
