import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Color from '../assets/Values/Colors';

const WEATHER_ICON = 'http://openweathermap.org/img/wn/';

const months = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    fr: ["Janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
}

const days = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    fr: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
}

const max = {
    en: 'max',
    fr: 'max',
    ar: 'أقصى'
  }
  const min = {
    en: 'min',
    fr: 'min',
    ar: 'الأدنى'
  }
  

export default function Weather(props) {

    //console.log(props.data);

    const {name, sys, weather, main} = props.data;
    const temp_type = props.temp_type;

    const KtoC = temp => Math.floor(temp - 273.15);
    const KtoF = temp => Math.floor((temp - 273.15) * 9/5 + 32);

    const getTemp = temp => {
        let currentTemp;
        switch(temp_type) {
            case 'c': currentTemp = KtoC(temp) + '°C'; break;
            case 'f': currentTemp = KtoF(temp) + '°F'; break;
            case 'k': currentTemp = Math.floor(temp) + '°K'; break;
            default: break;
        }
        return currentTemp;
    }

    const dateBuilder = (d) => {

        let day = days[props.lang][d.getDay()];
        let date = d.getDate();
        let month = months[props.lang][d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
      }

    return (
        <View style={styles.container}>
            <Text  style={styles.cityCountry}>{name}, {sys.country}</Text>
            <Text style={styles.dateStyle}>{dateBuilder(new Date())}</Text>
            <Text style={styles.temp}>{getTemp(main.temp)}</Text>
            <Image 
                style={styles.image}
                source={{uri: WEATHER_ICON + weather[0].icon + '@4x.png'}}/>
            <Text style={styles.description}>{weather[0].description}</Text>
            <View style={styles.minMax}>
                <Text style={styles.max}>{max[props.lang]}: {getTemp(main.temp_max)}</Text>
                <Text style={styles.min}>{min[props.lang]}: {getTemp(main.temp_min)}</Text>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.secondary,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '100%'
      },
      cityCountry: {
        fontSize: 28,
        color: Color.primary
      },
      dateStyle: {
        color: Color.primary,
        fontSize: 16,
        fontWeight: '200'
      },
      temp: {
        fontSize: 80,
        color: Color.primary
    },
    image: {
        width: 180,
        height: 180
    },
    description: {
        fontSize: 24,
        fontWeight: '300',
        color: Color.primary
    },
    minMax: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    max: {
        fontSize: 16,
        color: Color.primary
    },
    min: {
        fontSize: 16,
        color: Color.primary
    }
});