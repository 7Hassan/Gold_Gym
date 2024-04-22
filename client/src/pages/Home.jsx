import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';
import HorizontalScrollbar from '../components/HorizontalScrollbar';
import { bodyParts, url } from '../utils/variables';
import { updateMuscles } from '../utils/helpers';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


const Filter = ({ setExercises }) => {
  const [bodyPart, setBodyPart] = useState(bodyParts[0]);
  const muscles = useMemo(() => updateMuscles(bodyPart), [bodyPart]);
  const [target, setTarget] = useState(muscles[0]);
  const { t, i18n } = useTranslation();

  useEffect(() => { setTarget(muscles[0]) }, [muscles])
  useEffect(() => {
    if (!bodyPart || !target) return;
    axios.post(`${url}/api/exercises`, { bodyPart, target }, { withCredentials: true })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg);
        setExercises(res.data.data)
      }).catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      })
  }, [bodyPart, target, setExercises, i18n.language])

  return <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
    <div className="selectors" id="exercises">
      <h3>{t('Body Parts')}</h3>
      <div className="container-sel">
        <HorizontalScrollbar data={[...bodyParts]} setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </div>
    </div>
    <div className="selectors muscles">
      <h3>{t('Muscles')}</h3>
      <div className="container-sel">
        <HorizontalScrollbar data={[...muscles]} setBodyPart={setTarget} bodyPart={target} />
      </div>
    </div>
  </Box>
}

Filter.propTypes = {
  setExercises: PropTypes.func.isRequired
}


const Home = () => {
  const [exercises, setExercises] = useState([]);
  return <Box>
    <HeroBanner />
    {/* <SearchExercises setExercises={setExercises} /> */}
    <Filter setExercises={setExercises} />
    <Exercises exercises={exercises} />
  </Box>
};

export default Home;




