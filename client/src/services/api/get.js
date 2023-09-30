

import { useEffect } from 'react';
import axios from 'axios';
import PropTypes from "prop-types"
import { toast } from 'react-toastify';
export const useGet = (setSate) => {
  useEffect(() => {
    axios.get('/api/exercises')
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg);
        setSate(res.data.data)
      }).catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      })
  }, [setSate]);
}

useGet.propTypes = { url: PropTypes.string, setSate: PropTypes.func }





