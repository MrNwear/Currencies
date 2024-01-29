import * as React from 'react';
import {Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import styles from './style';
import axios from 'axios';
import RBSheet from '@lunalee/react-native-raw-bottom-sheet';
import ListItems from '../Components/ListItems';

const Home = () => {
  const [countries, setCountries] = React.useState<any>([]);
  const [selectedCountry, setSelectedCountry] = React.useState<any>({});
  const [selectedCurrency, setSelectedCurrency] = React.useState<any>({});
  const countriesRef = React.useRef<RBSheet>();
  const currencyRef = React.useRef<RBSheet>();
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
