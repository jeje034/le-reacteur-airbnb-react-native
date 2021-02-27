import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

import MultipleActivityIndicator from "../components/MultipleActivityIndicator";

export default function AroundMeScreen({ route }) {
    const [isLoading, setIsLoading] = useState(true);
    const [coords, setCoords] = useState();
    const [rooms, setRooms] = useState([]);

    console.log("auround me deb");

    useEffect(() => {
        const fetchData = async () => {
            let newCoords;
            let hasPermission = false;
            try {
                const { status } = await Location.requestPermissionsAsync();
                if (status === "granted") {
                    let location = await Location.getCurrentPositionAsync({});
                    newCoords = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    };
                    setCoords(newCoords);
                    hasPermission = true;
                }
                let url = `https://express-airbnb-api.herokuapp.com/rooms/around`;

                if (hasPermission) {
                    url += `?latitude=${newCoords.latitude}&longitude=${newCoords.longitude}`;
                }
                const response = await axios.get(url);
                setRooms(response.data);
                if (!hasPermission) {
                    setCoords({
                        latitude: response.data[0].location[1],
                        longitude: response.data[0].location[0],
                    });
                }

                setIsLoading(false);
            } catch (error) {
                console.log("An error occured :", error.message);
            }
        };

        fetchData();
    }, []);

    /*
  <MapView.Marker
                            coordinate={{
                                latitude: coords.latitude,
                                longitude: coords.longitude,
                            }}
                            title="titleJ"
                            description="descriptionJ"
                        />

*/

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.isDownloadingView}>
                    <MultipleActivityIndicator />
                </View>
            ) : (
                <>
                    <MapView
                        // La MapView doit obligatoirement avoir des dimensions
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2,
                        }}
                        showsUserLocation={true}
                    >
                        {rooms.map((room) => {
                            return (
                                <MapView.Marker
                                    key={room._id}
                                    coordinate={{
                                        latitude: room.location[1],
                                        longitude: room.location[0],
                                    }}
                                    title={room.title}
                                    description={room.description}
                                />
                            );
                        })}
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
    },
});
