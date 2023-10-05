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

const Equipments = ({ exercises, setSimilarExercises }) => {
  const equipments = useMemo(() => Array.from(new Set(exercises.map(ex => ex.equipment))),
    [exercises])
  const [equipment, setEquipment] = useState(equipments[0]);

  useEffect(() => { setEquipment(equipments[0]) }, [equipments]);
  useEffect(() => {
    const exs = exercises.filter(ex => ex.equipment === equipment)
    setSimilarExercises(exs)
  }, [equipment, exercises, setSimilarExercises]);


  return <div className="selectors muscles">
    <h3>Equipments</h3>
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
  useEffect(() => {
    window.scrollTo({ top: 0 });
    axios.post(`${url}/api/exercises`, { bodyPart, target })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg);
        setExercises(res.data.data)
      }).catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      })
  }, [bodyPart, target]);


  return <>
    <Equipments
      exercises={exercises}
      setSimilarExercises={setSimilarExercises} />
    <SimilarExercises similarExercises={similarExercises} />
  </>
}

OtherExercises.propTypes = {
  exerciseDetail: PropTypes.object.isRequired,
}



const ExerciseDetail = () => {
  const { id } = useParams();
  const [exerciseDetail, setExerciseDetail] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    axios.post(`${url}/api/exercises`, { id })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg);
        setExerciseDetail(res.data.data[0])
      }).catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      })
  }, [id]);

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
