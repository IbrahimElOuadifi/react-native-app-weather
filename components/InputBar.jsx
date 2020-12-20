import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Color from '../assets/Values/Colors';

export default function InputBar(props) {
    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
            <TextInput 
                style={styles.inputText} 
                placeholder="City Name..."
                placeholderTextColor={Color.light}
                value={props.cityName} 
                onChangeText={props.cityChange}>
            </TextInput>
            <View style={styles.imgInputHolder}><Image source={require('../assets/loupe.png')} style={styles.imgInput}/></View>
            </View>
            <View style={styles.dropDownList}>
                <Picker itemStyle={styles.dropDownItem} style={styles.dropDownItem}
                    selectedValue={props.lang}
                    style={{height: 50, width: 100}}
                    onValueChange={props.setLang}>
                    <Picker.Item label="En" value="en"/>
                    <Picker.Item label="Fr" value="fr"/>
                    <Picker.Item label="Ar" value="ar"/>
                </Picker>
                <Picker style={styles.dropDownItem}
                    selectedValue={props.temp}
                    style={{height: 50, width: 100}}
                    onValueChange={props.setTemp}>
                    <Picker.Item label="°C" value="c"/>
                    <Picker.Item label="°F" value="f"/>
                    <Picker.Item label="°K" value="k"/>
                </Picker>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        height: '30%',
        width: '100%',
        maxWidth: 500,
        justifyContent: 'space-around',
        alignItems: 'center',
        
      },
      inputGroup: {
        width: '100%',
        marginTop: '10%',
      },
      inputText: {
        paddingVertical: 8,
        paddingLeft: 20,
        paddingRight: 58,
        color: Color.primary,
        fontSize: 18,
        fontWeight: '300',
        width: '100%',
        borderRadius: 8,
        borderColor: Color.primary,
        borderWidth: 2
      },
      imgInputHolder: {
        position: 'absolute',
        justifyContent: 'center',
        height: '100%',
        right: 8,
        top: 0
      },
      imgInput: {
        width: 36,
        height: 36,
      },
      dropDownList: {
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      dropDownItem: {
        paddingHorizontal: 2,
        paddingVertical: 4,
        backgroundColor: Color.dark,
        borderRadius: 8,
        borderColor: Color.primary,
        width: 20,
        borderWidth: 2,
        color: Color.primary      }
});