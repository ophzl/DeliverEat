import React from 'react';
import {AddNote} from "./addForm";
import {LoginForm} from "./loginForm";
import {User} from "../pages/user";
import {StyleSheet, View} from "react-native";

class Footer extends React.Component {
    render(){
        const user_nb = 0;
        const {isLoggedIn, user, addToJournal} = this.props;
        return(
            <View></View>
        )
    }
}

const styles = StyleSheet.create({
    btn_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
    }
});

export default Footer