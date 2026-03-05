import { Images } from '@/config';

export const CompletedOrders = [
  {
    id: '#39072197',
    items: [
      {
        image: Images.productView,
        title: 'Black T-Shirt with simple logo',
        quantity: 2,
        salePrice: '$78.00',
        description: 'Double',
      },
    ],
    total: '$154.00',
    placedOn: '28 Apr 2020 09:00',
    paidOn: '01 May 2020 18:00',
    status: 'Delivered',
    isCompleted: true,
    isCancelled: true,
    isRequested: false,
  },
  {
    id: '#39072198',
    items: [
      {
        image: Images.productGrid02,

        title: 'Converse Chuck Taylor All Star',
        quantity: 2,
        salePrice: '$78.00',
        description: 'Double',
      },
      {
        image: Images.productGrid04,

        title: 'Sunset Sleep Scarf Top',
        quantity: 2,
        salePrice: '$78.00',
        description: 'Double',
      },
    ],
    total: '$154.00',
    placedOn: '29 Apr 2020 09:00',
    paidOn: '10 May 2020 18:00',
    status: 'Delivered',
    isCompleted: true,
    isCancelled: false,
    isRequested: false,
  },
  {
    id: '#39072199',
    items: [
      {
        image: Images.productGrid01,
        title: 'Adidas Originals Supercourt',
        quantity: 2,
        salePrice: '$78.00',
        description: 'Double',
      },
    ],
    total: '$154.00',
    placedOn: '28 Apr 2020 09:00',
    paidOn: '01 May 2020 18:00',
    status: 'Delivered',
    isCompleted: true,
    isCancelled: false,
    isRequested: true,
  },
];
