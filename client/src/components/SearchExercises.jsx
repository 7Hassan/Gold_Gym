import { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { musclesParts, bodyParts, equipments } from '../utils/variables'
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../utils/variables';
import { useTranslation } from 'react-i18next';


const options = [
  ...bodyParts.map(value => ({ name: 'Body part', ref: 'bodyPart', value })),
  ...musclesParts.map(value => ({ name: 'Muscle', ref: 'equipment', value })),
  ...equipments.map(value => ({ name: 'Equipment', ref: 'target', value })),
];

const SearchExercises = ({ setExercises }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const { t } = useTranslation();


  const handleGetEx = async (op) => {
    axios.post(`${url}/api/exercises`, { [op.ref]: op.value }, { withCredentials: true })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg);
        setExercises(res.data.data)
      }).catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      })
  };

  const handleClickOptions = (op) => {
    setSearch(op.value)
    handleGetEx(op)
    setSearchOptions([])
    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
  }

  const handleChangeInput = (e) => {
    const searchValue = e.target.value.toLowerCase()
    const opArray = options.filter(op => op.value.includes(searchValue));
    setSearchOptions(opArray);
    setSearch(searchValue)
  }
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px"
      onClick={() => setSearchOptions([])} className='s-in'>
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        {t('Exercises')}
      </Typography>
      <Box position="relative" mb="72px" >
        <TextField
          height="76px"
          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
          value={search}
          onChange={(e) => handleChangeInput(e)}
          placeholder="Search Exercises"
          type="text"
        />
        <div className={`search-options ${searchOptions.length > 0 && 'active'}`}>
          <div className="container-op">
            {
              searchOptions.map((op) =>
              (
                <div key={op.value} onClick={() => handleClickOptions(op)}
                  className='search-name'>
                  {op.value}
                  <span className='name'> {op.name}</span>
                </div>

              ))
            }
          </div>
        </div>
      </Box>
    </Stack >
  );
};

export default SearchExercises;

SearchExercises.propTypes = {
  setExercises: PropTypes.func.isRequired,
};

