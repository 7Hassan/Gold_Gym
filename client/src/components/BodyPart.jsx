import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  return <Stack
    type="button"
    alignItems="center"
    justifyContent="center"
    className={`bodyPart-card ${bodyPart === item && 'active'}`}
    onClick={() => setBodyPart(item)}
  >
    <Typography fontSize="24px" fontWeight="bold" fontFamily="Alegreya" color="#3A1212" textTransform="capitalize"> {item}</Typography>
  </Stack>
}

export default BodyPart;

BodyPart.propTypes = {
  item: PropTypes.string.isRequired,
  setBodyPart: PropTypes.func.isRequired,
  bodyPart: PropTypes.string.isRequired,

};