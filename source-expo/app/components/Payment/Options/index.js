import { useState } from 'react';
import PaymentOption from '@/components/Payment/Option';

const dataInit = [
  { id: 1, title: 'Domestic Card', iconName: 'credit-card', checked: true },
  { id: 2, title: 'Credit Card', iconName: 'cc-mastercard', checked: false },
  { id: 3, title: 'Net Banking', iconName: 'globe', checked: false },
  { id: 4, title: 'Smart Wallets', iconName: 'mobile-alt', checked: false },
];
export default function PaymentOptions({ itemInit = {}, data = dataInit, onChange = () => {} }) {
  const [bankChoosed, setBankChoosed] = useState(itemInit);

  const handleChoose = (item) => {
    setBankChoosed(item);
    onChange(item);
  };

  return data.map((item, index) => (
    <PaymentOption
      key={index}
      title={item.title}
      iconName={item.iconName}
      checked={bankChoosed.id === item.id}
      onPress={() => handleChoose(item)}
    />
  ));
}
