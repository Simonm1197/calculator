import {Text, View, useWindowDimensions} from 'react-native';
import Button from '../Buttons';
import {useState} from 'react';
import styles from './style';
const Display = () => {
  const {width} = useWindowDimensions();
  const buttonContainerWidth = width / 4 - 5;
  const [firstValue, setFirstValue] = useState('');
  const [operator, setOperator] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [clearLabel, setClearLabel] = useState('AC');

  const onKeyPress = key => {
    switch (key) {
      case 'AC':
        setFirstValue('');
        setOperator('');
        setSecondValue('');
        break;
      case 'C':
        if (secondValue !== '') {
          setSecondValue('');
        } else {
          setFirstValue('');
        }

        setClearLabel('AC');
        break;
      case '+/-':
        if (firstValue !== '' || secondValue !== '') {
          if (firstValue !== '' && secondValue === '') {
            setFirstValue(parseFloat(firstValue * -1).toString());
          } else {
            setSecondValue(parseFloat(secondValue * -1).toString());
          }
        }
        break;
      case '%':
        calculate(firstValue, key, secondValue);
        break;
      case '/':
      case 'x':
      case '-':
      case '+':
        if (secondValue !== '') {
          calculate(firstValue, operator, secondValue);
        } else {
          setOperator(key);
        }
        break;
      case '=':
        calculate(firstValue, operator, secondValue);
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case '.':
        setClearLabel('C');
        if (operator === '') {
          setFirstValue(e => `${e}${key}`);
        } else {
          setSecondValue(e => `${e}${key}`);
        }
        break;
    }
  };

  const getDisplayText = () => {
    if (secondValue !== '') {
      return secondValue;
    }
    if (firstValue === '') {
      return '0';
    }

    return firstValue;
  };

  const calculate = (a = '', o = '', b = '') => {
    let result = 0;

    switch (o) {
      case '%':
        result = parseFloat(a) / 100;
        break;
      case '/':
        result = parseFloat(a) / parseFloat(b);
        break;
      case 'x':
        result = parseFloat(a) * parseFloat(b);
        break;
      case '-':
        result = parseFloat(a) - parseFloat(b);
        break;
      case '+':
        result = parseFloat(a) + parseFloat(b);
        break;
    }

    if (result % 1 !== 0) {
      const digitsValue = result.toString().split('.')[1];
      if (digitsValue.length > 6) {
        result = result.toFixed(6);
      }
    }

    setFirstValue(result);
    setOperator('');
    setSecondValue('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{getDisplayText()}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRow}>
          <Button
            w={buttonContainerWidth}
            text={clearLabel}
            backgroundColor={'#FFF'}
            textColor={'#000'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'+/-'}
            backgroundColor={'#FFF'}
            textColor={'#000'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'%'}
            backgroundColor={'#FFF'}
            textColor={'#000'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'/'}
            backgroundColor={'#FF9F0A'}
            onPress={key => onKeyPress(key)}
          />
        </View>
        <View style={styles.buttonsRow}>
          <Button
            w={buttonContainerWidth}
            text={'7'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'8'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'9'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'x'}
            backgroundColor={'#FF9F0A'}
            onPress={key => onKeyPress(key)}
          />
        </View>
        <View style={styles.buttonsRow}>
          <Button
            w={buttonContainerWidth}
            text={'4'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'5'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'6'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'-'}
            backgroundColor={'#FF9F0A'}
            onPress={key => onKeyPress(key)}
          />
        </View>
        <View style={styles.buttonsRow}>
          <Button
            w={buttonContainerWidth}
            text={'1'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'2'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'3'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'+'}
            backgroundColor={'#FF9F0A'}
            onPress={key => onKeyPress(key)}
          />
        </View>
        <View style={styles.buttonsRow}>
          <Button
            w={width / 2 - 10}
            h={buttonContainerWidth}
            text={'0'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'.'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'='}
            backgroundColor={'#FF9F0A'}
            onPress={key => onKeyPress(key)}
          />
        </View>
      </View>
    </View>
  );
};

export default Display;
