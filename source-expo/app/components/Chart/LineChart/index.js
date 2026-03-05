import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { parseHexTransparency } from '@/utils';
import { useTheme } from '@/config';

const ChartLineChart = ({ data = {}, chartConfig = {} }) => {
  const { colors } = useTheme();
  return (
    <LineChart
      data={data}
      width={Dimensions.get('window').width - 40} // from react-native
      height={220}
      yAxisLabel="$"
      // yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        style: {
          borderRadius: 16,
        },
        backgroundColor: colors.background,
        backgroundGradientFrom: colors.background,
        backgroundGradientTo: colors.background,
        color: (_opacity = 1) => parseHexTransparency(colors.text, 10),
        labelColor: (_opacity = 1) => colors.text,
        decimalPlaces: 0,
        paddingLeft: 0,
        ...chartConfig,
      }}
      // bezier
      style={{
        paddingRight: 50,
        paddingLeft: 0,
        marginHorizontal: 0,
        marginVertical: 8,
      }}
      withVerticalLines={false}
      // withHorizontalLines={false}
      withDots={false}
      paddingLeft={'15'}
    />
  );
};

ChartLineChart.propTypes = {
  data: PropTypes.object,
  chartConfig: PropTypes.object,
};

export default ChartLineChart;
