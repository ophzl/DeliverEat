import React from 'react';

import {StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

import firebase from "../utils/firebase";

export function CartElement({name, qty, price, id, uid_logged, actualPrice, setPrice}) {

    const db = firebase.firestore();

    const deleteItemFromCart = () => {
        db.collection('users').doc(uid_logged).collection('cart').doc(id).delete().then(() => {
            console.log('Deleted');
            let new_price = actualPrice - price;
            setPrice(new_price)
        })
    };

    return(
        <View style={styles.container}>
            <View style={styles.data_container}>
                <View style={styles.title_container}>
                    <Text style={styles.title}>{name}</Text>
                </View>
                <Text style={styles.content}>{price}€</Text>
                <View style={styles.btn_container}>
                    <Button icon={<FontAwesomeIcon icon={faTrash} color={'gray'} size={20}/>}
                            buttonStyle={styles.add_to_cart_btn} onPress={deleteItemFromCart}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        shadowColor: '#ccc',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 20,
    },
    data_container: {
        flexDirection: 'column',
        flex: 1,
    },
    title: {
        color: 'red',
        fontSize: 25,
        fontWeight: 'bold',
        width: 70 + '%',
    },
    content: {
        paddingTop: 10
    },
    create_uid_container: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end'
    },
    title_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    add_to_cart_btn: {
        backgroundColor: null,
    },
    btn_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});