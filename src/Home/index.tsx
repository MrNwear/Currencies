import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  View,
  Dimensions,
} from 'react-native';
import styles from './style';
import axios from 'axios';
import RBSheet from '@lunalee/react-native-raw-bottom-sheet';
import ListItems from '../Components/ListItems';
import {exchangeRates} from '../utils/constants';
import {calculateDates} from '../utils/helperFunctions';
import {LineChart} from 'react-native-chart-kit';

const Home = () => {
  const [countries, setCountries] = React.useState<any>([]);
  const [selectedCountry, setSelectedCountry] = React.useState<any>({});
  const [selectedCurrency, setSelectedCurrency] = React.useState<any>({});
  const [selectedRate, setSelectedRate] = React.useState(7);
  const countriesRef = React.useRef<RBSheet>();
  const currencyRef = React.useRef<RBSheet>();
  const fetchRateData = (days: any) => {
    const params = calculateDates(days);
    axios
      .get('https://api.fastforex.io/time-series', {
        params: {
          api_key: '4709791196-0d6dc1acbd-s81mj8',
          from: 'EGP',
          to: 'USD',
          ...params,
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const onSelectCountry = (item: any) => {
    setSelectedCountry(item);
    countriesRef.current?.close();
  };
  const onSelectCurrency = (item: any) => {
    setSelectedCurrency(item);
    currencyRef.current?.close();
  };
  React.useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then(Response => {
      setCountries(Response.data);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          countriesRef.current?.open();
        }}>
        <Text>Country :</Text>
        <Text style={styles.value}>
          {selectedCountry?.name
            ? selectedCountry?.name +
              '(' +
              selectedCountry?.currencies[0]?.name +
              ')'
            : 'Select Country'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (selectedCountry.name) {
            currencyRef.current?.open();
          } else {
            Alert.alert('', 'You need to select country first !');
          }
        }}>
        <Text>Exchange Currency :</Text>
        <Text style={styles.value}>
          {selectedCurrency?.name
            ? selectedCurrency?.name +
              '(' +
              selectedCurrency?.currencies[0]?.name +
              ')'
            : 'Select Currency'}
        </Text>
      </TouchableOpacity>
      <View style={styles.ratesWrapper}>
        {exchangeRates.map(item => {
          return (
            <TouchableOpacity
              key={item.value}
              style={[styles.rateButton(item.value === selectedRate)]}
              onPress={() => {
                setSelectedRate(item.value);
                fetchRateData(item.value);
              }}>
              <Text style={styles.rateText}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 40} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <RBSheet
        ref={countriesRef}
        height={400}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <ListItems data={countries} itemFunc={onSelectCountry} />
      </RBSheet>
      <RBSheet
        ref={currencyRef}
        height={400}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <ListItems data={countries} itemFunc={onSelectCurrency} />
      </RBSheet>
    </SafeAreaView>
  );
};

export default Home;
