import PropTypes from 'prop-types';
import { Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { parseHexTransparency } from '@/utils';
import { useTheme } from '@/config';

const ChartPieChart = ({ data = {} }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
      }}
    >
      <PieChart
        data={data}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          color: (_opacity = 1) => parseHexTransparency(colors.text, 30),
          labelColor: (_opacity = 1) => colors.text,
          decimalPlaces: 0,
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        // paddingLeft={"15"}
        center={[20, 0]}
        // absolute
        // hasLegend={false}
      />
    </View>
  );
};

ChartPieChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  chartConfig: PropTypes.object,
};

export default ChartPieChart;
