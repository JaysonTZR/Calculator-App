import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isOperatorPressed, setIsOperatorPressed] = useState('');

  const hasNumberAfterEveryOperator = (input) => {
    const regex = /[+\-*/]\d+/g;
    const matches = input.match(regex);
    const operatorCount = (input.match(/[+\-*/]/g) || []).length;
    return matches && matches.length === operatorCount;
  };

  // const hasNumberBehindOperators = (input) => {
  //   const regex = /[+\-*/]\d+/;
  //   return regex.test(input);
  // };

  // const hasOperator = (input) => {
  //   const regex = /[+\-*\/]/;
  //   return regex.test(input);
  // };

  // const getLastNumberWithOperator = (input) => {
  //   const regex = /[-+*/]\d+(\.\d+)?$/;
  //   const match = input.match(regex);
  //   return match ? match[0] : null;
  // };

  // const splitLastNumberWithOperator = (lastNumberWithOperator) => {
  //   const regex = /([-+*/])(\d+(\.\d+)?)/;
  //   const match = lastNumberWithOperator.match(regex);
  //   const operator = match[1];
  //   const number = match[2];
  //   return { operator, number };
  // };

  // const removeLastNumberWithOperator = (input, lastNumberWithOperator) => {
  //   const escapedOperator = lastNumberWithOperator.operator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  //   const regex = new RegExp(`${escapedOperator}${lastNumberWithOperator.number}$`);
  //   const newInput = input.replace(regex, '');
  //   return newInput;
  // };

  const onButtonPress = (value) => {
    setIsOperatorPressed('');
    
    if (['+', '-', 'x', '÷'].includes(value)) {
      setIsOperatorPressed(value);
    }
    
    if (value === 'AC') {
      setResult('');
      setInput('');
    } else if (value === '+/-') {
      // let newInputValue = '';
      // if (input == '') {
      //   newInputValue = '-0'
      // } else {
      //     if (hasOperator(input)) {
      //       const operatorCount = (input.match(/[+\-*/]/g) || []).length;
      //       if (operatorCount == 1) {
      //         newInputValue = (-parseFloat(input)).toString();
      //       } else {
      //         if (hasNumberBehindOperators(input)) {
      //           if (hasNumberAfterEveryOperator(input)) {
      //             const lastNumberWithOperator = getLastNumberWithOperator(input);
      //             const { operator, number } = splitLastNumberWithOperator(lastNumberWithOperator);
      //             const lastNumber = { operator: operator, number: number };
      //             const newInput = removeLastNumberWithOperator(input, lastNumber);
      //             if (operator == '-' || operator == '+') {
      //               if (operator == '-') {
      //                 newInputValue = newInput + '+' + number;
      //               } else {
      //                 newInputValue = newInput + '-' + number;
      //               }
      //             } else {
      //               newInputValue = newInput + (-parseFloat(lastNumberWithOperator)).toString();
      //             }
      //           }
      //         }
      //       }
      //     } else {
      //       newInputValue = (-parseFloat(input)).toString();
      //     }
      // }

      // setResult(newInputValue);
      // setInput(newInputValue);
    } else if (value === '%') {
      if (input != '' && !['+', '-', '*', '/'].includes(input[input.length - 1])) {
        const lastNumber = input.split(/[-+*/]/).pop();
        const withoutLastNumber = input.slice(0, input.length - lastNumber.length);
        const percentageLastNumber = (parseFloat(lastNumber) / 100).toString();
        setResult(percentageLastNumber);
        setInput(withoutLastNumber + percentageLastNumber);
      } else if (input != '' && ['+', '-', '*', '/'].includes(input[input.length - 1])) {
        const numbers = input.split(/[-+*/]/);
        const lastNumber = numbers.pop();
        const firstNumber = numbers.pop() || '';
        const percentageFirstNumber = (firstNumber * firstNumber) / 100;
        setResult(percentageFirstNumber);
        setInput(input + percentageFirstNumber);
      }
    } else if (value === '÷') {
      if (input != '' && !['+', '-', '*', '/'].includes(input[input.length - 1])) {
        const newValue = eval(input);
        setResult(newValue);
        setInput(newValue + '/');
      } else if (input != '' && ['+', '-', '*', '/'].includes(input[input.length - 1])) {
        const parts = input.split(/[-+*/]/);
        setResult(parts[0]);
        setInput(parts[0] + '/');
      }
    } else if (value === 'x') {
      if (input != '' && !['+', '-', '*', '/'].includes(input[input.length - 1])) {
        const newValue = eval(input);
        setResult(newValue);
        setInput(newValue + '*');
      } else if (input != '' && ['+', '-', '*', '/'].includes(input[input.length - 1])) {
        const parts = input.split(/[-+*/]/);
        setResult(parts[0]);
        setInput(parts[0] + '*');
      }
    } else if (value === '-') {
      if (input != '' && !['+', '-', '*', '/'].includes(input[input.length - 1])) {
        const newValue = eval(input);
        setResult(newValue);
        setInput(newValue + value);
      } else if (input != '' && ['+', '-', '*', '/'].includes(input[input.length - 1])) {
        const parts = input.split(/[-+*/]/);
        setResult(parts[0]);
        setInput(parts[0] + '-');
      } else if (input == '') {
        setInput(input + '-');
      }
    } else if (value === '+') {
      if (input != '' && !['+', '-', '*', '/'].includes(input[input.length - 1])) {
        const newValue = eval(input);
        setResult(newValue);
        setInput(newValue + value);
      } else if (input != '' && ['+', '-', '*', '/'].includes(input[input.length - 1])) {
        const parts = input.split(/[-+*/]/);
        setResult(parts[0]);
        setInput(parts[0] + '+');
      }
    } else if (value === '=') {
      if (input != '') {
        if (hasNumberAfterEveryOperator(input)) {
          setResult(eval(input));
          setInput('');
        }
      }
    } else if (value === '.') {
      const lastCharIsNumber = /\d/.test(input[input.length - 1]);
      const lastNumberContainsDecimal = input.split(/[-+*/]/).pop().includes('.');
      if (lastCharIsNumber && !lastNumberContainsDecimal) {
        setResult(result + '.');
        setInput(input + '.');
      }
    } else {
      const lastCharIsNumberOrPeriod = /[\d.]/.test(input[input.length - 1]);
      if (lastCharIsNumberOrPeriod) {
        setResult(result + value);
      } else {
        setResult(value);
      }
      setInput(input + value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.resultContainer}>
        <Text
          style={styles.resultText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {result !== '' ? result : '0'}
        </Text>
      </View>
      {/* <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputText}
          value={input}
          onChangeText={setInput}
          keyboardType='numeric'
        />
      </View> */}
      <View style={styles.buttonContainer}>
        {['AC', '%', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map(
          (item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                item === '0' ? { width: '45%' } : null,
                item === 'AC' ? { width: '45%' } : null,
                index < 2 ? { backgroundColor: '#888' } : null,
                [2, 6, 10, 14, 17].includes(index) ? { backgroundColor: 'orange' } : null,
                ![0, 1, 2, 6, 10, 14, 17].includes(index) ? { backgroundColor: '#333' } : null,
                isOperatorPressed === item ? { backgroundColor: '#ffbf00' } : null
              ]}
              onPress={() => onButtonPress(item)}
            >
              <Text 
                style={[
                  styles.buttonText,
                  index < 2 ? { color: '#000' } : null,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  resultContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 180
  },
  resultText: {
    fontSize: 54,
    color: '#fff',
    padding: 10
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  inputText: {
    fontSize: 30,
    color: '#fff'
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '15%'
  },
  button: {
    fontSize: 24,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 40,
    margin: 7.5
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  }
});
