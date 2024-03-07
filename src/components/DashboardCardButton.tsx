import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
  text-decoration: none;
`;
// box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.6);
// transform: translate(0, -2px);
// cursor: pointer;

const DashboardCardButton = (props: { primaryText: string;icon?: React.ReactNode; secondaryText?: string; color: string; onClick?: React.MouseEventHandler<HTMLDivElement>; targetRoute?: string }) => {
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
          'fontSize': '12px',
          'border': '2px solid #3B32E6',
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'black' }}>
            <Typography variant="h6">{props.primaryText}</Typography>
            <Typography variant="h6" sx={{ color: 'black' }}>{props.secondaryText ?? <>&nbsp;</>}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', width: '100%' }}>
              {/* <Box>{props.icon}</Box> */}
              <Button
                variant="contained"
                endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}
                sx={{
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
            </Box>
          </Box>
        </CardContent>

      </CardActionArea>
    </Card>
  );
};

export default DashboardCardButton;
