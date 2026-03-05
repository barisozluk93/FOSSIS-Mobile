import { StyleSheet, View } from 'react-native';
import { Typography, useTheme } from '@/config';
import { Text, TextInput } from '@/components';

const Input = ({ label = '', containerStyle = {}, ...attrs }) => {
  const { colors } = useTheme();
  return (
    <View style={[{ marginTop: 10 }, containerStyle]}>
      <Text footnote bold>
        {label}
      </Text>
      <TextInput
        style={{
          marginTop: 5,
          backgroundColor: colors.background,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
          height: 35,
          ...attrs.style,
        }}
        inputStyle={Typography.footnote}
        {...attrs}
      />
    </View>
  );
};

export default Input;
