import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
  text-decoration: none;
`;
// box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.6);
// transform: translate(0, -2px);
// cursor: pointer;

const DashboardCardButton = (props: { primaryText: string; secondaryText?: string; color: string; onClick?: React.MouseEventHandler<HTMLDivElement>; targetRoute?: string }) => {
  return (
    <Card
      onClick={props.onClick}
      {...(props.targetRoute && {
        component: StyledLink,
        to: props.targetRoute,
      })}
    >
      <CardActionArea
        sx={{
          'backgroundColor': props.color,
          'color': 'white',
          'borderRadius': 3,
          'transition': 'all 0.3s',
          'padding': 1,
          'height': 190,
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
        <CardContent sx={{ padding: 1 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>{props.primaryText}</Typography>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }} >{props.secondaryText ?? <>&nbsp;</>}</Typography>
        </CardContent>
        <CardActions>
          {/* <Button variant='outlined' sx={{ ml: 'auto', color: 'white', borderColor: 'white' }}>Help</Button> */}
          <Button
            variant="contained"
            endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}
            sx={{
              'ml': 'auto',
              'color': 'white',
              'bgcolor': 'orange',
              '&:hover': {
                color: 'white',
                bgcolor: 'black',
              },
              '&:active': {
                color: 'white',
                bgcolor: 'black',
              },
            }}
          >
            Go
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default DashboardCardButton;
