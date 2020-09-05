import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Overlay, Input} from 'react-native-elements';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPencilAlt, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import firebase from "../utils/firebase";

export function AddNote() {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const styles = StyleSheet.create({
        add_btn: {
            backgroundColor: 'red',
            borderRadius: 50,
            width: 120,
            height: 50,
            marginRight: 15,
            marginBottom: 10,
            padding: 15
        },
        overlay: {
            padding: 20,
            width: 90 + '%',
            height: 250,
            borderRadius: 20,
        },
        btn_container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 30,
        },
        save_btn: {
            backgroundColor: 'red',
            borderRadius: 50,
            width: 90,
            height: 50,
        },
        save_container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 20,
        }
    });

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    let db = firebase.firestore();

    const sendToDB = () => {
        db.collection('notes').doc().set({
            title: title,
            content: content,
            create_uid: 'Ophélie',
            creation_date: new Date().toLocaleString('fr-FR').replace(",", "").replace(/:.. /, " ")

        }).then(() => {
            setVisible(false);
            console.log('Note created')
        }).catch((e) => {
            console.log(e)
        })
    };

    return (
        <View style={styles.btn_container}>
            <Button onPress={toggleOverlay}
                    icon={<FontAwesomeIcon icon={faPlus} color={'#fff'} size={15}/>}
                    buttonStyle={styles.add_btn} title={'Ajouter une note'} titleStyle={{marginLeft: 5}}/>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
                <View>
                    <Input placeholder='Entrez un titre' leftIcon={faPencilAlt} onChangeText={(str) => setTitle(str)}/>
                    <Input placeholder='Description...' leftIcon={faPencilAlt} onChangeText={(str) => setContent(str)}
                           multiline={true}/>
                    <View style={styles.save_container}>
                        <Button onPress={sendToDB} icon={<FontAwesomeIcon icon={faSave} size={15} color={'#fff'}/>}
                                buttonStyle={styles.save_btn} title={'Ajouter'} titleStyle={{marginLeft: 5}}/>
                    </View>
                </View>
            </Overlay>
        </View>
    );
}