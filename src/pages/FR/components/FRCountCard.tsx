import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';

const FRCountCard = () => {
  return (
    <Card>
      <CardActionArea
        sx={{
          'backgroundColor': '#8833ff',
          'color': 'white',
          'borderRadius': 3,
          'transition': 'all 0.3s',
          'padding': 2,
          '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.6)',
            transform: 'translate(0, -2px)',
            cursor: 'pointer',
          },
          '&:active': {
            boxShadow: 'none !important',
            transform: 'translate(0, 2px)',
            cursor: 'pointer',
          },
        }}>
        <CardContent>
          <Typography variant='h5'>140</Typography>
          <Typography variant='h6'>Applied</Typography>
        </CardContent>
      </CardActionArea>

    </Card>
  );
};

export default FRCountCard;
