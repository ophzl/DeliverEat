import React, {useState} from 'react';
import {View} from "react-native";

import { SearchBar } from 'react-native-elements';


export function Search() {

    const [text, setText] = useState('');

    return(
        <View>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={(text) => setText(text)}
                lightTheme={true}
                inputContainerStyle={{
                    backgroundColor: '#eee',
                    marginLeft: 25,
                    marginRight: 25,
                }}
                platform={'ios'}
            />
        </View>
    )
}