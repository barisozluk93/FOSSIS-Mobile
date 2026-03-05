import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { I18nManager, TextInput, View } from 'react-native';
import { BaseColor, BaseStyle, useFont, useTheme } from '@/config';

const Index = forwardRef((props, ref) => {
  const font = useFont();
  const { colors } = useTheme();
  const cardColor = colors.card;
  const {
    style = {},
    onChangeText = () => {},
    onFocus = () => {},
    placeholder = 'Placeholder',
    value = '',
    success = true,
    secureTextEntry = false,
    keyboardType = 'default',
    multiline = false,
    textAlignVertical = 'center',
    icon = null,
    iconLeft = null,
    onSubmitEditing = () => {},
    inputStyle = {},
    ...attrs
  } = props;
  return (
    <View style={[BaseStyle.textInput, { backgroundColor: cardColor }, style]}>
      {iconLeft}
      <TextInput
        ref={ref}
        style={[
          {
            fontFamily: `${font}-Regular`,
            flex: 1,
            height: '100%',
            textAlign: I18nManager.isRTL ? 'right' : 'auto',
            color: colors.text,
            paddingTop: 5,
            paddingBottom: 5,
          },
          inputStyle,
        ]}
        onChangeText={(text) => onChangeText(text)}
        onFocus={() => onFocus()}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={success ? BaseColor.grayColor : colors.primary}
        secureTextEntry={secureTextEntry}
        value={value}
        selectionColor={colors.primary}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        {...attrs}
      />
      {icon}
    </View>
  );
});

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  success: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  icon: PropTypes.node,
  iconLeft: PropTypes.node,
  onSubmitEditing: PropTypes.func,
  inputStyle: PropTypes.object,
};

export default Index;
