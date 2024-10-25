import HomeView from './views/HomeView';

import HomeIcon from '@mui/icons-material/Home';

export const router = {
  totalreport: HomeView,
};

export const routers = [
  {
    title: 'Home',
    path: '/home',
    exact: false,
    component: HomeView,
    icon: HomeIcon,
    props: {},
    isAlways: true,
  },
];
