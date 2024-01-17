import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import Main from './pages/Main/Main';
import StoreDetail from './pages/StoreDetail/StoreDetail';
import UserLogin from './pages/UserLogin/UserLogin';
import UserSignUp from './pages/UserSignUp/UserSignUp';
import Board from './pages/Board/Board';
import CreatePost from './pages/CreatePost/CreatePost';
import PostUpdate from './pages/PostUpdate/PostUpdate';
import PostDetail from './pages/PostDetail/PostDetail';
import CreateReview from './pages/CreateReview/CreateReview';
import StoreRegister from './pages/StoreRegister/StoreRegister';
import SearchResult from './pages/SearchResult/SearchResult';
import StoreDetailEdit from './pages/StoreDetailEdit/StoreDetailEdit';
import MyPage from './pages/MyPage/MyPage';
import RequireLogin from './components/RequireLogin/RequireLogin';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { index: true, path: '/', element: <Main /> }, // 진규
            {
                path: '/mypage/:id',
                element: (
                    <RequireLogin>
                        <MyPage />
                    </RequireLogin>
                ),
            }, // 진규
            { path: '/review/:storeId', element: <CreateReview /> }, // 진규
            { path: '/stores/detail/:id', element: <StoreDetail /> }, // 수연
            { path: '/stores/detail/:id/edit', element: <StoreDetailEdit /> }, // 수연
            { path: '/stores/register', element: <StoreRegister /> }, // 수연
            { path: '/users/login', element: <UserLogin /> }, // 윤렬
            { path: '/users/signup', element: <UserSignUp /> }, // 윤렬
            { path: '/post', element: <Board /> }, // 화경
            {
                path: '/post/create',
                element: (
                    <RequireLogin>
                        <CreatePost />
                    </RequireLogin>
                ),
            }, // 화경
            { path: '/post/update', element: <PostUpdate /> }, // 화경
            {
                path: '/post/:id',
                element: (
                    <RequireLogin>
                        <PostDetail />
                    </RequireLogin>
                ),
            }, // 화경
            {
                path: '/stores/register',
                element: (
                    <RequireLogin>
                        <StoreRegister />
                    </RequireLogin>
                ),
            }, // 혜지 수연
            { path: '/stores/search', element: <SearchResult /> }, // 혜지
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);

reportWebVitals();
