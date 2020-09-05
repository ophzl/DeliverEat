import React, {useState} from 'react';
import {Text, StyleSheet, View} from "react-native";
import {Button} from "react-native-elements";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import firebase from "../utils/firebase";

import {Snackbar} from 'react-native-paper'

// import {EditNote} from "./editForm";

export function Product({product, isLoggedIn, uidLogged}) {

    const db = firebase.firestore();

    const [visible, setVisible] = React.useState(false);

    const onDismissSnackBar = () => setVisible(false);

    const handleAddToCart = () => {
        if (isLoggedIn) {
            if (product.qty_left > 0) {
                db.collection('users').doc(uidLogged.id).collection('cart').doc().set({
                    name: product.name,
                    price: product.price,
                    qty: 1
                }).then(() => {
                    setVisible(true)
                }).catch((e) => {
                    console.log(e)
                })
            } else {
                alert('La quantité pour le produit demandé est épuisée.')
            }
        } else {
            alert('Vous devez être identifié pour passer commande.')
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.data_container}>
                <View style={styles.title_container}>
                    <Text style={styles.title}>{product.name}</Text>
                    {/*<EditNote title={name} content={content}/>*/}
                </View>
                <Text style={styles.content}>{product.price}€</Text>
                <View style={styles.btn_container}>
                    <Button icon={<FontAwesomeIcon icon={faPlus} color={'green'} size={20}/>}
                            buttonStyle={styles.add_to_cart_btn} onPress={handleAddToCart}/>
                </View>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    duration={1000}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            setVisible(false)
                        },
                    }}>
                    Produit ajouté à votre panier.
                </Snackbar>
            </View>
        </View>
    );

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

export default Product