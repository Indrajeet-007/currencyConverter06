
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import { currencyByRupee } from './constants';
import CurrencyButton from './components/CurrencyButton';

function App(): React.JSX.Element {

  const [inputValue , setInputValue] = useState('');
  const [resultValue , setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (target : Currency)=>{
    if(!inputValue){
      return(Snackbar.show({
        text: "Enter a value to convert",
        backgroundColor: '#f4be2c',
        textColor: '#ffffff'
      }))
    }else{
      let inputAmount = parseFloat(inputValue)
      if(!isNaN(inputAmount)){
          const convertedAmount = inputAmount* target.value;
          const result = `${target.symbol} ${convertedAmount.toFixed(2)}` + "💸"
          setResultValue(result)
          setTargetCurrency(target.name)
      }else{
        Snackbar.show({
          text: "Not a valid Number",
          backgroundColor: '#e8092b',
          textColor:"#fff",
        })
      }
    }
  }

  return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType='number-pad'
              placeholder='Enter amount in rupees'
              style = {[styles.inputAmountField]}
            />
          </View>
          (resultValue && (
            <Text style={styles.resultTxt}>{resultValue}</Text>
          ))
        </View>
        <View style={styles.bottomContainer}>
          <FlatList 
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item})=>(
              <Pressable
                style={[styles.button , targetCurrency===item.name && styles.selected]}
                onPress={()=>buttonPressed(item)}
              >
                  <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop:90,
  },
  resultTxt: {
    marginTop:30,
    fontSize: 32,
    color: '#fff',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#fff',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderColor:'#fff',
    color:'#fff',
  },
  bottomContainer: {
    flex: 3,
    marginTop:70
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
