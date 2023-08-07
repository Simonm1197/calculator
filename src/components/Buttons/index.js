import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
const Button = ({
  w = 0,
  h = null,
  text = '',
  backgroundColor = '#333333',
  textColor = 'white',
  onPress = () => {},
}) => {
  const height = h ?? w;
  const width = w;

  return (
    <View style={[styles.buttonContainer, {width: width, height: height}]}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: backgroundColor}]}
        onPress={() => onPress(text)}>
        <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Button;
