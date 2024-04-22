
import { Outlet } from "react-router-dom";
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';


const languages = [
  {
    code: 'en',
    dir: 'ltr'
  },
  {
    code: 'ar',
    dir: 'rtl'
  }

]


const Root = () => {
  const currentLangCode = cookies.get('i18next') || 'en';
  const currentLang = languages.find(l => l.code === currentLangCode) || languages[0]
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log(i18n.language)
    // if (i18n.language !== 'en' && i18n.language !== 'ar') i18n.changeLanguage('en')
    document.body.dir = currentLang.dir || "ltr";
  }, [i18n.language]);


  return <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
    <ToastContainer />
    <Navbar />
    <Outlet />
    <Footer />
  </Box>
};

export default Root;