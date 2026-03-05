import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Images, useTheme } from '@/config';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import ProductCard3 from '@/components/Product/Card3';
import styles from './styles';

const orderDataDefault = {
  id: '#39072198',
  items: [
    {
      image: Images.eProduct,

      title: 'White T-Shirt with simple logo and good material',
      quantity: 2,
      salePrice: '$78.00',
      description: 'Double',
    },
    {
      image: Images.eProduct,

      title: 'White T-Shirt with simple logo and good material',
      quantity: 2,
      salePrice: '$78.00',
      description: 'Double',
    },
  ],
  total: '$154.00',
  placedOn: '28 Apr 2020 09:00',
  paidOn: '01 May 2020 18:00',
  status: 'Delivered',
};

const OrderItemList = ({ style = {}, orderData = orderDataDefault, addToCard = () => {}, onPress = () => {} }) => {
  const { colors } = useTheme();
  return (
    <View style={style}>
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => onPress()}>
        <Text headline>ORDER ID</Text>
        <Text headline grayColor style={{ marginLeft: 8 }}>
          {orderData.id}
        </Text>
      </TouchableOpacity>
      {(orderData?.items?.length ?? 0) > 0 && (
        <View style={[styles.viewItemList, { borderBottomColor: colors.border }]}>
          {orderData.items.map((item, index) => (
            <ProductCard3
              key={index}
              style={{ marginBottom: 8 }}
              image={item.image}
              title={item.title}
              salePrice={item.salePrice}
              quantity={item.quantity}
              description={item.description}
              onPress={() => onPress()}
            />
          ))}
        </View>
      )}
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 12,
        }}
      >
        <View>
          <View>
            <Tag onPress={addToCard} small style={{ padding: 4 }}>
              {orderData.status}
            </Tag>
          </View>
          <Text caption1 grayColor style={{ marginTop: 8 }}>
            Placed on
          </Text>
          <Text caption2>{orderData.placedOn}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text headline>TOTAL</Text>
            <Text headline primaryColor style={{ marginLeft: 8 }}>
              {orderData.total}
            </Text>
          </View>
          <Text
            caption1
            grayColor
            style={{
              marginTop: 8,
            }}
          >
            Paid on
          </Text>
          <Text caption2>{orderData.paidOn}</Text>
        </View>
      </View>
    </View>
  );
};

OrderItemList.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  orderData: PropTypes.object,
  addToCard: PropTypes.func,
  onPress: PropTypes.func,
  status: PropTypes.string,
};

export default OrderItemList;
