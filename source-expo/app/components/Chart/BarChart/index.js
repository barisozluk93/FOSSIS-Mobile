import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useTheme } from '@/config';

const ChartBarChart = ({ data = {} }) => {
  const { colors } = useTheme();
  return (
    <BarChart
      data={data}
      width={Dimensions.get('window').width} // from react-native
      height={220}
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        // // barPercentage: 1,
        propsForBackgroundLines: {
          strokeWidth: 0.5,
          stroke: colors.border,
          x: 50,
        },
        propsForLabels: {
          color: 'red',
        },
        backgroundGradientToOpacity: 0.5,
        color: (_opacity = 1) => colors.primary,
        labelColor: (_opacity = 1) => colors.text,
        barPercentage: 0.8,
        // useShadowColorFromDataset: true, // optional
      }}
      style={{
        marginHorizontal: 0,
        marginVertical: 8,
        // borderRadius: 16,
      }}
      yAxisLabel="$"
      showBarTops={false}
      showValuesOnTopOfBars={false}
      withVerticalLabels
      withInnerLines
      fromZero
      // horizontalLabelRotation={20}
    />
  );
};

ChartBarChart.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func,
};

export default ChartBarChart;
