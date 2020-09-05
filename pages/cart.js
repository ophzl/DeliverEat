import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button, Overlay} from "react-native-elements";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";

import firebase from "../utils/firebase";
import {CartElement} from "../components/cartElement";

import {Snackbar} from 'react-native-paper'

import moment from "moment";

export function Cart({uid_logged}) {
    const styles = StyleSheet.create({
        form_container: {
            flex: 1,
            justifyContent: 'center',
            // alignItems: 'center',
            padding: 20
        },
        submit_btn: {
            backgroundColor: 'red',
            borderRadius: 10,
            padding: 15,
        },
        title: {
            fontSize: 30,
            color: 'red',
            fontWeight: 'bold',
            paddingBottom: 20,
        },
        login_btn: {
            backgroundColor: 'red',
            borderRadius: 50,
            width: 120,
            height: 50,
            marginLeft: 13,
            marginBottom: 10,
            padding: 10
        },
        overlay: {
            padding: 20,
            width: 90 + '%',
            height: 80 + '%',
            borderRadius: 20,
        },
        btn_container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            padding: 30,
        },
        command_btn: {
            backgroundColor: 'red',
            borderRadius: 50,
            width: 120,
            height: 50,
            marginLeft: 13,
            marginBottom: 10,
            padding: 10
        },
        btn_container_command: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 20,
        },
        total_price: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            // fontWeight: 'bold',
            // fontSize: 20,
            paddingRight: 30
        },
        total_container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 10,
        },
        list_container: {
            height: 85 + '%'
        }
    });

    const db = firebase.firestore();
    const [cartList, setCartList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [overlayVisible, setOverlayVisible] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    useEffect(() => {
        if (overlayVisible) {
            if (uid_logged) {
                db.collection('users').doc(uid_logged.id).collection('cart').onSnapshot((querySnapshot) => {
                    let _tmpList = [];

                    querySnapshot.forEach((doc) => {
                        _tmpList.push({...doc.data(), id: doc.id})
                    });

                    setCartList(_tmpList);
                });
            }
            let _totalPrice = 0;
            cartList.forEach((key, val) => {
                _totalPrice += parseFloat(key.price);
            });
            setTotalPrice(_totalPrice);
        }
    }, [overlayVisible]);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    let command_time = moment().add(10, "minutes");

    const command = () => {
        setSnackbarVisible(true);
        setCartList([]);
        setTotalPrice(0);
        cartList.forEach((key, val) => {
            db.collection('users').doc(uid_logged.id).collection('cart').doc(key.id).delete().then(() => {
                console.log('Deleted')
            })
        })
    };

    console.log(command_time.format('HH:mm'))

    const onDismissSnackBar = () => setSnackbarVisible(false);

    return (
        <View style={styles.btn_container}>
            <Button onPress={toggleOverlay}
                    icon={<FontAwesomeIcon icon={faCartPlus} color={'#fff'} size={15}/>}
                    buttonStyle={styles.login_btn} title={'Mon panier'} titleStyle={{marginLeft: 5}}/>
            <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
                <View style={styles.list_container}>
                    <FlatList data={cartList} keyExtractor={(item) => item.id}
                              renderItem={({item}) => <CartElement name={item.name} qty={item.qty}
                                                                   price={item.price} id={item.id}
                                                                   uid_logged={uid_logged.id} actualPrice={totalPrice} setPrice={setTotalPrice}/>}/>
                </View>
                <View style={styles.btn_container_command}>
                    <Text style={{marginBottom: 10, marginRight: 20, fontWeight: 'bold'}}>Total TTC : {totalPrice}€</Text>
                    <Button onPress={command} title={'Commander'} buttonStyle={styles.command_btn}/>
                </View>
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            setSnackbarVisible(false)
                        },
                    }}>
                    Votre commande a été enregistrée. Elle sera prête à {command_time.format('HH:mm')}
                </Snackbar>
            </Overlay>
        </View>
    )
}