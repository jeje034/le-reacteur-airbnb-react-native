import React from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../assets/colors";
import { SwiperFlatList } from "react-native-swiper-flatlist";

/*
resizeMode="contain"
 <SwiperFlatList
                        autoplay
                        autoplayDelay={2}
                        autoplayLoop
                        index={2}
                        showPagination
                        data={room.photos}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.url}</Text>
                            </View>
                        )}
                    />*/

const horizontalMargin = 20;
const imageFullScreenWith = Dimensions.get("window").width;
const imageNoFullScreenWith =
    Dimensions.get("window").width - 2 * horizontalMargin;

const imageNoFullScreenHeight = (imageNoFullScreenWith / 370) * 197; //L'image à copier fait environ 370 * 197
const imageFullScreenHeight = (imageFullScreenWith / 411) * 298; //L'image à copier fait environ 411 * 298
const priceHeight = 50;

const displayStars = (ratingValue) => {
    const returnedValue = [];

    for (let i = 1; i <= 5; i++) {
        if (ratingValue >= i) {
            returnedValue.push(
                <Entypo
                    name="star"
                    size={20}
                    color={colors.yellowForStars}
                    key={i}
                />
            );
        } else {
            returnedValue.push(
                <Entypo
                    name="star"
                    size={24}
                    color={colors.lightGreyStars}
                    key={i}
                />
            );
        }
    }

    return returnedValue;
};

const RoomCard = ({ room, imageFullScreen, swiperFlatList }) => {
    const photoUrl = room.photos[0].url;
    return (
        <>
            {swiperFlatList ? (
                // Sans ajouter le view autour de SwiperFlatList, on a une larginbottom d'environ 100 sous les images !
                <View
                    style={
                        imageFullScreen
                            ? styles.roomImageFullScreen
                            : styles.roomImageNonFullScreen
                    }
                >
                    <SwiperFlatList
                        autoplay
                        autoplayDelay={3}
                        autoplayLoop
                        index={0}
                        showPagination={false}
                        data={room.photos}
                        renderItem={({ item }) => (
                            <ImageBackground
                                source={{
                                    uri: item.url,
                                }}
                                style={
                                    imageFullScreen
                                        ? styles.roomImageFullScreen
                                        : styles.roomImageNonFullScreen
                                }
                            >
                                <Text
                                    style={
                                        imageFullScreen
                                            ? [
                                                  styles.price,
                                                  styles.priceFullScreen,
                                              ]
                                            : [
                                                  styles.price,
                                                  styles.priceNoFullScreen,
                                              ]
                                    }
                                >
                                    {`${room.price} €`}
                                </Text>
                            </ImageBackground>
                        )}
                    />
                </View>
            ) : (
                <ImageBackground
                    source={{
                        uri: photoUrl,
                    }}
                    style={
                        imageFullScreen
                            ? styles.roomImageFullScreen
                            : styles.roomImageNonFullScreen
                    }
                >
                    <Text
                        style={
                            imageFullScreen
                                ? [styles.price, styles.priceFullScreen]
                                : [styles.price, styles.priceNoFullScreen]
                        }
                    >
                        {`${room.price} €`}
                    </Text>
                </ImageBackground>
            )}
            <View
                style={
                    imageFullScreen
                        ? styles.roomBottomWithHorizontalMargin
                        : styles.roomBottomWithoutHorizontalMargin
                }
            >
                <View style={styles.roomBottomLeft}>
                    <Text style={styles.title} numberOfLines={1}>
                        {room.title}
                    </Text>
                    <View style={styles.starsAndReview}>
                        {displayStars(room.ratingValue)}
                        <Text
                            style={styles.reviews}
                        >{`${room.reviews} reviews`}</Text>
                    </View>
                </View>
                <Image
                    style={styles.userPhoto}
                    source={{
                        uri: room.user.account.photo.url,
                    }}
                />
            </View>
        </>
    );
};

export default RoomCard;
const styles = StyleSheet.create({
    roomImageNonFullScreen: {
        width: imageNoFullScreenWith,
        height: imageNoFullScreenHeight,
        marginBottom: 20,
    },
    roomImageFullScreen: {
        width: imageFullScreenWith,
        height: imageFullScreenHeight,
        marginBottom: 20,
        //borderColor: "red",
        //borderWidth: 5,
    },
    price: {
        backgroundColor: "black",
        color: "white",
        width: 100,
        height: priceHeight,
        textAlign: "center",
        lineHeight: priceHeight,
        fontSize: 20,
    },
    priceNoFullScreen: {
        marginTop: imageNoFullScreenHeight - priceHeight - 10,
    },
    priceFullScreen: {
        marginTop: imageFullScreenHeight - priceHeight - 10,
    },
    roomBottomWithoutHorizontalMargin: {
        flexDirection: "row",
        marginBottom: 20,
    },
    roomBottomWithHorizontalMargin: {
        flexDirection: "row",
        marginBottom: 20,
        marginHorizontal: horizontalMargin,
    },
    roomBottomLeft: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        //backgroundColor: "red",
        color: "black",
        marginBottom: 20,
    },
    starsAndReview: {
        flexDirection: "row",
        alignItems: "center",
    },
    reviews: {
        color: colors.lightGreyReviewsAndSeparator,
        marginLeft: 7,
    },
    userPhoto: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
});
