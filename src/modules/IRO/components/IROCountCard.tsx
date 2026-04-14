import { Badge, Box, Card, CardActionArea, CardContent, Grid, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import formatAmount from '../../Common/formatcode';
import { RampRight } from '@mui/icons-material';
const StyledLink = styled(Link)`
  text-decoration: none;
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IROCountCard = (props: {
  genderFilter?: any;
  onFilter?: (value: any) => unknown;
  count?: string| number|null;
  amount?: string;
  badgeColor?: 'default' | 'error' | 'primary' | 'secondary';
  icon?: React.ReactNode;
  secondaryText: string; color: string; onClick?: React.MouseEventHandler<HTMLDivElement>; targetRoute?: string;
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [year, setYear] = useState(new Date().getFullYear());
  const countCard = (


    <Grid item xs={12} sm={12}>
      <Box
        sx={{
          'display': 'flex',
          'alignItems': 'center',
          'justifyContent': 'space-between',
          'p': 2,
          'borderRadius': 3,
          'background': 'rgb(243, 240, 255)',
          'cursor': 'pointer',
          'transition': 'all 0.2s ease',
          '&:hover': {
            background: 'rgb(230, 225, 255)',
            boxShadow: '0 4px 12px rgba(100, 60, 255, 0.15)',
            transform: 'translateY(-1px)',
          },
        }}
         onClick={props.onClick}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: props.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src="/mod_icons/iro.png" width="22" />
          </Box>

          <Box>
            <Typography fontWeight={700} sx={{ color: '#6b6f82' }} fontSize={17}>{props.secondaryText}</Typography>
            <Typography sx={{
              fontSize: 22,
              fontWeight: 700,
              color: '#5a5fcf',
            }}>
              {props.count}
            </Typography>
          </Box>
        </Box>

        {/* <RampRight /> */}
      </Box>
    </Grid>

  );
  return countCard;
};

export default IROCountCard;
