<<<<<<< HEAD
import React, { RefAttributes } from 'react';
import { useTheme } from '@mui/material';
import { GridActionsCellItem, GridActionsCellItemProps } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

type GridLinkActionProps = { to?: string } & GridActionsCellItemProps & RefAttributes<HTMLButtonElement>;

const GridLinkAction = ({ to, ...props }: GridLinkActionProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return to ? (
    <Link to={to} style={{ color: isDark ? 'white' : 'black', textDecoration: 'none' }}>
      <GridActionsCellItem {...props} />
    </Link>
  ) : (
    <GridActionsCellItem {...props} />
  );
};

export default GridLinkAction;
=======
import React, { RefAttributes } from 'react';
import { useTheme } from '@mui/material';
import { GridActionsCellItem, GridActionsCellItemProps } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

type GridLinkActionProps = { to?: string } & GridActionsCellItemProps & RefAttributes<HTMLButtonElement>;

const GridLinkAction = ({ to, ...props }: GridLinkActionProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return to ? (
    <Link to={to} style={{ color: isDark ? 'white' : 'black', textDecoration: 'none' }}>
      <GridActionsCellItem {...props} />
    </Link>
  ) : (
    <GridActionsCellItem {...props} />
  );
};

export default GridLinkAction;
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
