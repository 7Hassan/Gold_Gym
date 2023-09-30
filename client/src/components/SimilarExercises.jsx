import { Typography, Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import Loader from './Loader';
import SwiperEx from './swiper-ex';

const SimilarExercises = ({ similarExercises }) => {
  return <Box sx={{ mt: { lg: '100px', xs: '0px' } }}>
    <Typography sx={{ fontSize: { lg: '44px', xs: '25px' }, ml: '20px' }}
      fontWeight={700} color="#000" mb="33px">
      <span style={{ color: '#FF2625' }}>Similar</span> Exercises
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