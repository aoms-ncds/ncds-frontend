/* eslint-disable react/no-multi-comp */
import { JSXElementConstructor, Key, ReactElement, ReactNode, SetStateAction, useEffect, useState } from 'react';
import {
  ThemeProvider, createTheme, CssBaseline,
  Box, AppBar, Toolbar, Typography, Button, IconButton,
  Accordion, AccordionSummary, AccordionDetails,
  TextField, MenuItem, Grid, Chip, Stack,
  FormControl, InputLabel, Select, OutlinedInput,
  Slider, Switch, FormControlLabel, Divider,
  Paper, Badge, Tooltip, Autocomplete,
  InputAdornment, Avatar,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import * as XLSX from 'xlsx';

import CommonPageLayout from '../../../components/CommonPageLayout';
import { useNavigate } from 'react-router-dom';
import DivisionsServices from '../../Divisions/extras/DivisionsServices';
import { useAuth } from '../../../hooks/Authentication';
import { enqueueSnackbar } from 'notistack';
import CustomReportServices from '../extras/CustomReportServices';
import GenderService from '../../Settings/extras/GenderService';
import moment from 'moment';
import formatAmount from '../../Common/formatcode';
import IROLifeCycleStates from '../../IRO/extras/IROLifeCycleStates';
import { DownloadingOutlined } from '@mui/icons-material';
import { log } from 'console';
import { BlobProvider } from '@react-pdf/renderer';
import PDFTemplateCustomChild from '../components/PDFTemplateCustomChild';
import PDFTemplateCustomUsers from '../components/PDFTemplateCustomUsers';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';

// ── Icons via Unicode/emoji since we can't import @mui/icons-material ──
const Icon = ({ children, sx = {} }: { children: ReactNode; sx?: object }) => (
  <Box component="span" sx={{ fontSize: 18, lineHeight: 1, ...sx }}>{children}</Box>
);

// ── Theme ──────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1a5ae4', light: '#e1e7f0', dark: '#e3e4e9' },
    secondary: { main: '#0891b2' },
    background: { default: '#e9f0ff', paper: '#1e293b' },
    divider: 'rgba(216, 51, 51, 0.08)',
    text: { primary: '#f1f5f9', secondary: '#94a3b8' },
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica", sans-serif',
    h5: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.02em' },
    subtitle2: { fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#0b6cf5' },
    body2: { fontSize: '0.8rem' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none', border: '1px solid rgba(255,255,255,0.07)' },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          'background': '#1e293b',
          'border': '1px solid rgba(255,255,255,0.07)',
          'borderRadius': '10px !important',
          'marginBottom': '10px',
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: '0 0 10px 0' },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: { 'padding': '0 20px', 'minHeight': 52, '&.Mui-expanded': { minHeight: 52 } },
        content: { 'margin': '14px 0', '&.Mui-expanded': { margin: '14px 0' } },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: { root: { padding: '8px 20px 20px' } },
    },
    MuiTextField: {
      defaultProps: { size: 'small', variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            'background': 'rgba(255,255,255,0.03)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover fieldset': { borderColor: 'rgba(99,179,237,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#2563eb' },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: { size: 'small' },
      styleOverrides: {
        root: { background: 'rgba(255,255,255,0.03)' },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: { background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: '"DM Sans", sans-serif', fontWeight: 500 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, fontFamily: '"DM Sans", sans-serif' },
        contained: {
          'background': 'linear-gradient(135deg, #2563eb, #0891b2)',
          'boxShadow': '0 4px 14px rgba(8,145,178,0.3)',
          '&:hover': { background: 'linear-gradient(135deg, #1d4ed8, #0e7490)' },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: { background: 'rgba(255,255,255,0.1)' },
        track: { background: 'linear-gradient(90deg, #2563eb, #0891b2)', border: 'none' },
        thumb: { background: '#2563eb', border: '2px solid #fff' },
        valueLabel: { background: '#1e3a8a' },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: { '&.Mui-checked': { color: '#2563eb' }, '&.Mui-checked + .MuiSwitch-track': { background: '#2563eb' } },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: 'rgba(255,255,255,0.06)' } },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { 'fontSize': '0.8rem', '&.Mui-focused': { color: '#3b82f6' } },
      },
    },
  },
});

// ── Constants ──────────────────────────────────────────────────────────
const GENDER = ['Male', 'Female', 'Other'];
const MARITAL = ['Single', 'Married', 'Divorced', 'Widowed'];
const RELIGION = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism', 'Sikhism', 'Other'];
const LANGUAGES = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi'];
const FIELD = ['Urban', 'Rural', 'Semi-Urban', 'Tribal'];
const DESIGNATIONS = ['Pastor', 'Evangelist', 'Elder', 'Deacon', 'Bishop', 'Missionary', 'Apostle'];
const DEPARTMENTS = ['Youth', 'Women', 'Music', 'Outreach', 'Education', 'Administration', 'Media'];
const FAMILY_TYPES = ['Nuclear', 'Joint', 'Extended'];
const OFFICIAL_STATUS = ['Active', 'OnLeave', 'Suspended', 'Retired', 'Resigned'];
const LIFECYCLE = ['Active', 'Inactive', 'Pending', 'Suspended', 'Retired'];
const DEACTIVATION = ['Resigned', 'Retired', 'Dismissed', 'Transferred', 'Deceased'];
const KIND = ['staff', 'worker'];

// ── Helpers ────────────────────────────────────────────────────────────
const SECTION_ICONS = {
  'User Type & Lifecycle': '👤',
  'Basic Details': '📋',
  'Contact Information': '📞',
  'Identity Documents': '🪪',
  'Address Details': '🏠',
  'Official Details': '🏢',
  'Support & Ministry': '⛪',
  'Support Structure': '💰',
  'Insurance': '🛡️',
};

const SectionTitle = ({ title }) => (
  <Stack direction="row" alignItems="center" spacing={1.5}>
    <Avatar sx={{ width: 30, height: 30, fontSize: 15, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}>
      {SECTION_ICONS[title] || '📁'}
    </Avatar>
    <Typography variant="h6" sx={{ color: 'text.primary', fontSize: '0.85rem' }}>{title}</Typography>
  </Stack>
);

const FieldLabel = ({ children }) => (
  <Typography variant="subtitle2" sx={{ mb: 0.8, display: 'block' }}>{children}</Typography>
);

// ── Range Slider with inputs ───────────────────────────────────────────
const RangeSlider = ({ label, value, onChange, min = 0, max = 100, unit = '' }) => (
  <Box>
    <FieldLabel>{label}</FieldLabel>
    <Box sx={{ px: 1 }}>
      <Slider
        value={value}
        onChange={(_, v) => onChange(v)}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `${v}${unit}`}
        min={min} max={max}
        size="small"
      />
    </Box>
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="caption" color="text.secondary">{min}{unit}</Typography>
      <Typography variant="caption" color="primary.light">{value[0]}{unit} — {value[1]}{unit}</Typography>
      <Typography variant="caption" color="text.secondary">{max}{unit}</Typography>
    </Stack>
  </Box>
);

// ── Date Range ─────────────────────────────────────────────────────────
const DateRange = ({ label, from, to, onFrom, onTo }) => (
  <Box>
    <FieldLabel>{label}</FieldLabel>
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField type="date" value={from} onChange={onFrom} size="small" fullWidth
        InputLabelProps={{ shrink: true }} label="From" />
      <Typography color="text.secondary" sx={{ fontSize: 12 }}>—</Typography>
      <TextField type="date" value={to} onChange={onTo} size="small" fullWidth
        InputLabelProps={{ shrink: true }} label="To" />
    </Stack>
  </Box>
);

// ── Main Component ─────────────────────────────────────────────────────
// eslint-disable-next-line require-jsdoc
export default function UserFilterReportMUI() {
  const init = {
    kind: '', status: '', division: '', subDivisions: '', organization: '', daughterOrganization: '', reasonForReject: '',
    firstName: '', middleName: '', lastName: '', title: '',
    gender: '', maritalStatus: '', religion: '', field: '',
    dobFrom: '', dobTo: '',
    highestQualification: '', motherTongue: '', communicationLanguage: '', knownLanguages: [],
    email: '', email2: '', phone: '', alternativePhone: '',
    PANNo: '', aadhaarNo: '', voterIdNo: '', licenseNumber: '',
    permanentCity: '', permanentState: '', permanentCountry: '',
    currentCity: '', currentState: '', currentCountry: '',
    residingCity: '', residingState: '', residingCountry: '',
    dateOfJoiningFrom: '', dateOfJoiningTo: '',
    dateOfLeavingFrom: '', dateOfLeavingTo: '',
    officialStatus: '', reasonForDeactivation: '',
    selfSupport: false, selfSupportEnabled: false,
    noOfChurches: 0,
    designation: '', otherDesignation: '', department: '', typeOfFamily: '',
    withChurch: false, percentSelfSupport: 0,
    totalAmount: 0, monthlyDeduction: 0,
    yearsInMinistry: 0,
    basic: 0, HRA: 0,
    telAllowance: 0, impactDeduction: 0, MUTDeduction: 0,
    supportEnabled: false,
    impactNo: '', nominee: '', relation: '',
  };
  const navigate = useNavigate();
  const [filters, setFilters] = useState(init);
  const [viewData, setViewData] = useState(false);
  const [genders, setGenders] = useState([]);
  const [expanded, setExpanded] = useState({ 'Basic Details': true, 'User Type & Lifecycle': true });
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  const [data, setData] = useState<any[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedData, setSelectedData] = useState<any[]>([
    'Sl No',
    'Worker Code',
    'Name',
    'Division',
    'SubDivision',
    // 'Sanction Amount',
    // 'Sanction as per',

  ]);
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };
  const [open, setOpen] = useState<boolean>(false);

  const [print, setPrint] = useState<boolean>(false);

  const set = (key: string) => (e: { target: { value: any } }) => setFilters((f) => ({ ...f, [key]: e?.target ? e.target.value : e }));
  const setSlider = (key) => (value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }; const setToggle = (key: string) => (e: { target: { checked: any } }) => setFilters((f) => ({ ...f, [key]: e.target.checked }));
  const toggle = (panel: string) => setExpanded((e) => ({ ...e, [panel]: !e[panel] }));
  console.log(filters, 'filters');
  useEffect(()=>{
    GenderService.getAll()
              .then((res2) => setGenders(res2.data))
              // .then((res) => console.log(res.data, 'sec'))
              .catch((error) =>
                enqueueSnackbar({
                  variant: 'error',
                  message: error.message,
                }),
              );
  }, []);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  console.log(data, 'dta77');

  const filteredRows = (data ?? []).filter((row: any) => {
    const search = searchText.toLowerCase();

    return (
      row.basicDetails?.firstName.toLowerCase().includes(search)
    );
  });

  console.log(filteredRows, 'dta77');
  // Active text filters for chip display
  const textFilters = Object.entries(filters).filter(([k, v]) => {
    if (Array.isArray(v)) return v.length > 0 && !v.every((x) => typeof x === 'number');
    if (typeof v === 'boolean') return v;
    if (typeof v === 'string') return v !== '';
    return false;
  });

  const clearAll = () => setFilters(init);

  const removeChip = (key: string) => {
    const def = init[key as keyof typeof init];
    setFilters((f) => ({ ...f, [key]: def }));
  };

  const SelectField = ({ label, id, options, value, onChange }) => (
    <FormControl fullWidth size="small">
      <InputLabel id={id + '-label'}>{label}</InputLabel>
      <Select labelId={id + '-label'} id={id} value={value} label={label} onChange={onChange}
        sx={{ 'background': 'rgba(255,255,255,0.03)', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' } }}>
        <MenuItem value=""><em>Any</em></MenuItem>
        {options.map((o: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Key | null | undefined) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
      </Select>
    </FormControl>
  );

  const [divisions, setDivisions] = useState<any[] | null>(null);
  const [subDivisions, setSubDivisions] = useState<any[] | null>(null);

  const user = useAuth();
  useEffect(()=>{
    DivisionsServices.getSubDivisionsByDivisionId(filters.division?._id ?? '')
              .then((res2) => setSubDivisions(res2.data))
              // .then((res) => console.log(res.data, 'sec'))
              .catch((error) =>
                enqueueSnackbar({
                  variant: 'error',
                  message: error.message,
                }),
              );
  }, [filters.division]);
  console.log(filters, 'kkk');
  useEffect(() => {
    if ((user?.user as any).permissions.READ_ALL_DIVISIONS) {
      DivisionsServices.getDivisions().then((res) => {
        //   setDivision(res.data ?? null);
        setDivisions(res.data);
      });
    }
  }, []);

  return (
    <>

      {!viewData&& <CommonPageLayout>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* ── AppBar ── */}
          <AppBar position="relative" elevation={0} sx={{
            background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <Toolbar sx={{ gap: 2 }}>
              <Avatar sx={{ width: 36, height: 36, background: 'linear-gradient(135deg, #1d4ed8, #0891b2)', fontSize: 18 }}>⚙</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontSize: '1rem', lineHeight: 1.2 }}>Worker & Staff Filter</Typography>
                <Typography variant="caption" color="text.secondary">Advanced personnel report builder</Typography>
              </Box>
              <Badge badgeContent={textFilters.length} color="primary" max={99}>
                <Chip label="Active Filters" size="small" variant="outlined" color="primary"
                  sx={{ borderColor: 'rgba(37,99,235,0.4)', color: '#3b82f6' }} />
              </Badge>
              <Tooltip title="Clear all filters">
                <Button variant="outlined" size="small" onClick={clearAll}
                  sx={{ 'borderColor': 'rgba(255,255,255,0.15)', 'color': 'text.secondary', '&:hover': { borderColor: 'rgba(255,255,255,0.3)' } }}>
              Reset
                </Button>
              </Tooltip>
              <Button onClick={() => {
              // navigate('/custom-report/reportView');
              // For demo, we just log the filters instead of actual report generation
                CustomReportServices.workerDetails(filters).then((res) => {
                  console.log('Report Data:', res.data);
                  setData(res.data);
                  setViewData(true);
                }).catch((error) => {
                  enqueueSnackbar({
                    variant: 'error',
                    message: error.message,
                  });
                });
              }} variant="contained" size="small" startIcon={<Icon>🔍</Icon>}>
            Run Report
              </Button>
            </Toolbar>
          </AppBar>

          <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>

            {/* ── Active filter chips ── */}
            {textFilters.length > 0 && (
              <Paper sx={{ p: 2, mb: 2.5, background: 'rgba(37,99,235,0.05)', borderColor: 'rgba(37,99,235,0.2)' }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Active Filters</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {textFilters.map(([key, val]) => (
                    <Chip
                      key={key}
                      label={`${key.replace(/([A-Z])/g, ' $1').trim()}: ${Array.isArray(val) ? val.join(', ') : String(val)}`}
                      onDelete={() => removeChip(key)}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ 'fontSize': '0.72rem', 'maxWidth': 260, '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' } }}
                    />
                  ))}
                  <Chip label="Clear all" onClick={clearAll} size="small" color="error" variant="outlined" sx={{ fontSize: '0.72rem' }} />
                </Stack>
              </Paper>
            )}

            {/* ════ SECTION 1: User Type ════ */}
            <Accordion expanded={!!expanded['User Type & Lifecycle']} onChange={() => toggle('User Type & Lifecycle')}>
              <AccordionSummary expandIcon={<Icon>▾</Icon>}>
                <SectionTitle title="User Type & Lifecycle" />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6} md={3}>
                  <SelectField label="Kind" id="kind" options={KIND} value={filters.kind} onChange={set('kind')} />
                </Grid> */}
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Division</InputLabel>
                      <Select
                        label="Division"
                        value={filters.division}
                        onChange={(e) => set('division')(e.target.value)}
                      >
                        <MenuItem value="">All</MenuItem>
                        {divisions?.map((d) => (
                          <MenuItem key={d.id} value={d}>
                            {d.details.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Sub Division</InputLabel>
                      <Select
                        label="Sub Division"
                        value={filters.subDivision}
                        onChange={(e) => set('subDivision')(e.target.value)}
                      >
                        <MenuItem value="">All</MenuItem>
                        {subDivisions?.map((d) => (
                          <MenuItem key={d.id} value={d}>
                            {d.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={filters.status}
                    onChange={(e) => set('status')(e.target.value)}
                    // onChange={handleInputChange}
                  >
                    <MenuItem value="-200">FR CLOSED</MenuItem>
                    <MenuItem value="-201">REVERT</MenuItem>
                    <MenuItem value="220">REOPENED</MenuItem>
                    <MenuItem value="201">WAITING FOR PRESIDENT</MenuItem>
                    <MenuItem value="202">WAITING FOR ACCOUNTS</MenuItem>
                    <MenuItem value="203">FR APPROVED</MenuItem>
                    <MenuItem value="-102">FR DISAPPROVED</MenuItem>
                    <MenuItem value="217">IRO DISAPPROVED</MenuItem>
                  </TextField>
                </Grid> */}
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      select
                      fullWidth
                      label="Organization"
                      name="organization"
                      value={filters.organization}
                      onChange={(e) => set('organization')(e.target.value)}
                    >
                      <MenuItem value="IET">IET</MenuItem>
                      <MenuItem value="BCG">BCG</MenuItem>
                      <MenuItem value="NCDS">NCDS</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      name="status"
                      value={filters.status}
                      onChange={(e) => set('status')(e.target.value)}
                    >
                      <MenuItem value={UserLifeCycleStates.ACTIVE}>Active</MenuItem>
                      <MenuItem value={UserLifeCycleStates.INACTIVE}>InActive</MenuItem>
                    </TextField>
                  </Grid>
                  {/* <Grid item xs={12} sm={6} md={3}>
                  <TextField fullWidth label="Organization" value={filters.organization} onChange={set('organization')} />
                </Grid> */}
                  {/* <Grid item xs={12} sm={6} md={4}>
                  <TextField fullWidth label="Daughter Organization" value={filters.daughterOrganization} onChange={set('daughterOrganization')} />
                </Grid> */}
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* ════ SECTION 2: Basic Details ════ */}
            <Accordion expanded={!!expanded['Basic Details']} onChange={() => toggle('Basic Details')}>
              <AccordionSummary expandIcon={<Icon>▾</Icon>}>
                <SectionTitle title="Basic Details" />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      select
                      fullWidth
                      label="Title"
                      name="title"
                      value={filters.title}
                      onChange={(e) => set('title')(e.target.value)}
                    >
                      <MenuItem value="Mr">Mr</MenuItem>
                      <MenuItem value="Mrs">Mrs</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="First Name" value={filters.firstName} onChange={set('firstName')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Middle Name" value={filters.middleName} onChange={set('middleName')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Last Name" value={filters.lastName} onChange={set('lastName')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        label="Gender"
                        value={filters.gender}
                        onChange={(e) => set('gender')(e.target.value)}
                      >
                        <MenuItem value="">All</MenuItem>
                        {genders?.map((d) => (
                          <MenuItem key={d.id} value={d}>
                            {d.gender}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <SelectField label="Marital Status" id="marital" options={MARITAL} value={filters.maritalStatus} onChange={set('maritalStatus')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <SelectField label="Religion" id="religion" options={RELIGION} value={filters.religion} onChange={set('religion')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <SelectField label="Worker Field" id="field" options={FIELD} value={filters.field} onChange={set('field')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField fullWidth label="Highest Qualification" value={filters.highestQualification} onChange={set('highestQualification')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <SelectField label="Mother Tongue" id="motherTongue" options={LANGUAGES} value={filters.motherTongue} onChange={set('motherTongue')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <SelectField label="Communication Language" id="commLang" options={LANGUAGES} value={filters.communicationLanguage} onChange={set('communicationLanguage')} />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={LANGUAGES}
                      value={filters.knownLanguages}
                      onChange={(_, v) => setFilters((f) => ({ ...f, knownLanguages: v }))}
                      renderInput={(params) => <TextField {...params} label="Known Languages" placeholder="Select languages..." />}
                      renderTags={(val, getProps) =>
                        val.map((opt, i) => <Chip key={opt} label={opt} size="small" color="primary" variant="outlined" {...getProps({ index: i })} />)
                      }
                      ChipProps={{ size: 'small' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateRange label="Date of Birth Range" from={filters.dobFrom} to={filters.dobTo}
                      onFrom={set('dobFrom')} onTo={set('dobTo')} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* ════ SECTION 3: Contact ════ */}
            <Accordion expanded={!!expanded['Contact Information']} onChange={() => toggle('Contact Information')}>
              <AccordionSummary expandIcon={<Icon>▾</Icon>}>
                <SectionTitle title="Contact Information" />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Primary Email" value={filters.email} onChange={set('email')} type="email" placeholder="email@..." />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Secondary Email" value={filters.email2} onChange={set('email2')} type="email" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Phone" value={filters.phone} onChange={set('phone')} placeholder="+91..." />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Alternative Phone" value={filters.alternativePhone} onChange={set('alternativePhone')} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* ════ SECTION 4: Identity ════ */}
            <Accordion expanded={!!expanded['Identity Documents']} onChange={() => toggle('Identity Documents')}>
              <AccordionSummary expandIcon={<Icon>▾</Icon>}>
                <SectionTitle title="Identity Documents" />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="PAN Number" value={filters.PANNo} onChange={set('PANNo')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Aadhaar Number" value={filters.aadhaarNo} onChange={set('aadhaarNo')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Voter ID Number" value={filters.voterIdNo} onChange={set('voterIdNo')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="License Number" value={filters.licenseNumber} onChange={set('licenseNumber')} />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                      <FormControlLabel control={<Switch checked={!!filters.hasPAN} onChange={setToggle('hasPAN')} color="primary" />} label="Has PAN" />
                      <FormControlLabel control={<Switch checked={!!filters.hasAadhaar} onChange={setToggle('hasAadhaar')} color="primary" />} label="Has Aadhaar" />
                      <FormControlLabel control={<Switch checked={!!filters.hasVoterId} onChange={setToggle('hasVoterId')} color="primary" />} label="Has Voter ID" />
                      <FormControlLabel control={<Switch checked={!!filters.hasLicense} onChange={setToggle('hasLicense')} color="primary" />} label="Has License" />
                    </Stack>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* ════ SECTION 5: Address ════ */}
            <Accordion expanded={!!expanded['Address Details']} onChange={() => toggle('Address Details')}>
              <AccordionSummary expandIcon={<Icon>▾</Icon>}>
                <SectionTitle title="Address Details" />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  {[
                    { prefix: 'permanent', label: 'Permanent Address' },
                    { prefix: 'current', label: 'Current / Official Address' },
                    { prefix: 'residing', label: 'Residing Address' },
                  ].map(({ prefix, label }) => (
                    <Grid item xs={12} md={4} key={prefix}>
                      <Paper sx={{ p: 2, background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>{label}</Typography>
                        <Stack spacing={1.5}>
                          <TextField fullWidth label="City" value={filters[`${prefix}City`]} onChange={set(`${prefix}City`)} />
                          <TextField fullWidth label="State" value={filters[`${prefix}State`]} onChange={set(`${prefix}State`)} />
                          <TextField fullWidth label="Country" value={filters[`${prefix}Country`]} onChange={set(`${prefix}Country`)} />
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* ════ SECTION 6: Official ════ */}
            <Accordion expanded={!!expanded['Official Details']} onChange={() => toggle('Official Details')}>
              <AccordionSummary expandIcon={<Icon>▾</Icon>}>
                <SectionTitle title="Official Details" />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DateRange label="Date of Joining" from={filters.dateOfJoiningFrom} to={filters.dateOfJoiningTo}
                      onFrom={set('dateOfJoiningFrom')} onTo={set('dateOfJoiningTo')} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateRange label="Date of Leaving" from={filters.dateOfLeavingFrom} to={filters.dateOfLeavingTo}
                      onFrom={set('dateOfLeavingFrom')} onTo={set('dateOfLeavingTo')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <SelectField label="Official Status" id="offStatus" options={OFFICIAL_STATUS} value={filters.officialStatus} onChange={set('officialStatus')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControlLabel control={<Switch checked={filters.selfSupport} onChange={setToggle('selfSupport')} color="primary" />} label="Self Support" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="No. of Churches" value={filters.noOfChurches} onChange={set('noOfChurches')} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* ════ SECTION 7: Ministry ════ */}
            <Accordion expanded={!!expanded['Support & Ministry']} onChange={() => toggle('Support & Ministry')}>
              <AccordionSummary expandIcon={<Icon>▾</Icon>}>
                <SectionTitle title="Support & Ministry" />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <SelectField label="Designation" id="desig" options={DESIGNATIONS} value={filters.designation} onChange={set('designation')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Other Designation" value={filters.otherDesignation} onChange={set('otherDesignation')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <SelectField label="Department" id="dept" options={DEPARTMENTS} value={filters.department} onChange={set('department')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <SelectField label="Type of Family" id="family" options={FAMILY_TYPES} value={filters.typeOfFamily} onChange={set('typeOfFamily')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControlLabel control={<Switch checked={filters.withChurch} onChange={setToggle('withChurch')} color="primary" />} label="With Church" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Years in Ministry" value={filters.yearsInMinistry} onChange={set('yearsInMinistry')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Self Support" value={filters.selfSupport} onChange={set('selfSupport')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Total Amount" value={filters.totalAmount} onChange={set('totalAmount')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Monthly Deduction" value={filters.monthlyDeduction} onChange={set('monthlyDeduction')} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* ════ SECTION 8: Support Structure ════ */}
            <Accordion expanded={!!expanded['Support Structure']} onChange={() => toggle('Support Structure')}>
              <AccordionSummary expandIcon={<Icon>▾</Icon>}>
                <SectionTitle title="Support Structure" />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel control={<Switch checked={filters.supportEnabled} onChange={setToggle('supportEnabled')} color="primary" />} label="Support Enabled" />
                  </Grid>
                 <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Basic Salary" value={filters.basic} onChange={set('basic')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="HRA" value={filters.HRA} onChange={set('HRA')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Tel Allowance" value={filters.telAllowance} onChange={set('telAllowance')} />
                  </Grid>
                 <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="Impact Deduction" value={filters.impactDeduction} onChange={set('impactDeduction')} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField fullWidth label="MUT Deduction" value={filters.MUTDeduction} onChange={set('MUTDeduction')} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* ════ SECTION 9: Insurance ════ */}
            <Accordion expanded={!!expanded['Insurance']} onChange={() => toggle('Insurance')}>
              <AccordionSummary expandIcon={<Icon>▾</Icon>}>
                <SectionTitle title="Insurance" />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Impact No." value={filters.impactNo} onChange={set('impactNo')} placeholder="Insurance ID..." />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Nominee" value={filters.nominee} onChange={set('nominee')} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Relation" value={filters.relation} onChange={set('relation')} placeholder="e.g. Spouse, Parent..." />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* ── Footer Action Bar ── */}
            <Paper sx={{ mt: 3, p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(37,99,235,0.04)', borderColor: 'rgba(37,99,235,0.15)' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {textFilters.length === 0 ?
                    'No filters applied — all records will be returned' :
                    `${textFilters.length} filter${textFilters.length !== 1 ? 's' : ''} active`}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1.5}>
                <Button variant="outlined" onClick={clearAll}
                  sx={{ borderColor: 'rgba(255,255,255,0.15)', color: 'text.secondary' }}>
              Reset All
                </Button>
                <Button variant="outlined" color="secondary"
                  sx={{ borderColor: 'rgba(8,145,178,0.4)' }}>
              Save Filter
                </Button>
                <Button variant="contained" size="medium" startIcon={<Icon>🔍</Icon>}>
              Run Report
                </Button>
              </Stack>
            </Paper>

          </Box>

        </ThemeProvider>
      </CommonPageLayout>}

      { viewData&& <CommonPageLayout title="Custom report" momentFilter={{
        dateRange: dateRange,
        onChange: (newDateRange) => {
          setDateRange(newDateRange);
          setData((iroReq) =>
            iroReq ?
              iroReq.filter((iro) =>
                moment(iro.IRODate).isSameOrAfter(moment(newDateRange.startDate)) &&
                  moment(iro.IRODate).isSameOrBefore(moment(newDateRange.endDate)),
              ) :
              [],
          );
        },
        rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
        initialRange: 'months',
      }}>
        <Card sx={{ maxWidth: '78vw', height: '90vh', alignItems: 'center' }}>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={6}>
              {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
              <TextField
                label="Search"
                variant="outlined"
                value={searchText}
                placeholder='Enter IROno or IRODate or Division or SubCategory'
                onChange={handleSearchChange}
                fullWidth />
              {/* </div> */}
            </Grid>
            <Grid item xs={6}>


            </Grid>


            {/* <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} style={{ height: '75vh', width: '100%' }} getRowClassName={(params) => {
                          if (params.row.specialsanction == 'Yes') {
                            return 'special-sanction'; // Class for rows with special sanction
                          }
                          return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'; // Default classes
                        } }
                        components={{
                          Footer: CustomFooter,
                        }} /> */}
            <Box sx={{ width: '95%', margin: 'auto', mt: 2, p: 2 }}>
              {/* Top Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button onClick={() => setViewData(false)} variant="contained">FILTERS</Button>
                <Button
                  onClick={()=>{
                    setPrint(true);
                  }}
                  // onClick={async () => {
                  //   const sheet = data ?
                  //     data.map((iro: any) => [
                  //       iro.IROno,
                  //       moment(iro.IRODate).format('DD/MM/YYYY'),
                  //       iro.divisionData?.details?.name,
                  //       iro.purposeSubdivision?.name,
                  //       iro.particularsData.mainCategory,
                  //       iro.particularsData.requestAmount,
                  //       iro.particularsData.sanctionedAmount,
                  //       iro.sanctionedBank,
                  //       iro.particularsData.sanctionedAsPer,
                  //       iro.releaseAmount?.releaseAmount,
                  //       iro.releaseAmount?.transferredDate?.format('DD/MM/YYYY'),
                  //       IROLifeCycleStates.getStatusNameByCodeTransaction(iro.status).replaceAll('_', ' '),
                  //     ]) :
                  //     [];

                  //   const headers = [
                  //     'IRO No',
                  //     'Date',
                  //     'Status',
                  //     'Division',
                  //     'Sub Division',
                  //     'Main Category',
                  //     'Sub Category',
                  //     'Requested Amt',
                  //     'Sanctioned Amt',
                  //     'Sanctioned Bank',
                  //     'Beneficiary Name',
                  //     // 'Sanctioned As per',
                  //     // 'Released Amt',
                  //     // 'Released Date',
                  //   ];

                  //   // eslint-disable-next-line new-cap
                  //   const doc = new jsPDF({
                  //     orientation: 'landscape', // Use landscape for better table fitting
                  //     unit: 'mm',
                  //     format: 'a4',
                  //   });

                  //   doc.setFontSize(14);
                  //   doc.text('Custom IRO Report', 14, 10);

                  //   (doc as any).autoTable({
                  //     head: [selectedData],
                  //     body: sheet,
                  //     startY: 20,
                  //     theme: 'grid',
                  //     headStyles: { fontSize: 9, halign: 'center', fillColor: [22, 160, 133], cellPadding: 2, rotation: 45 },
                  //     pageBreak: 'auto',

                  //     styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
                  //     columnStyles: {
                  //       0: { cellWidth: 'auto' },
                  //       1: { cellWidth: 20 }, // Adjust width manually for some columns
                  //       2: { cellWidth: 20 },
                  //       3: { cellWidth: 25 },
                  //       4: { cellWidth: 25 },
                  //       // Set other columns to auto-fit
                  //     },
                  //     margin: { top: 20, left: 5, right: 5 },
                  //   });


                  //   doc.save('Custom_IRO_Report.pdf');
                  // }
                  // }
                  startIcon={<DownloadingOutlined />}
                  color="primary"
                  sx={{ float: 'right', mr: 0, mt: 0 }}
                  variant="contained"
                >
          Export PDF
                </Button>
                <Button
                  onClick={async () => {
                    const sheet = data ?
                      data.map((iro: any, index) => {
                        const row = [
                          index +1,
                          selectedData.includes('Worker Code') ? iro.workerCode ?? iro.staffCode : undefined,
                          selectedData.includes('Name') && iro.basicDetails?.firstName + ' ' + iro.basicDetails?.lastName,
                          selectedData.includes('Division') && iro.divisionData?.details?.name,
                          selectedData.includes('SubDivision') && iro.officialDetails?.divisionHistory?.[0]?.subDivision?.name,
                          selectedData.includes('Narration') && iro.particularsData?.narration,
                          selectedData.includes('Sanction Amount') && formatAmount(iro.particularsData?.sanctionedAmount),
                          selectedData.includes('Sanction as per') && iro.particularsData?.sanctionedAsPer,
                          selectedData.includes('IRO No') && iro.IROdata?.IROno,
                          selectedData.includes('Status') && IROLifeCycleStates.getStatusNameByCodeTransaction(iro.status).replaceAll('_', ' '),
                          selectedData.includes('Sub-Division') && iro.subDivData?.name,
                          selectedData.includes('Main Category') && iro.particularsData?.mainCategory,
                          selectedData.includes('Sub Category 1') && iro.particularsData?.subCategory1,
                          selectedData.includes('Sub Category 2') && iro.particularsData?.subCategory2,
                          selectedData.includes('Sub Category 3') && iro.particularsData?.subCategory3,
                          selectedData.includes('For the month') && iro.particularsData?.month,
                          selectedData.includes('Requested Amount') && iro.particularsData?.requestedAmount,
                          selectedData.includes('Sanctioned Bank') && iro.sanctionedBank,
                          selectedData.includes('Beneficiary Name') && iro.sanctionedBank?.split('-').slice(1).join('-').trim(),
                          selectedData.includes('Mode of Payment') && iro.releaseAmountData?.modeOfPayment,
                          selectedData.includes('Amount Release Date') && moment(iro.releaseAmountData?.transferredDate).format('DD/MM/YYYY'),
                          selectedData.includes('IroClosedOn') && moment(iro?.iroClosedOn).format('DD/MM/YYYY'),
                          selectedData.includes('Source Of Account') && iro?.sourceOfAccount,
                          selectedData.includes('ReleaseAmount') && iro.releaseAmountData?.releaseAmount,
                          selectedData.includes('Last Updated') && moment(iro.updatedAt).format('DD/MM/YYYY'),
                        ].filter((value) => value !== false); // Remove only `false`, keep others

                        return row;
                      }) :
                      [];

                    const worksheet = XLSX.utils.json_to_sheet(sheet);
                    const workbook = XLSX.utils.book_new();

                    // Add column headers dynamically based on `selectedData`
                    XLSX.utils.sheet_add_aoa(worksheet, [selectedData], { origin: 'A1' });

                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                    XLSX.writeFile(workbook, 'Custom_IRO_Report.xlsx', { compression: true });
                  }}
                  startIcon={<DownloadingOutlined />}
                  color="primary"
                  // sx={{ float: 'right', mr: 2, mt: 2 }}
                  variant="contained"
                >
          Export Excel
                </Button>
                {/* <Button variant="contained" startIcon={<Print />}>
                  PRINT
                        </Button> */}
                <Box sx={{ flexGrow: 1 }} />
                {/* <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: 'blue' }}>
                  SELECT DATA
                </Button> */}
              </Box>

              {/* Search Field */}
              {/* <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ mb: 2 }}
                          /> */}

              {/* Table */}
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 400, overflow: 'auto' }} // Set height and enable scrolling
              >
                <Table stickyHeader> {/* Ensure header stays visible */}
                  <TableHead sx={{ height: 10, backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Sl No</TableCell>
                      {selectedData.includes('Worker Code') && <TableCell sx={{ fontWeight: 'bold' }}>Worker Code</TableCell>}
                      {selectedData.includes('IRO No') && <TableCell sx={{ fontWeight: 'bold' }}>IRO No</TableCell>}
                      {selectedData.includes('Name') && <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>}
                      {selectedData.includes('Status') && <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>}
                      {/* {selectedData.includes('IRO Status') && <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>} */}
                      {selectedData.includes('Division') && <TableCell sx={{ fontWeight: 'bold' }}>Division Name</TableCell>}
                      {selectedData.includes('SubDivision') &&<TableCell sx={{ fontWeight: 'bold', width: '150px' }}>Sub Division Name</TableCell>}
                      {selectedData.includes('Main Category') && <TableCell sx={{ fontWeight: 'bold' }}>Main Category</TableCell>}
                      {selectedData.includes('Sub Category 1') && <TableCell sx={{ fontWeight: 'bold' }}>Sub Category 1</TableCell>}
                      {selectedData.includes('Sub Category 2') && <TableCell sx={{ fontWeight: 'bold' }}>Sub Category 2</TableCell>}
                      {selectedData.includes('Sub Category 3') && <TableCell sx={{ fontWeight: 'bold' }}>Sub Category 3</TableCell>}
                      {selectedData.includes('Requested Amount') && <TableCell sx={{ fontWeight: 'bold' }}>Requested Amount</TableCell>}
                      {selectedData.includes('Sanction Amount') && <TableCell sx={{ fontWeight: 'bold' }}>Sanction Amount</TableCell>}
                      {selectedData.includes('Sanctioned Bank') && <TableCell sx={{ fontWeight: 'bold' }}>Sanctioned Bank</TableCell>}
                      {selectedData.includes('Beneficiary Name') && <TableCell sx={{ fontWeight: 'bold' }}>Beneficiary Name</TableCell>}
                      {selectedData.includes('For the month') && <TableCell sx={{ fontWeight: 'bold', width: '150px' }}>For the month</TableCell>}
                      {selectedData.includes('Mode of Payment') && <TableCell sx={{ fontWeight: 'bold' }}>Mode of Payment</TableCell>}
                      {selectedData.includes('Amount Release Date') && <TableCell sx={{ fontWeight: 'bold' }}>Amount Release Date</TableCell>}
                      {selectedData.includes('Sanction as per') && <TableCell sx={{ fontWeight: 'bold' }}>Sanction as per</TableCell>}
                      {selectedData.includes('Narration') && <TableCell sx={{ fontWeight: 'bold' }}>Narration</TableCell>}
                      {/* {selectedData.includes('UnitPrice') && <TableCell sx={{ fontWeight: 'bold' }}>UnitPrice</TableCell>} */}
                      {/* {selectedData.includes('Beneficiary Name') && <TableCell sx={{ fontWeight: 'bold' }}>Beneficiary Name</TableCell>} */}
                      {selectedData.includes('IroClosedOn') && <TableCell sx={{ fontWeight: 'bold' }}>Iro Closed On</TableCell>}
                      {/* {selectedData.includes('ApprovedBy') && <TableCell sx={{ fontWeight: 'bold' }}>Approved By</TableCell>} */}
                      {selectedData.includes('Source Of Account') && <TableCell sx={{ fontWeight: 'bold' }}>Source Of Account</TableCell>}
                      {selectedData.includes('Last Updated') &&<TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows.map((row: any, index) => (
                      <TableRow
                        key={row.id}
                        onClick={() => setSelectedRow(row.id)}
                        sx={{
                          'backgroundColor': selectedRow === row.id ? '#d7cdf7' : 'inherit',
                          'cursor': 'pointer',
                          '&:hover': { backgroundColor: '#f0f0f0' },
                        }}
                      >
                        <TableCell>{index +1}</TableCell>
                        {selectedData.includes('Worker Code') && <TableCell>{row.workerCode??row.staffCode }</TableCell>}
                        {selectedData.includes('IRO No') && <TableCell>{row.IROdata?.IROno}</TableCell>}
                        {selectedData.includes('Name') && <TableCell>{row.basicDetails?.firstName + ' ' + row.basicDetails?.lastName}</TableCell>}
                        {selectedData.includes('Status') && <TableCell>{IROLifeCycleStates.getStatusNameByCodeTransaction(row.status).replaceAll('_', ' ')}</TableCell>}
                        {selectedData.includes('Division') && <TableCell>{row.division?.details?.name}</TableCell>}
                        {selectedData.includes('SubDivision') && <TableCell>{row.officialDetails?.divisionHistory?.[0]?.subDivision?.name}</TableCell>}
                        {selectedData.includes('Main Category') && <TableCell>{row.particularsData?.mainCategory}</TableCell>}
                        {selectedData.includes('Sub Category 1') && <TableCell>{row.particularsData?.subCategory1}</TableCell>}
                        {selectedData.includes('Sub Category 2') && <TableCell>{row.particularsData?.subCategory2}</TableCell>}
                        {selectedData.includes('Sub Category 3') && <TableCell>{row.particularsData?.subCategory3}</TableCell>}
                        {selectedData.includes('Requested Amount') && <TableCell>{formatAmount(row.particularsData?.requestedAmount)}</TableCell>}
                        {selectedData.includes('Sanction Amount') && <TableCell>{ formatAmount(row.particularsData?.sanctionedAmount)}</TableCell>}
                        {selectedData.includes('Sanctioned Bank') && <TableCell>{row.sanctionedBank}</TableCell>}
                        {selectedData.includes('Beneficiary Name') && <TableCell>{row.sanctionedBank?.split('-').slice(1).join('-').trim()}</TableCell>}
                        {selectedData.includes('For the month') && <TableCell>{row.particularsData?.month}</TableCell>}
                        {selectedData.includes('Mode of Payment') && <TableCell>{row.releaseAmountData?.modeOfPayment}</TableCell>}
                        {selectedData.includes('Amount Release Date') && <TableCell>{moment(row.releaseAmountData?.transferredDate).format('DD/MM/YYYY')}</TableCell>}
                        {selectedData.includes('Sanction as per') && <TableCell>{row.particularsData?.sanctionedAsPer}</TableCell>}
                        {selectedData.includes('Narration') && <TableCell>{row.particularsData?.narration}</TableCell>}
                        {selectedData.includes('IroClosedOn') && <TableCell>{moment(row.iroClosedOn).format('DD/MM/YYYY')}</TableCell>}
                        {selectedData.includes('Source Of Account') && <TableCell>{row.sourceOfAccount}</TableCell>}
                        {selectedData.includes('Last Updated') && <TableCell>{moment(row.updatedAt).format('DD/MM/YYYY')}</TableCell>}
                        {/* <TableCell>{row.approvedBy  }</TableCell> */}

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Bottom Export Button */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  background: '#f0f0f0',
                  fontWeight: 'bold',
                  borderTop: '1px solid black',
                }}
              >
                {/* <span>Total:</span>

                <span>
                  {`Requested amt : ₹${formatAmount(totalRequested.toFixed(2))}`}
                  <br />

                </span>

                <span>
                  {`Sanctioned amt : ₹${formatAmount(totalSanctioned.toFixed(2))}`}
                  <br />

                </span> */}
              </Box>
              {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<SaveAlt />}
                          sx={{ backgroundColor: 'blue' }}
                        >
                  EXPORT
                        </Button>
                      </Box> */}
            </Box>


          </Grid>
        </Card>
        <Dialog open={print} onClose={() => setPrint(false)} maxWidth="xs" fullWidth>
          <DialogTitle> Print  Details </DialogTitle>
          <DialogContent>
            <Container>
  Downloading Custom report Users
              <br />

              {selectedData.length === 7 ? (
                <BlobProvider
                  document={
                    <PDFTemplateCustomUsers
                      rowData={data as any}
                      headers={selectedData}
                    />
                  }
                >
                  {({ loading, url }) =>
                    loading ? (
                      <span style={{ color: 'blue' }}>....</span>
                    ) : (
                      <a
                        href={url ?? ''}
                        download="CustomReport.pdf"
                        style={{ color: 'blue' }}
                      >
            CustomReport.pdf
                      </a>
                    )
                  }
                </BlobProvider>
              ) : (
                <BlobProvider
                  document={
                    <PDFTemplateCustomUsers
                      rowData={data as any}
                      headers={selectedData}
                    />
                  }
                >
                  {({ loading, url }) =>
                    loading ? (
                      <span style={{ color: 'blue' }}>....</span>
                    ) : (
                      <a
                        href={url ?? ''}
                        download="CustomReport.pdf"
                        style={{ color: 'blue' }}
                      >
            CustomReport.pdf
                      </a>
                    )
                  }
                </BlobProvider>
              )}
            </Container>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setPrint(false);
              }}
              variant="text"
            >
                  Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </CommonPageLayout>}
    </>


  );
}
