import './App.css';
import { images } from './constants';
import BlogDetail from './pages/blogDetail/BlogDetail';
import HomePage from './pages/home/HomePage';
import { Routes, Route } from "react-router-dom";
import RegisterPage from './pages/register/RegisterPage';
import toast, { Toaster } from 'react-hot-toast';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"
import { logout } from './store/actions/user';
import AdminLayout from './pages/admin/AdminLayout';
import Admin from './pages/admin/components/screen/Admin';
import EditPost from './pages/admin/components/screen/posts/EditPost';
import ManagePosts from './pages/admin/components/screen/posts/ManagePosts';
import AllBlogs from './pages/blogs/AllBlogs';
import Comments from './pages/admin/components/screen/comments/Comments';

function App() {
  const userState = useSelector(state => state.user)
  const dispatch = useDispatch()

  const checkAndLogoutAfter30Days = () => {
    const token = userState.userInfo?.data.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date()

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        toast.success("Token mu expired, silahkan login kembali")
        dispatch(logout())
      }
    }
  };

  useEffect(() => {
    checkAndLogoutAfter30Days()
  }, [])

  return (
    <div className="App font-opensans">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/blog/:slug' element={<BlogDetail />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/blogs' element={<AllBlogs />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
