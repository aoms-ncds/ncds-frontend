/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react';
import { ListItemText, Button, Menu, MenuItem, ListItemIcon, IconButton } from '@mui/material';
import { MoreVert, SvgIconComponent } from '@mui/icons-material';
import ReactPDF from '@react-pdf/renderer';

const DropdownButton = ({
  useIconButton = false,
  id,
  primaryText,
  items,
}: {
  useIconButton?: boolean;
  id?: string;
  primaryText: string;
  items: {
    id: React.Key;
    icon?: SvgIconComponent;
    text: string;
    onClick?: (arg0: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    component?: any;
    to?: string;
    document?: React.ReactElement<string | React.JSXElementConstructor<any>>;
    fileName?: string;
  }[];
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {useIconButton ? (
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
      ) : (
        <Button id={id} aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} variant={open ? 'contained' : 'outlined'}>
          {primaryText}
        </Button>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/*
                <Typography variant='body2' color='text.secondary'>
                    ⌘X
                </Typography> */}
        {items.map((item) => (
          <MenuItem
            key={item.id}
            onClick={(event: React.MouseEvent<any>) => {
              setAnchorEl(null);
              item.onClick && item.onClick(event);
            }}
            component={item.component}
            document={item.document}
            filename={item.fileName}
            to={item.to}
          >
            {item.icon && (
              <ListItemIcon>
                <item.icon fontSize="small" />
              </ListItemIcon>
            )}
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropdownButton;
