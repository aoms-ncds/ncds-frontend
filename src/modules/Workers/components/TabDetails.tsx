import { Box, Typography } from '@mui/material';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * Renders a tab panel with accessibility properties.
 * @param {Object} props - The component props.
 * @param {number} props.value - The value of the tab.
 * @param {number} props.index - The index of the tab.
 * @param {React.ReactNode} props.children - The child elements to render.
 * @return {JSX.Element} - The rendered tab panel.
 */
export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

/**
 * Returns accessibility props for a tab.
 * @param {number} index - The index of the tab.
 * @return {Object} - The accessibility props object.
 */
export function a11yProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
