/* Bottom News Screen */
import PHome from '@/screens/PHome';
import PProject from '@/screens/PProject';
import PProjectView from '@/screens/PProjectView';
import PProjectCreate from '@/screens/PProjectCreate';
import PTaskCreate from '@/screens/PTaskCreate';
import PTaskView from '@/screens/PTaskView';
import PTask from '@/screens/PTask';
import PFilter from '@/screens/PFilter';
import Profile from '@/screens/Profile';
import PSelectAssignee from '@/screens/PSelectAssignee';
import { tabBarIcon, tabBarIconHaveNoty, BottomTabNavigatorMazi } from '@/navigation/components';
import PUser from '@/screens/PUser';
import UserFilter from '@/screens/UserFilter';
import PMaterial from '@/screens/PMaterial';
import MaterialFilter from '@/screens/MaterialFilter';
import ProjectFilter from '@/screens/ProjectFilter';

export const NewsTabScreens = {
  User: {
    component: PUser,
    options: {
      title: 'usermanagement',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'users' }),
    },
  },
  Material: {
    component: PMaterial,
    options: {
      title: 'materialmanagement',
      tabBarIcon: ({ color }) => tabBarIconHaveNoty({ color, name: 'boxes' }),
    },
  },
  Project: {
    component: PProject,
    options: {
      title: 'projectmanagement',
      tabBarIcon: ({ color }) => tabBarIconHaveNoty({ color, name: 'briefcase' }),
    },
  },
  Profile: {
    component: Profile,
    options: {
      title: 'account',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'user-circle' }),
    },
  },
};

const ProjectMenu = () => <BottomTabNavigatorMazi tabScreens={NewsTabScreens} />;

export default {
  ProjectMenu: {
    component: ProjectMenu,
    options: {
      title: 'home',
    },
  },
  PSelectAssignee: {
    component: PSelectAssignee,
    options: {
      title: 'select_assignee',
    },
  },
  PProjectView: {
    component: PProjectView,
    options: {
      title: 'project_view',
    },
  },
  PProjectCreate: {
    component: PProjectCreate,
    options: {
      title: 'create_project',
    },
  },
  PTaskCreate: {
    component: PTaskCreate,
    options: {
      title: 'create_task',
    },
  },
  PFilter: {
    component: PFilter,
    options: {
      title: 'filter',
    },
  },
  UserFilter: {
    component: UserFilter,
    options: {
      title: 'filter',
    },
  },
  MaterialFilter: {
    component: MaterialFilter,
    options: {
      title: 'filter',
    },
  },
  ProjectFilter: {
    component: ProjectFilter,
    options: {
      title: 'filter',
    },
  },
  PTaskView: {
    component: PTaskView,
    options: {
      title: 'task_view',
    },
  },
};
