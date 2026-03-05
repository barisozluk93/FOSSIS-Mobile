import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { EFilterColors, EFilterSizes } from '@/data';
import { useTheme } from '@/config';
import { Button, ProductColorPicker, ProductList, ProductSize, FormCounterSelect, Text } from '@/components';
import styles from './styles';

const ModalProduct = ({ onApply = () => {}, item, colorChoosedInit, sizeChoosedInit, ...attrs }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;
  const [eColors] = useState(EFilterColors);
  const [eSizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(colorChoosedInit);
  const [sizeChoosed, setSizeChoosed] = useState(sizeChoosedInit);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setColorChoosed(colorChoosedInit);
  }, [colorChoosedInit]);

  useEffect(() => {
    setSizeChoosed(sizeChoosedInit);
  }, [sizeChoosedInit]);

  useEffect(() => {
    setTotal(item.price);
  }, [item]);

  const { image, title, category, salePrice, costPrice, price } = item;

  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        <View style={{ paddingVertical: 20 }}>
          <ProductList
            image={image}
            title={title}
            description={category}
            salePrice={salePrice}
            costPrice={costPrice}
            isFavorite={true}
          />
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <Text body1>{t('color').toUpperCase()}</Text>
          <Text
            headline
            style={{
              paddingHorizontal: 4,
            }}
          >
            {`${colorChoosed.name}`.toUpperCase()}
          </Text>
        </View>
        <ProductColorPicker colorChoosed={colorChoosed} colors={eColors} onPress={(color) => setColorChoosed(color)} />

        <View style={{ flexDirection: 'row', marginBottom: 8, marginTop: 20 }}>
          <Text body1>{t('size').toUpperCase()}</Text>
          <Text
            headline
            style={{
              paddingHorizontal: 4,
            }}
          >
            {`${sizeChoosed.name}`.toUpperCase()}
          </Text>
        </View>
        <ProductSize sizeChoosed={sizeChoosed} sizes={eSizes} onPress={(size) => setSizeChoosed(size)} />

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            marginTop: 20,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text body1>{t('quantity').toUpperCase()}</Text>
            <FormCounterSelect
              isRow={true}
              label={''}
              detail={''}
              style={{
                marginTop: 8,
                backgroundColor: 'transparent',
                padding: 0,
                justifyContent: 'center',
                flex: 0,
              }}
              onChange={(value) => {
                setTotal(value * price);
              }}
            />
          </View>
          <View>
            <Text body1 style={{ textAlign: 'right' }}>
              {t('total').toUpperCase()}
            </Text>
            <Text title3 style={{ textAlign: 'right', marginTop: 12 }}>
              {`$${total.toFixed(2)}`}
            </Text>
          </View>
        </View>

        <Button full style={{ marginTop: 10, marginBottom: 20 }} onPress={onApply}>
          {t('buy_now')}
        </Button>
      </View>
    </Modal>
  );
};

ModalProduct.propTypes = {
  onApply: PropTypes.func,
  item: PropTypes.object.isRequired,
  colorChoosedInit: PropTypes.object.isRequired,
  sizeChoosedInit: PropTypes.object.isRequired,
};

export default ModalProduct;
