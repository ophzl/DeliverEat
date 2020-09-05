import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Header from "./header";
import {Button} from "react-native-elements";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

import firebase from "../utils/firebase";
import {Snackbar} from "react-native-paper";

export function User(setIsLoggedIn, setUidLogged) {

    const auth = firebase.auth()

    const styles = StyleSheet.create({
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
                height: 300,
                borderRadius: 20,
            },
            btn_container: {
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                padding: 30,
            }
        }
    )

    // set overlay visibility
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [page, setPage] = useState();
    const [visible, setVisible] = React.useState(false);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    // const logOut = () => {
    //     auth.signOut().then(() => {
    //         console.log('Disconnected')
    //         setUidLogged(null)
    //         setIsLoggedIn(false)
    //     }).catch((e) => {
    //         console.log(e)
    //     })
    // };

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.btn_container}>
            <Button
                    icon={<FontAwesomeIcon icon={faUser} color={'#fff'} size={15}/>}
                    buttonStyle={styles.login_btn} title={'Se déconnecter'} titleStyle={{marginLeft: 5}}/>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        setVisible(false)
                    },
                }}>
                A venir...
            </Snackbar>
        </View>
    )
}

export default User