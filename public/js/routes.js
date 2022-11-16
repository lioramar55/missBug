import bugApp from './pages/bug-app.cmp.js';
import loginPage from './pages/login-page.js';
import bugDetails from './pages/bug-details.cmp.js';
import bugEdit from './pages/bug-edit.cmp.js';
import userDetails from './pages/user-details.cmp.js';
import userList from './pages/user-list.cmp.js';

const routes = [
  {
    path: '/',
    component: bugApp,
  },
  {
    path: '/login',
    component: loginPage,
  },
  {
    path: '/edit/:bugId?', //can also be add bug , soo we put '?' after the bugId
    component: bugEdit,
  },
  {
    path: '/details/:bugId',
    component: bugDetails,
  },
  {
    path: '/user/:userId?',
    component: userDetails,
  },
  {
    path: '/user/admin',
    component: userList,
  },
];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
