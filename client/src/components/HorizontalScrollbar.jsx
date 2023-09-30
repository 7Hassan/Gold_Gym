
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import BodyPart from './BodyPart';


const HorizontalScrollbar = ({ data, setBodyPart, bodyPart }) => {
  return <>
    {
      data.map((item) => (
        <Box
          key={item._id || item}
          itemID={item._id || item}
          title={item._id || item}
          m="0 40px"
        >
        <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
        </Box>
      ))
    }
  </>
}

export default HorizontalScrollbar;

HorizontalScrollbar.propTypes = {
  data: PropTypes.array.isRequired,
  setBodyPart: PropTypes.func,
  bodyPart: PropTypes.string,

};
