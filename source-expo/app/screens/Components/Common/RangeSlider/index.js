import { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '@/config';
import { Text, RangeSlider } from '@/components';

const CommonRangeSlider = ({
  containerStyle = {},
  label = '',
  min = 1,
  max = 100,
  onValueChanged = () => {},
  ...attrs
}) => {
  const [value, setValue] = useState();
  const { colors } = useTheme();
  return (
    <View style={[containerStyle]}>
      <Text footnote bold style={{ marginBottom: 5 }}>
        {label}
      </Text>
      <View>
        <RangeSlider
          min={min}
          max={max}
          color={colors.border}
          selectionColor={colors.primary}
          disableRange={true}
          onValueChanged={(low) => {
            onValueChanged(low);
            setValue(low);
          }}
          {...attrs}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}
        >
          <Text caption1>{value}</Text>
          <Text caption1>{max}</Text>
        </View>
      </View>
    </View>
  );
};

export default CommonRangeSlider;
