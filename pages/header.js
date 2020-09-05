import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import {StatusBar} from "expo-status-bar";

class Header extends React.Component {

    HeaderContent(state, props) {
        const isLoggedIn = state;
        if (isLoggedIn) {
            return (
                <View style={styles.container2}>
                    <Image style={{
                        marginLeft: 20,
                        borderRadius: 50,
                        width: 60,
                        height: 60,
                    }} source={{uri: props.avatar}}/>
                    <View style={styles.pseudo_container}>
                        <Text style={styles.pseudo}>Bonjour, {props.first_name}</Text>
                    </View>
                </View>
            )
        } else if (isLoggedIn !== true) {
            return (
                <View style={styles.container2}>
                    <View style={{
                        marginLeft: 20,
                        borderRadius: 50,
                        width: 60,
                        height: 60,
                        backgroundColor: 'red',
                    }}/>
                    <View style={styles.pseudo_container}>
                        <Text style={styles.pseudo}>Bonjour</Text>
                    </View>
                </View>
            )
        }
    }

    render() {
        const {user, isLoggedIn} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto"/>
                {this.HeaderContent(isLoggedIn, user)}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        flex: 1,
        marginBottom: 70
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
    },
    pseudo: {
        marginLeft: 10,
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
        lineHeight: 70,
    },
    pseudo_container: {
        flex: 1,
        flexDirection: 'column',
    },
    login_text: {
        marginLeft: 10,
    }
});

export default Header