import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import { BaseColor, useTheme } from '@/config';
import styles from './styles';

export default function RateDetail({
  style = {},
  point = 0,
  totalRating = 0,
  data = ['0%', '5%', '35%', '40%', '10%'],
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.contain, style]}>
      <View style={styles.contentLeft}>
        <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 10,
            backgroundColor: colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text title2 whiteColor>
            {point}
          </Text>
        </View>
        <Text caption1 grayColor style={{ paddingTop: 4 }}>
          {totalRating} {t('reviews')}
        </Text>
      </View>
      <View style={styles.containRight}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.starLeft}>
            <View style={styles.lineStar}>
              {[1, 2, 3, 4, 5].map((icon, index) => {
                return <Icon key={`star5` + index} name="star" color={BaseColor.grayColor} solid size={8} />;
              })}
            </View>
            <View style={styles.lineStar}>
              {[1, 2, 3, 4].map((icon, index) => {
                return <Icon key={`star4` + index} name="star" color={BaseColor.grayColor} solid size={8} />;
              })}
            </View>
            <View style={styles.lineStar}>
              {[1, 2, 3].map((icon, index) => {
                return <Icon key={`star3` + index} name="star" color={BaseColor.grayColor} solid size={8} />;
              })}
            </View>
            <View style={styles.lineStar}>
              {[1, 2].map((icon, index) => {
                return <Icon key={`star2` + index} name="star" color={BaseColor.grayColor} solid size={8} />;
              })}
            </View>
            <View style={styles.lineStar}>
              <Icon name="star" color={BaseColor.grayColor} solid size={8} />
            </View>
          </View>
          <View style={styles.containStatus}>
            {data.map((percent, index) => {
              return (
                <View style={styles.contentLineStatus} key={'status' + index}>
                  <View style={styles.lineStatusGray} />
                  <View
                    style={[
                      styles.lineStatusPrimary,
                      {
                        width: percent,
                        backgroundColor: colors.primary,
                      },
                    ]}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

RateDetail.propTypes = {
  style: PropTypes.object,
  point: PropTypes.number,
  totalRating: PropTypes.number,
  data: PropTypes.array,
};
