import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./layouts/NotFound";
import Dashboard from './dashboard/Dashboard.jsx';
import FetchList from './fetch-list/FetchList.jsx';
import Todo from './todo/Todo.jsx';

const Routes = () => {
    return useRoutes([
    {
        path: '/',
        element: <DashboardLayout/>,
        children: [
        { path: '', element: <Dashboard />},
        { path: '/todo', element: <Todo />},
        { path: '/fetchList', element: <FetchList />},
        ]
    },

    {path: '/404', element: <NotFound/>},
    {path:'*', element: <Navigate to="/404" replace/>}

    ])
}
export default Routes;