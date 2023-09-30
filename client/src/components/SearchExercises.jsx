import { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { musclesParts, bodyParts } from '../utils/variables'
import { useGet } from '../services/api/get';


const options = [...bodyParts, ...musclesParts]

const SearchExercises = ({ setExercises }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  useGet(setData)

  const handleSearch = async (op = null) => {
    const searchStr = op || search
    const index = options.findIndex(op => op.includes(searchStr));
    if (index < 0) return
    const searchedExercises = data.filter(
      (item) => item.target.toLowerCase().includes(searchStr)
        || item.bodyPart.toLowerCase().includes(searchStr)
    );
    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    setExercises(searchedExercises);
    setSearchOptions([])
  };

  const handleClickOptions = (op) => {
    setSearch(op)
    handleSearch(op)
    setSearchOptions([])
  }

  const handleChangeInput = (e) => {
    const searchValue = e.target.value.toLowerCase()
    const opArray = options.filter(op => op.includes(searchValue));
    setSearchOptions(opArray);
    setSearch(searchValue)
  }
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px"
      onClick={() => setSearchOptions([])}>
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Awesome Exercises You <br /> Should Know
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
        <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }}
          onClick={() => handleSearch()}>
          Search
        </Button>
        <div className={`search-options ${searchOptions.length > 0 && 'active'}`}>
          <div className="container-op">
            {
              searchOptions.map((op) => <div key={op} onClick={() => handleClickOptions(op)}>{op}</div>)
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


