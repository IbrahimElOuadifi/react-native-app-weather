import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Lottie from 'lottie-react-native';
import InputBar from './components/InputBar';
import Weather from './components/Weather';
import Color from './assets/Values/Colors';

// API Key = 59d4ab2b03de720047ea4fe2967f263b
// const API_URL = 'http://api.openweathermap.org/data/2.5/weather?q=rabat&appid=59d4ab2b03de720047ea4fe2967f263b&lang=en';
// const API_GEO = 'api.openweathermap.org/data/2.5/weather?lat=34.486508632191956&lon=-5.5071955778682335&appid=59d4ab2b03de720047ea4fe2967f263b';

export default function App() {

  const [city_name, setCITY] = useState('');
  const [lang_selected, setLANG] = useState("en");
  const [temp_type, setTEMP] = useState("c");
  const [data, setDATA] = useState(null);
  const [isLoading, setLoad] = useState(false);

  useEffect(() => {
    city_name === "" ? setDATA(null) : getDATA(`http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=59d4ab2b03de720047ea4fe2967f263b&lang=${lang_selected}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const getDATA = api => {
    setNULL()
    fetch(api)
    .then(res => res.json())
    .then(resp_data => {
      setLoad(false);
      setDATA(resp_data);
    });
  }

  const cityChange = text => {
    text === '' ? setLoad(false) : setLoad(true);
    setCITY(text);
  }

  const selectLANG = (itemValue, itemIndex) => {
    setLoad(true);
    setLANG(itemValue);
  }

  const selectTEMP = (itemValue, itemIndex) => {
    setTEMP(itemValue);
  }

  const onSubmit = e => {
    e.preventDefault();
  }

  const setNULL = () => {setDATA(null); setLoad(false);}

  StatusBar.setBarStyle('light-content', true);
  StatusBar.setBackgroundColor(Color.primary, true);

  return (
    <View style={styles.container}>
      <InputBar 
        submit={onSubmit} 
        cityChange={cityChange} 
        cityName={city_name} 
        setLang={selectLANG} 
        setTemp={selectTEMP} 
        lang={lang_selected} 
        temp={temp_type}/>
      <View style={styles.WeatherBox}>
        {
          city_name === '' ?
            <Text style={styles.textStyle}>Enter city name !</Text> 
          :
            isLoading || data === null ?
              <Lottie source={require('./assets/loading.json')} autoPlay loop/>
            :
                data.cod === 200 ?
                  <Weather data={data} temp_type={temp_type} lang={lang_selected}/>
                :
                  <Text style={styles.textStyle}>{data.message}</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 36,
    width: '100%',
    height: '100%'
  },
  WeatherBox: {
    backgroundColor: Color.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '70%'
  },
  textStyle: {
    fontSize: 36,
    fontWeight: '300',
    color: Color.primary
  }
});