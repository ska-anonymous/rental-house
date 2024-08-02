import { createContext, useEffect, useState } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

export const AppContext = createContext();

import Home from './components/Home';
import Preloader from './components/Preloader';
import { API_URL } from './components/Config';
import Dashboard from './components/dashboard/Dashboard';
import DashboardHome from './components/dashboard/DashboardHome';
import Users from './components/dashboard/Users';
import Profile from './components/dashboard/Profile';
import AddHouse from './components/dashboard/AddHouse';
import EditProfile from './components/dashboard/EditProfile';
import MyHouses from './components/dashboard/MyHouses';
import HouseBooking from './components/dashboard/HouseBooking';
import MyContracts from './components/dashboard/MyContracts';
import BillingDetails from './components/dashboard/BillingDetails';
import ViewBill from './components/dashboard/ViewBill';
import AddPayment from './components/dashboard/AddPayment';
import ChangePassword from './components/dashboard/ChangePassword';
import TotalPayments from './components/dashboard/TotalPayments';
import Messages from './components/dashboard/Messages';


const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    {
      path: '/dashboard', element: <Dashboard />, children: [
        { path: '', element: <DashboardHome /> },
        { path: 'users', element: <Users /> },
        { path: 'profile', element: <Profile /> },
        { path: 'edit-profile', element: <EditProfile /> },
        { path: 'add-house', element: <AddHouse /> },
        { path: 'my-houses', element: <MyHouses /> },
        { path: 'house-booking', element: <HouseBooking /> },
        { path: 'my-contracts', element: <MyContracts /> },
        { path: 'billing-details', element: <BillingDetails /> },
        { path: 'view-bill', element: <ViewBill /> },
        { path: 'add-payment', element: <AddPayment /> },
        { path: 'change-password', element: <ChangePassword /> },
        { path: 'total-payments', element: <TotalPayments /> },
        { path: 'messages', element: <Messages /> },
      ]
    },
  ]
)

function App() {

  const [user, setUser] = useState(null)
  const [preloader, setPreloader] = useState(true);
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsloading] = useState(true)

  const applyTheme = () => {
    if (theme == 'light')
      document.body.classList.remove('dark-mode');
    else
      document.body.classList.add('dark-mode');
  }

  const getUser = async () => {
    setIsloading(true);
    try {
      const response = await fetch(API_URL + '/auth/get_user.php', {
        method: 'GET',
        credentials: 'include'
      })
      const result = await response.json();
      if (result.error)
        setUser(null)
      else
        setUser(result.user)
    } catch (err) {
      console.log('Failed to get user', err)
    }
    setTimeout(() => {
      setPreloader(false);
    }, 2000)
    setIsloading(false)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(API_URL + '/logout.php', {
        method: 'GET',
        credentials: 'include'
      });
      const result = await response.json();
      if (result.error)
        throw new Error(result['error-message']);
      setUser(null);
    } catch (err) {
      toast.error('Failed to logout due Server Error ');
      console.log('Failed to logout due to some reasons ', err);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <AppContext.Provider value={{ user, setUser, preloader, setLoadingBarProgress, handleLogout, theme, setTheme, applyTheme }}>
        <LoadingBar
          color='#f11946'
          progress={loadingBarProgress}
          onLoaderFinished={() => setLoadingBarProgress(0)}
        />
        <Preloader preloader={preloader} />
        <ToastContainer />
        {!isLoading && <RouterProvider router={router} />}
      </AppContext.Provider>
    </>
  );
}

export default App;
