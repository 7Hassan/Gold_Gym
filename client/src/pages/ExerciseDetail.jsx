import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import SimilarExercises from '../components/SimilarExercises';
import Detail from '../components/Detail';
import HorizontalScrollbar from '../components/HorizontalScrollbar';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../utils/variables';
import { useTranslation } from 'react-i18next';


const Equipments = ({ exercises, setSimilarExercises }) => {
  const equipments = useMemo(() => Array.from(new Set(exercises.map(ex => ex.equipment))),
    [exercises])
  const [equipment, setEquipment] = useState(equipments[0]);
  const { t } = useTranslation();

  useEffect(() => { setEquipment(equipments[0]) }, [equipments]);
  useEffect(() => {
    const exs = exercises.filter(ex => ex.equipment === equipment)
    setSimilarExercises(exs)
  }, [equipment, exercises, setSimilarExercises]);


  return <div className="selectors muscles">
    <h3 style={{ fontSize: '35px', margin: '50px 0 20px' }}>{t('Equipments')}</h3>
    <div className="container-sel">
      {equipment &&
        <HorizontalScrollbar data={[...equipments]} setBodyPart={setEquipment} bodyPart={equipment} />
      }
    </div>
  </div>
}
Equipments.propTypes = {
  exercises: PropTypes.array.isRequired,
  setSimilarExercises: PropTypes.func.isRequired
}


const OtherExercises = ({ exerciseDetail }) => {
  const { bodyPart, target } = exerciseDetail
  const [exercises, setExercises] = useState([]);
  const [similarExercises, setSimilarExercises] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
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
  }, [bodyPart, target, i18n.language]);


  return <>
    <Equipments
      exercises={exercises}
      setSimilarExercises={setSimilarExercises} />
    <SimilarExercises similarExercises={similarExercises} target={target} />
  </>
}

OtherExercises.propTypes = {
  exerciseDetail: PropTypes.object.isRequired,
}



const ExerciseDetail = () => {
  const { id } = useParams();
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    axios.post(`${url}/api/exercises`, { id }, { withCredentials: true })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg);
        setExerciseDetail(res.data.data[0])
      }).catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      })
  }, [id, i18n.language]);

  return <div>
    {
      exerciseDetail &&
      <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
        <Detail exerciseDetail={exerciseDetail} />
        <OtherExercises exerciseDetail={exerciseDetail} />
      </Box>
    }
  </div>
};

export default ExerciseDetail;
