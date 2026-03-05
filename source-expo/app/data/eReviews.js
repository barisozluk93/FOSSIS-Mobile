import { Images } from '@/config';

export const EReviewsData = [
  {
    id: '1',
    source: Images.profile3,
    name: 'Steve Garrett',
    rate: 4,
    date: '2020 July 20',
    title: 'Nice Place',
    totalLike: 224,
    comment:
      'Lorem ipsum dolor purus in efficitur aliquam, enim enim porttitor lacus, ut sollicitudin nibh neque in metus. adipiscing elit. Aliqam at turpis orci. Mauris nisl, in mollis acu  tincidunt. neque nec turpis aliquet, ut ornare velit molestie. ',
    images: [
      {
        id: 1,
        image: Images.productView,
      },
      {
        id: 2,
        image: Images.productGrid01,
      },
      {
        id: 3,
        image: Images.productGrid04,
      },
      {
        id: 4,
        image: Images.productGrid03,
      },
      {
        id: 5,
        image: Images.productGrid05,
      },
      {
        id: 6,
        image: Images.productGrid06,
      },
    ],
  },
  {
    id: '2',
    totalLike: 100,
    source: Images.profile1,
    name: 'Thai Nguyen',
    rate: 5,
    date: '2020 July 21',
    title: 'Nice Place',
    comment:
      'Lorem ipsum dolor purus in efficitur aliquam, enim enim porttitor lacus, ut sollicitudin nibh neque in metus. adipiscing elit. Aliqam at turpis orci. Mauris nisl, in mollis acu  tincidunt. neque nec turpis aliquet, ut ornare velit molestie. ',
    images: [],
  },
];
