import { Images } from '@/config';

export const PaymentItems = [
  { id: 1, title: 'Domestic Card', iconName: 'credit-card', checked: true },
  { id: 2, title: 'Credit Card', iconName: 'cc-mastercard', checked: false },
  { id: 3, title: 'Net Banking', iconName: 'globe', checked: false },
  { id: 4, title: 'Smart Wallets', iconName: 'mobile-alt', checked: false },
];

export const Banks = [
  {
    id: 1,
    image: Images.bank1,
    title: 'DBS Bank',
  },
  {
    id: 2,
    image: Images.bank2,
    title: 'Citi Bank',
  },
  {
    id: 3,
    image: Images.bank3,
    title: 'HSBC Bank',
  },
  {
    id: 4,
    image: Images.bank4,
    title: 'OCBC Bank',
  },
  {
    id: 5,
    image: Images.bank5,
    title: 'Maybank Bank',
  },
  {
    id: 6,
    image: Images.bank6,
    title: 'Bangkok Bank',
  },
];

export const MobileWallet = [
  {
    id: 1,
    image: Images.payment1,
    title: 'Google Wallet',
  },
  {
    id: 2,
    image: Images.payment2,
    title: 'Samsung Pay',
  },
  {
    id: 3,
    image: Images.payment3,
    title: 'Apple Pay',
  },
];
