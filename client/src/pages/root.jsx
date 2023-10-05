
import { Outlet } from "react-router-dom";
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  return <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
    <ToastContainer />
    <Navbar />
    <Outlet />
    <Footer />
  </Box>
};

export default Root;