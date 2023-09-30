
import { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ExerciseCard from './ExerciseCard';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollNext()} className="left-arrow arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const SwiperEx = ({ data }) => (
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {data.map((item) => (
      <Box
        key={item._id || item}
        itemID={item._id || item}
        title={item._id || item}
        m="0 40px"
      >
        <ExerciseCard exercise={item} />
      </Box>
    ))}
  </ScrollMenu>
);

export default SwiperEx;

SwiperEx.propTypes = {
  data: PropTypes.array.isRequired,
};