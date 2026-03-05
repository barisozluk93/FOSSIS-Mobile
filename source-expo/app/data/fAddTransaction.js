import { BaseColor, Images } from '@/config';

export const FBuyList = [
  {
    id: 1,
    textLeft: 'exchange',
    textRight: 'Global AAX',
  },
  {
    id: 2,
    textLeft: 'bought_with',
    textRight: 'USD',
  },
  {
    id: 3,
    textLeft: 'per_coin',
    textRight: '$39,000.99',
  },
  {
    id: 4,
    textLeft: 'quantity',
    textRight: '1 BTC',
  },
  {
    id: 5,
    textLeft: 'fee',
    textRight: '$0',
  },
  {
    id: 6,
    textLeft: 'date',
    textRight: 'Jun 06 2021',
  },
];

export const FSellList = [
  {
    id: 1,
    textLeft: 'Exchange',
    textRight: 'Global BBX',
  },
  {
    id: 2,
    textLeft: 'Bought With',
    textRight: 'USD',
  },
  {
    id: 3,
    textLeft: 'Per Coin',
    textRight: '$49,000.99',
  },
  {
    id: 4,
    textLeft: 'Quantity',
    textRight: '2 BTC',
  },
  {
    id: 5,
    textLeft: 'Fee',
    textRight: '$1',
  },
  {
    id: 6,
    textLeft: 'Date',
    textRight: 'Jun 10 2021',
  },
];

export const FTransfer = [
  {
    id: 1,
    textLeft: 'From',
    textRight: 'Global AAX',
  },
  {
    id: 2,
    textLeft: 'To',
    textRight: '55 Global Markets',
  },
  {
    id: 3,
    textLeft: 'Quantity',
    textRight: '1 BTC',
  },
  {
    id: 4,
    textLeft: 'Free',
    textRight: '$0',
  },
  {
    id: 6,
    textLeft: 'Date',
    textRight: 'Jun 06 2021',
  },
];

export const FTypes = [
  {
    id: 'income',
    iconName: 'plus-circle',
    iconColor: BaseColor.pinkLightColor,
    text: 'Income',
  },
  {
    id: 'outcome',
    iconName: 'minus-circle',
    iconColor: BaseColor.pinkLightColor,
    text: 'Outcome',
  },
];

export const FChooseCategories = [
  {
    id: '1',
    image: Images.categoryEntertainment,
    title: 'Utilities',
    subtitle: 'Vestibulum ante ipsum primis',
  },
  {
    id: '2',
    image: Images.categoryFood,
    title: 'Entertainment',
    subtitle: 'Praesent sapien massa',
  },
  {
    id: '3',
    image: Images.categoryHealth,
    title: 'Food and Drink',
    subtitle: 'Curabitur aliquet quam',
  },
  {
    id: '4',
    image: Images.categoryHome,
    title: 'Home & Gardern',
    subtitle: 'Quisque velit nisi',
  },
  {
    id: '5',
    image: Images.categoryNews,
    title: 'Vehicle & Insurance',
    subtitle: 'Nulla quis lorem ut libero',
  },
  {
    id: '6',
    image: Images.categoryScience,
    title: 'Business Services',
    subtitle: 'Donec velit neque',
  },
];

export const FMarkers = [
  {
    latitude: 1.28509459282552,
    longitude: 103.86113658645026,
    image: Images.marinaBaySands,
    title: 'Marina Bay Sands, Singapore',
    description: '10 Bayfront Ave, Singapore 018956.',
  },
  {
    latitude: 1.2827904017890261,
    longitude: 103.85908189813864,
    image: Images.sandsExpo,
    title: 'Sands Expo & Convention Centre',
    description: '10 Bayfront Ave, Singapore 018956.',
  },
  {
    latitude: 1.2836932542677966,
    longitude: 103.85910630567777,
    image: Images.banyanTree,
    title: 'Banyan Tree Spa, Marina Bay Sands',
    description: '10 Bayfront Avenue Tower 1, Level 55 Hotel Marina Bay Sands, Singapore 018956.',
  },
  {
    latitude: 1.281953468394305,
    longitude: 103.86106068319525,
    image: Images.floralFantasy,
    title: 'Floral Fantasy',
    description: 'Gardens by the Bay, Singapore 018953.',
  },
];

export const FCurrencies = [
  {
    id: '0',
    title: 'United States',
    description: '1 USD',
    image: Images.us,
    date: 'USD',
  },
  {
    id: '1',
    title: 'Autralian Dollar',
    description: '1 USD = 1,3400 AUD',
    image: Images.flagAus,
    date: 'AUD',
  },
  {
    id: '2',
    title: 'South Korean Won',
    description: '1 USD = 899.96 KPW',
    image: Images.flagKorea,
    date: 'KPW',
  },
  {
    id: '3',
    title: 'UAE Dirham',
    description: '1 USD = 3.6725 AED ',
    image: Images.flagUae,
    date: 'AED',
  },
  {
    id: '5',
    title: 'Chinese Yuan',
    description: '1 USD = 6.4700 CNY ',
    image: Images.flagChina,
    date: 'CNY',
  },
  {
    id: '6',
    title: 'Indian Rupee',
    description: '1 USD = 74.549 INR ',
    image: Images.flagIndia,
    date: 'INR',
  },
  {
    id: '7',
    title: 'Euro',
    description: '1 USD = 0.8427 EUR ',
    image: Images.flagFrance,
    date: 'EUR',
  },

  {
    id: '4',
    title: 'Brazilian Real',
    description: '1 USD = 5.1745 BRL ',
    image: Images.flagBrazil,
    date: 'BRL',
  },
];
