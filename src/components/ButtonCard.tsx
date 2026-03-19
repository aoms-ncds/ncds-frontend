import React from 'react';
import { Badge, Card, CardActionArea, Grid, CardContent, Typography, styled, IconButton, Box, Button, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ButtonCard = (props: {
  count?: string;
  secondaryText: string;
  dot?:string;
  color: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  targetRoute?: string;
  icon?: React.ReactNode; // Allow passing an icon as a prop
  badgeContent?: number;
  badgeColor?: 'default' | 'error' | 'primary' | 'secondary'; // Allow customizing badge color
  contentAlignment?: 'left' | 'center' | 'right'; // Allow customizing content alignment
}) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => props.targetRoute && navigate(props.targetRoute)}
      sx={{
        // width: 340,
        borderRadius: 4,
        boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
        position: 'relative',
        overflow: 'hidden',
        p: 2.5,
        backgroundColor: '#fff',
      }}
    >
      {/* LEFT GREEN BAR */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          backgroundColor: props.color,
          borderRadius: '4px 0 0 4px',
        }}
      />

      {/* TOP ROW */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
          {props.secondaryText}
        </Typography>

        {/* <Button
          variant="outlined"
          size="small"
          // endIcon={r}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 1.5,
            minWidth: 70,
            fontWeight: 600,
          }}
        >
      2026
        </Button> */}
      </Box>

      {/* CONTENT */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* LEFT ICON */}
        <Box sx={{ color: '#6a5cff' }}>
          {props.icon /* checklist icon */}
        </Box>

        {/* COUNT */}
        <Typography
          sx={{
            fontSize: '2.4rem',
            fontWeight: 700,
            color: '#3f3dff',
          }}
        >
          {props.count}
        </Typography>
      </Box>
    </Card>
  );
};


export default ButtonCard;
