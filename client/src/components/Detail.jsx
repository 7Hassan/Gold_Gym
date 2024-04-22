import { Typography, Stack, Button } from '@mui/material';
import PropTypes from 'prop-types';
import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';
import { useTranslation } from 'react-i18next';

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment, instructions } = exerciseDetail;
  const { t } = useTranslation();

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Typography sx={{ fontSize: { lg: '64px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
          {name}
        </Typography>
        <div className="instructions">
          {
            instructions.map((ins, i) => {
              return <div className="inst" key={ins}>
                <div className={`num num-${i + 1}`}>{i + 1}</div>
                <div className="text">{ins}</div>
              </div>
            })
          }
        </div>
        {extraDetail?.map((item) => (
          <Stack key={item.icon} direction="row" gap="24px" alignItems="center">
            <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
              <img src={item.icon} alt={bodyPart} style={{ width: '50px', height: '50px' }} />
            </Button>
            <Typography textTransform="capitalize" sx={{ fontSize: { lg: '30px', xs: '20px' } }}>
              {t(`${item.name}`)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;

Detail.propTypes = {
  exerciseDetail: PropTypes.object.isRequired
};