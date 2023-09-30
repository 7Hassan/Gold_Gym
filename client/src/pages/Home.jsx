import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';
import HorizontalScrollbar from '../components/HorizontalScrollbar';
import { bodyParts } from '../utils/variables';
import { updateMuscles } from '../utils/helpers';
import PropTypes from 'prop-types';
import { useGet } from '../services/api/get';
import axios from 'axios';
import { toast } from 'react-toastify';



const Filter = ({ setExercises }) => {
  const [bodyPart, setBodyPart] = useState('all');
  const [target, setTarget] = useState('all');
  const muscles = useMemo(() => updateMuscles(bodyPart), [bodyPart]);

  useEffect(() => {
    axios.post('/api/exercises', { bodyPart, target })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg);
        setExercises(res.data.data)
      }).catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      })
  }, [bodyPart, target, setExercises])

  useEffect(() => setTarget('all'), [bodyPart]);
  return <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
    <div className="selectors">
      <h3>Body Parts</h3>
      <div className="container-sel">
        <HorizontalScrollbar data={['all', ...bodyParts]} setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </div>
    </div>
    <div className="selectors muscles">
      <h3>Muscles</h3>
      <div className="container-sel">
        <HorizontalScrollbar data={['all', ...muscles]} setBodyPart={setTarget} bodyPart={target} />
      </div>
    </div>
  </Box>
}

Filter.propTypes = {
  setExercises: PropTypes.func.isRequired
}


const Home = () => {
  const [exercises, setExercises] = useState([]);
  useGet(setExercises)
  return <Box>
    <HeroBanner />
    <SearchExercises setExercises={setExercises} />
    <Filter setExercises={setExercises} />
    <Exercises exercises={exercises} />
  </Box>
};

export default Home;




