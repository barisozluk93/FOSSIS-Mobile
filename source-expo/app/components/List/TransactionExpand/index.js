import { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/config';
import Text from '@/components/Text';
import ListTransaction from '@/components/List/Transaction';
import styles from './styles';

const TransactionExpand = ({
  style = {},
  tradingPairTitle = '',
  tradingPairValue = '',
  priceTitle = '',
  price = '',
  feeTitle = '',
  feeValue = '',
  costTitle = '',
  costValue = '',
  changeTitle = '',
  changeValue = '',
  currentTitle = '',
  currentValue = '',
  ListTransactionProps = {},
  isExpandInit = false,
}) => {
  const { colors } = useTheme();
  const [isExpand, setIsExpand] = useState(isExpandInit);

  return (
    <View style={style}>
      <ListTransaction
        style={StyleSheet.flatten([
          {
            borderBottomWidth: 1,
            paddingBottom: 1,
            borderBottomColor: colors.background,
          },
          !isExpand && {
            borderBottomWidth: 1,
            paddingBottom: 1,
            borderBottomColor: colors.border,
          },
        ])}
        {...ListTransactionProps}
        onPress={() => setIsExpand(!isExpand)}
      />
      {isExpand && (
        <View
          style={StyleSheet.flatten([
            { paddingBottom: 20 },
            isExpand && {
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            },
          ])}
        >
          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                {tradingPairTitle}
              </Text>
              <Text headline>{tradingPairValue}</Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                {priceTitle}
              </Text>
              <Text headline>{price}</Text>
            </View>
          </View>

          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                {feeTitle}
              </Text>
              <Text headline>{feeValue}</Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                {costTitle}
              </Text>
              <Text headline>{costValue}</Text>
            </View>
          </View>
          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                {changeTitle}
              </Text>
              <Text headline>{changeValue}</Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                {currentTitle}
              </Text>
              <Text headline>{currentValue}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

TransactionExpand.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  tradingPairTitle: PropTypes.string,
  tradingPairValue: PropTypes.string,
  priceTitle: PropTypes.string,
  price: PropTypes.string,
  feeTitle: PropTypes.string,
  feeValue: PropTypes.string,
  costTitle: PropTypes.string,
  costValue: PropTypes.string,
  changeTitle: PropTypes.string,
  changeValue: PropTypes.string,
  currentTitle: PropTypes.string,
  currentValue: PropTypes.string,
};

export default TransactionExpand;
