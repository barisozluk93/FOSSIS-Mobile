import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import { useTheme } from '@/config';

const ChartStackedBarChart = ({ data = {} }) => {
  const { colors } = useTheme();
  return (
    <StackedBarChart
      data={data}
      width={Dimensions.get('window').width}
      height={220}
      chartConfig={{
        backgroundColor: colors.background,
        backgroundGradientFrom: colors.background,
        backgroundGradientTo: colors.background,
        propsForBackgroundLines: {
          strokeWidth: 0.5,
          stroke: colors.border,
        },
        propsForHorizontalLabels: {
          color: 'red',
          dx: '10 0',
        },
        propsForLabels: {
          dx: '3 0',
        },
        backgroundGradientToOpacity: 0.5,
        color: (_opacity = 1) => colors.primary,
        labelColor: (_opacity = 1) => colors.text,
      }}
      yAxisLabel="$"
      style={{
        marginBottom: 0,
      }}
    />
  );
};

ChartStackedBarChart.propTypes = {
  data: PropTypes.object,
};

export default ChartStackedBarChart;
