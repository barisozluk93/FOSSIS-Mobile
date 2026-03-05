import { useState } from 'react';
import { View, Alert, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import { Text, CardBooking } from '@/components';

const CardBookingReview = () => {
  const { t } = useTranslation();
  const [textButton, setTextButton] = useState('Checkout');
  const [description, setDescription] = useState('Total price');
  const [secondDescription, setSecondDescription] = useState('Tax included');
  const [price, setPrice] = useState('$156.00');
  const [loading, setLoading] = useState(false);

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <Container title={'CardBooking Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={[styles.item, { alignContent: 'center', alignItems: 'center' }]}>
          <CardBooking
            loading={loading}
            description={description}
            price={price}
            secondDescription={secondDescription}
            textButton={textButton}
            onPress={onPress}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              label={'Description'}
              placeholder="Please input Description"
              onChangeText={(value) => setDescription(value)}
              value={description}
            />
          </View>
          <View style={styles.right}>
            <Input
              label={'Second Description'}
              placeholder="Please input Second Description"
              onChangeText={(value) => setSecondDescription(value)}
              value={secondDescription}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              label={'Price'}
              placeholder="Please input Price"
              onChangeText={(value) => setPrice(value)}
              value={price}
            />
          </View>
          <View style={styles.right}>
            <Input
              label={'Text Button'}
              placeholder="Please input Text Button"
              onChangeText={(value) => setTextButton(value)}
              value={textButton}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text footnote bold>
            Loading
          </Text>
          <Switch onValueChange={() => setLoading((value) => !value)} value={loading} />
        </View>
        <View style={styles.example}>
          <Text footnote bold>
            Example
          </Text>
          <View style={styles.row}>
            <CardBooking
              loading={false}
              description={'T-Shirt'}
              price={'$12.00'}
              secondDescription={'Striped T-shirt in 100% cotton'}
              textButton={t('checkout')}
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CardBookingReview;
