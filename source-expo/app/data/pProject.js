import { Images } from '@/config';

export const PProject = [
  {
    id: 2,
    title: 'App Design and Development',
    description:
      'Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Sed porttitor lectus nibh.',
    tasks: 102,
    tickets: 100,
    completedTickets: 90,
    comments: 200,
    status: 'on_going',
    statusName: 'On Going',
    members: [
      {
        id: 1,
        name: 'Steve Grarrett',
        total: '@steave.grarrent',
        image: Images.avata1,
      },
      {
        id: 2,
        name: 'Kondo leyasu',
        total: '@kondo.leyasu',
        image: Images.avata2,
      },
      {
        id: 3,
        name: 'Quinten Kortum',
        total: '@quinten.kortum',
        image: Images.avata3,
      },
      {
        id: 4,
        name: 'Monica Ribeiro',
        total: '@monica.ribeiro',
        image: Images.avata4,
      },
      {
        id: 5,
        name: 'Steve Kute',
        total: '@steve.kute',
        image: Images.profile1,
      },
    ],
  },
  {
    id: 1,
    title: 'CRM & Customer Service',
    description:
      'Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Sed porttitor lectus nibh.',
    tasks: 102,
    tickets: 124,
    completedTickets: 98,
    comments: 300,
    status: 'on_hold',
    statusName: 'On Hold',
    members: [
      {
        id: 4,
        name: 'Monica Ribeiro',
        total: '@monica.ribeiro',
        image: Images.avata4,
      },
      {
        id: 5,
        name: 'Steve Kute',
        total: '@steve.kute',
        image: Images.profile1,
      },
      {
        id: 6,
        name: 'Lakshmana Dongerkerry',
        total: '@lakshmana.dongerkerry',
        image: Images.profile2,
      },
      {
        id: 1,
        name: 'Steve Grarrett',
        total: '@steave.grarrent',
        image: Images.avata1,
      },
      {
        id: 2,
        name: 'Kondo leyasu',
        total: '@kondo.leyasu',
        image: Images.avata2,
      },
      {
        id: 3,
        name: 'Quinten Kortum',
        total: '@quinten.kortum',
        image: Images.avata3,
      },
    ],
  },
  {
    id: 3,
    title: 'Custom Software Development',
    description:
      'Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Sed porttitor lectus nibh.',
    tasks: 102,
    tickets: 100,
    completedTickets: 100,
    comments: 300,
    status: 'completed',
    statusName: 'completed',
    members: [
      {
        id: 6,
        name: 'Lakshmana Dongerkerry',
        total: '@lakshmana.dongerkerry',
        image: Images.profile2,
      },
      {
        id: 7,
        name: 'Chioke Okonkwo',
        total: '@chioke.okonkwo',
        image: Images.profile3,
      },
      {
        id: 8,
        name: 'Lacara Jones',
        total: '@lacara.jones',
        image: Images.profile4,
      },
      {
        id: 1,
        name: 'Steve Grarrett',
        total: '@steave.grarrent',
        image: Images.avata1,
      },
      {
        id: 2,
        name: 'Kondo leyasu',
        total: '@kondo.leyasu',
        image: Images.avata2,
      },
    ],
  },
  {
    id: 4,
    title: 'Create Jira Project',
    description:
      'Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Sed porttitor lectus nibh.',
    tasks: 50,
    tickets: 90,
    completedTickets: 40,
    comments: 200,
    status: 'on_hold',
    statusName: 'On Hold',
    members: [
      {
        id: 8,
        name: 'Lacara Jones',
        total: '@lacara.jones',
        image: Images.profile4,
      },
      {
        id: 1,
        name: 'Steve Grarrett',
        total: '@steave.grarrent',
        image: Images.avata1,
      },
      {
        id: 6,
        name: 'Lakshmana Dongerkerry',
        total: '@lakshmana.dongerkerry',
        image: Images.profile2,
      },
      {
        id: 7,
        name: 'Chioke Okonkwo',
        total: '@chioke.okonkwo',
        image: Images.profile3,
      },
      {
        id: 2,
        name: 'Kondo leyasu',
        total: '@kondo.leyasu',
        image: Images.avata2,
      },
    ],
  },
];

export const PProjectType = [
  {
    value: 'agile',
    iconName: 'font',
    text: 'Agile',
  },
  {
    value: 'scrum',
    iconName: 'stripe-s',
    text: 'Scrum',
  },
  {
    value: 'kanban',
    iconName: 'kickstarter-k',
    text: 'Kanban',
  },
  {
    value: 'CCPM',
    iconName: 'cuttlefish',
    text: 'CCPM',
  },
];

export const PProjectAction = [
  {
    value: 'project_settings',
    text: 'Project settings',
  },
  {
    value: 'move_to_trash',
    text: 'Move to trash',
  },
];
