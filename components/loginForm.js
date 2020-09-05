import React, {useState} from 'react';
import {Input, Button, Overlay} from 'react-native-elements'

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser, faLock} from "@fortawesome/free-solid-svg-icons";
import {View, StyleSheet, Text} from "react-native";
import {Snackbar} from 'react-native-paper'

import firebase from '../utils/firebase'

export function LoginForm() {

    const auth = firebase.auth()

    const styles = StyleSheet.create({
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
            height: 300,
            borderRadius: 20,
        },
        btn_container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            padding: 30,
        }
    });

    // set snackbar visibility
    const [visible, setVisible] = React.useState(false);
    // set email
    const [email, setEmail] = useState('');
    // set password
    const [password, setPassword] = useState('');
    // set msg in snackbar
    const [msg, setMsg] = useState('');
    // set overlay visibility
    const [overlayVisible, setOverlayVisible] = useState(false);
    // check if there are errors in email
    const [hasEmailError, setHasEmailError] = useState(false);
    // check if there are errors in password
    const [hasPasswordError, setHasPasswordError] = useState(false);

    const onDismissSnackBar = () => setVisible(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return re.test(password);
    };

    const checkEmail = () => {
        if (!validateEmail(email)) {
            setHasEmailError(true);
        } else {
            setHasEmailError(false);
        }
    };

    const checkPassword = () => {
        if (!validatePassword(password)) {
            setHasPasswordError(true);
        } else {
            setHasPasswordError(false);
        }
    };

    const checkValues = () => {
            auth.signInWithEmailAndPassword(email, password).then((data) => {
                // console.log(data);
                setOverlayVisible(!overlayVisible);
            }).catch((e) => {
                console.log(e);
                setVisible(true);
            });
        };

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    return (
        <View style={styles.btn_container}>
            <Button onPress={toggleOverlay}
                    icon={<FontAwesomeIcon icon={faUser} color={'#fff'} size={15}/>}
                    buttonStyle={styles.login_btn} title={'Se connecter'} titleStyle={{marginLeft: 5}}/>
            <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
                <View>
                    <Text style={styles.title}>Se connecter</Text>
                    <Input placeholder='Adresse e-mail'
                           autoCompleteType={'email'}
                           leftIcon={<FontAwesomeIcon icon={faUser}/>}
                           onChangeText={(email) => setEmail(email)}
                           onKeyPress={checkEmail}
                           autoCorrect={false}
                           autoCapitalize={"none"}
                           // errorMessage={(hasEmailError && email !== '') && 'L\'adresse entrée est incorrecte.'}
                    />
                    <Input placeholder="Password"
                           secureTextEntry={true}
                           leftIcon={<FontAwesomeIcon icon={faLock}/>}
                           onChangeText={(password) => setPassword(password)}
                           onKeyPress={checkPassword}
                           // errorMessage={[(hasPasswordError && password !== '') && 'Le mot de passe doit contenir au moins un chiffre, une lettre majuscule, une lettre minuscule, un caractère spécial et faire au moins 8 caractères.']}
                        />
                    <Button buttonStyle={styles.submit_btn}
                            title={'Se connecter'}
                            onPress={checkValues}/>
                    <Snackbar
                        visible={visible}
                        onDismiss={onDismissSnackBar}
                        action={{
                            label: 'Undo',
                            onPress: () => {
                                setVisible(false)
                            },
                        }}>
                        Vos identifiants sont incorrects.
                    </Snackbar>
                </View>
            </Overlay>
        </View>
    )
}