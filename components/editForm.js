import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Overlay, Input} from 'react-native-elements';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";

export function EditNote(title, content) {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <View style={styles.icons_container}>
            <Button onPress={toggleOverlay}
                    icon={<FontAwesomeIcon icon={faPencilAlt} color={'#aaa'} size={15}
                                           style={{marginRight: 10}}/>}
                    buttonStyle={styles.icon_btn}/>
            <Button onPress={() => console.log('Delete')}
                    icon={<FontAwesomeIcon icon={faTrash} color={'#aaa'} size={15}/>}
                    buttonStyle={styles.icon_btn}/>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
                <Input placeholder='Titre...' leftIcon={faPencilAlt} errorStyle={{color: 'red'}} errorMessage='Veuillez entrer un titre'/>
            </Overlay>
        </View>
    );
};

const styles = StyleSheet.create({
    icons_container: {
        flexDirection: 'row',
    },
    icon_btn: {
        backgroundColor: null
    },
    overlay: {
        width: 90 + '%',
        height: 30 + '%'
    }
})