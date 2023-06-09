import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FRCountCard = (props: { count?: string; secondaryText: string; color: string }) => {
  return (
    <Card
      sx={{
        'backgroundColor': props.color,
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
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5">{props.count}</Typography>
          <Typography variant="h6" align="right">
            {props.secondaryText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FRCountCard;
