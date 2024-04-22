import { Link, NavLink } from 'react-router-dom';
import { Stack } from '@mui/material';
import Logo from '../assets/images/Logo.png';
import { useTranslation } from 'react-i18next';



const Navbar = () => {
  const { t, i18n } = useTranslation();
  return <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '25px', xs: '10px' }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'none' }} px="20px">
    <Link to="/">
      <img src={Logo} alt="logo" style={{ width: '48px', height: '48px', margin: '0px 20px' }} />
    </Link>
    <Stack
      direction="row"
      gap="40px"
      fontFamily="Alegreya"
      fontSize="24px"
      alignItems="flex-end"
    >

      <NavLink to="/" style={{ whiteSpace: 'nowrap', textDecoration: 'none', color: '#3A1212' }}>
        {t('Home')}
      </NavLink>
      <div className="language-sw">
        {i18n.language !== 'ar' &&
          <button onClick={() => i18n.changeLanguage('ar')}>AR</button>
        }
        {i18n.language === 'ar' &&
          <button onClick={() => i18n.changeLanguage('en')}>
            EN
          </button>
        }

      </div>
    </Stack>
  </Stack >
};

export default Navbar;
