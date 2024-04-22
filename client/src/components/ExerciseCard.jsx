import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


const ExerciseCard = ({ exercise }) => {
  return <Link className="exercise-card" to={`/exercise/${exercise._id}`}>
    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
    <Stack direction="row">
      <SecondaryMuscles muscles={exercise.secondaryMuscles} />
    </Stack>
    <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
      {exercise.name}
    </Typography>
  </Link>
};


export default ExerciseCard;

ExerciseCard.propTypes = {
  exercise: PropTypes.object.isRequired
};

const SecondaryMuscles = ({ muscles }) => {
  const { t } = useTranslation();

  return muscles.map((muscle, i) => {
    if (i > 3) return;
    return <Button className='btn-card-1' key={muscle} sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
      {t(`${muscle}`)}
    </Button>

  })
}