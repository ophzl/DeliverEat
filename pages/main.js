import React, {useEffect, useState} from 'react'

import Header from "./header";
import Product from "./product";
import {AddNote} from "../components/addForm";
import {LoginForm} from "../components/loginForm";
import {View, FlatList, StyleSheet, ScrollView} from "react-native";
import {Search} from "../components/search";
import {User} from "./user";
import {Cart} from "./cart";
import firebase from "../utils/firebase";

export function Main() {

    let db = firebase.firestore();
    const auth = firebase.auth();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uidLogged, setUidLogged] = useState(null);
    const [productList, setProductList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        db.collection('products').onSnapshot((querySnapshot) => {
            let _tmpList = [];

            querySnapshot.forEach((doc) => {
                _tmpList.push({...doc.data(), id: doc.id})
            });

            setProductList(_tmpList)
        });

        db.collection('users').onSnapshot((querySnapshot) => {
            let _tmpList = [];

            querySnapshot.forEach((doc) => {
                _tmpList.push({...doc.data(), id: doc.id})
            });

            setUsers(_tmpList)
        });

        auth.onAuthStateChanged(userAuth => {
            if (isLoggedIn) {
                db.collection('users').doc(userAuth.uid).get().then((doc) => {
                    setUidLogged(doc.data());
                    setIsLoggedIn(true);

                })
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Header user={uidLogged} isLoggedIn={isLoggedIn}/>
                <Search/>
                <View>
                    <FlatList data={productList} keyExtractor={(item) => item.id}
                              renderItem={({item}) => <Product product={item} isLoggedIn={isLoggedIn} uidLogged={uidLogged}/>}/>
                </View>
            </View>
            <View style={styles.btn_container}>
                {/*<AddNote/>*/}
                <Cart uid_logged={uidLogged}/>
                {!isLoggedIn ? <LoginForm /> : <User setIsLoggedIn={isLoggedIn} setUidLogged={setUidLogged}/>}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btn_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
    }
});

export default Main