import { Images } from '@/config';

export const WishlistsData = [
  {
    id: 1,
    description: 'Branch New + Home Deliv..',
    title: 'Black T-Shirt with simple logo and …',
    image: Images.productView,
    costPrice: '$39',
    salePrice: '$29',
    isFavorite: false,
    price: 29,
  },
  {
    id: 2,
    description: 'Shipping restrictions',
    title: 'Converse Chuck Taylor All Star …',
    image: Images.productGrid02,
    costPrice: '$59',
    salePrice: '$39',
    isFavorite: true,
    price: 39,
  },
  {
    id: 3,
    description: 'Branch New + Home Deliv..',
    title: 'White T-Shirt with simple logo and …',
    image: Images.productGrid03,
    costPrice: '$39',
    salePrice: '$19',
    isFavorite: false,
    price: 19,
  },
  {
    id: 4,
    description: 'Branch New + Home Deliv..',
    title: 'White T-Shirt with simple logo and …',
    image: Images.productGrid04,
    costPrice: '$59',
    salePrice: '$39',
    isFavorite: true,
    price: 39,
  },

  {
    id: 5,
    description: 'Branch New + Home Deliv..',
    title: 'White T-Shirt with simple logo and …',
    image: Images.productGrid05,
    costPrice: '$59',
    salePrice: '$39',
    isFavorite: true,
    price: 39,
  },

  {
    id: 6,
    description: 'Free delivery (Ts&Cs apply)',
    title: 'Adidas Originals Superstar trainers …',
    image: Images.productGrid01,
    costPrice: '',
    salePrice: '$49',
    isFavorite: true,
    price: 49,
  },
];

export const EOptions = [
  {
    value: 'america',
    iconName: 'heart',
    iconColor: '#FF5E80',
    text: 'Saved',
    image: Images.us,
  },
  {
    value: 'vietname',
    iconName: 'ban',
    iconColor: 'black',
    text: 'Remove from this wishlist',
    image: Images.vn,
  },
  {
    value: 'singapore',
    iconName: 'reply',
    iconColor: 'black',
    text: 'Share this product',
    image: Images.sg,
  },
  {
    value: 'indonesia',
    iconName: 'cart-plus',
    iconColor: 'black',
    text: 'Add to cart',
    image: Images.id,
  },
];
