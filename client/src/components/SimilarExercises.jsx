import { Typography, Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import Loader from './Loader';
import SwiperEx from './swiper-ex';
import { useTranslation } from 'react-i18next';

const SimilarExercises = ({ similarExercises, target }) => {
  const { t } = useTranslation();

  return <Box sx={{ mt: { lg: '100px', xs: '0px' } }}>
    <Typography sx={{ textAlign: 'center', fontSize: { lg: '44px', xs: '25px' }, ml: '20px' }}
      fontWeight={700} color="#000" mb="50px">
      <div className="similar-ex">
        <span className="" style={{ color: '#FF2625', textTransform: 'capitalize' }}>
          {t(`${target}`)}
        </span> {t('Exercises')}
      </div>
    </Typography>
    <Stack direction="row" sx={{ p: 2, position: 'relative' }}>
      {similarExercises.length !== 0 && <SwiperEx data={similarExercises} />}
      {similarExercises.length === 0 && <Loader />}
    </Stack>
  </Box>
}

export default SimilarExercises;

SimilarExercises.propTypes = {
  similarExercises: PropTypes.array.isRequired,
};