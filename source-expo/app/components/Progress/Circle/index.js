import { View } from 'react-native';
import { useTheme, BaseColor } from '@/config';
import Text from '@/components/Text';
import CircularProgress from './CircularProgress';

const ProgressCircle = ({ percent = 0, size = 60, borderWidth = 5, style = {} }) => {
  const { colors } = useTheme();
  return (
    <View style={style}>
      <CircularProgress
        percentage={percent}
        progressWidth={size / 2 - borderWidth}
        size={size}
        blankColor={BaseColor.text}
        donutColor={colors.primaryLight}
        fillColor={colors.background}
      >
        <Text headline>{percent}%</Text>
      </CircularProgress>
    </View>
  );
};

export default ProgressCircle;
