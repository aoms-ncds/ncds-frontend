/* eslint-disable react/no-multi-comp */
import { JSXElementConstructor, Key, ReactElement, ReactNode, useEffect, useState } from 'react';
import {
  ThemeProvider, createTheme, CssBaseline,
  Box, AppBar, Toolbar, Typography, Button, IconButton,
  Accordion, AccordionSummary, AccordionDetails,
  TextField, MenuItem, Grid, Chip, Stack,
  FormControl, InputLabel, Select, OutlinedInput,
  Slider, Switch, FormControlLabel, Divider,
  Paper, Badge, Tooltip, Autocomplete,
  InputAdornment, Avatar,
} from '@mui/material';
import CommonPageLayout from '../../../components/CommonPageLayout';
import { useNavigate } from 'react-router-dom';
import DivisionsServices from '../../Divisions/extras/DivisionsServices';
import { useAuth } from '../../../hooks/Authentication';

// ── Icons via Unicode/emoji since we can't import @mui/icons-material ──
const Icon = ({ children, sx = {} }: { children: ReactNode; sx?: object }) => (
  <Box component="span" sx={{ fontSize: 18, lineHeight: 1, ...sx }}>{children}</Box>
);

// ── Theme ──────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#d8e3fa', light: '#e1e7f0', dark: '#e3e4e9' },
    secondary: { main: '#0891b2' },
    background: { default: '#e9f0ff', paper: '#1e293b' },
    divider: 'rgba(255,255,255,0.08)',
    text: { primary: '#f1f5f9', secondary: '#94a3b8' },
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica", sans-serif',
    h5: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.02em' },
    subtitle2: { fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#64748b' },
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
    kind: '', status: '', division: '', organization: '', daughterOrganization: '', reasonForReject: '',
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
    noOfChurches: [0, 100],
    designation: '', otherDesignation: '', department: '', typeOfFamily: '',
    withChurch: false, percentSelfSupport: [0, 100],
    totalAmount: [0, 100000], monthlyDeduction: [0, 20000],
    yearsInMinistry: [0, 50],
    basic: [0, 50000], HRA: [0, 20000],
    telAllowance: [0, 5000], impactDeduction: [0, 5000], MUTDeduction: [0, 5000],
    supportEnabled: false,
    impactNo: '', nominee: '', relation: '',
  };
  const navigate = useNavigate();
  const [filters, setFilters] = useState(init);
  const [expanded, setExpanded] = useState({ 'Basic Details': true, 'User Type & Lifecycle': true });

  const set = (key: string) => (e: { target: { value: any } }) => setFilters((f) => ({ ...f, [key]: e?.target ? e.target.value : e }));
  const setSlider = (key: string) => (_: any, v: any) => setFilters((f) => ({ ...f, [key]: v }));
  const setToggle = (key: string) => (e: { target: { checked: any } }) => setFilters((f) => ({ ...f, [key]: e.target.checked }));
  const toggle = (panel: string) => setExpanded((e) => ({ ...e, [panel]: !e[panel] }));
  console.log(filters, 'filters');

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
  const user = useAuth();

  useEffect(() => {
    if ((user?.user as any).permissions.READ_ALL_DIVISIONS) {
      DivisionsServices.getDivisions().then((res) => {
        //   setDivision(res.data ?? null);
        setDivisions(res.data);
      });
    }
  }, []);

  return (
    <CommonPageLayout>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* ── AppBar ── */}
        <AppBar position="sticky" elevation={0} sx={{
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
              navigate('/custom-report/reportView');
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
                        <MenuItem key={d.id} value={d.details.name}>
                          {d.details.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField fullWidth label="Sub Division" value={filters.subDivision} onChange={set('subDivision')} placeholder="Sub Division" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <SelectField label="Status" id="status" options={LIFECYCLE} value={filters.status} onChange={set('status')} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField fullWidth label="Organization" value={filters.organization} onChange={set('organization')} />
                </Grid>
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
                <Grid item xs={12} sm={6} md={2}>
                  <TextField fullWidth label="Title" value={filters.title} onChange={set('title')} placeholder="Rev, Dr..." />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField fullWidth label="First Name" value={filters.firstName} onChange={set('firstName')} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField fullWidth label="Middle Name" value={filters.middleName} onChange={set('middleName')} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField fullWidth label="Last Name" value={filters.lastName} onChange={set('lastName')} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <SelectField label="Gender" id="gender" options={GENDER} value={filters.gender} onChange={set('gender')} />
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
                <Grid item xs={12} md={6}>
                  <FieldLabel>No. of Churches</FieldLabel>
                  <RangeSlider label="" value={filters.noOfChurches} onChange={setSlider('noOfChurches')} min={0} max={200} />
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
                <Grid item xs={12} md={4}>
                  <FieldLabel>Years in Ministry</FieldLabel>
                  <RangeSlider label="" value={filters.yearsInMinistry} onChange={setSlider('yearsInMinistry')} min={0} max={60} unit=" yrs" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel>% Self Support</FieldLabel>
                  <RangeSlider label="" value={filters.percentSelfSupport} onChange={setSlider('percentSelfSupport')} min={0} max={100} unit="%" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel>Total Amount (₹)</FieldLabel>
                  <RangeSlider label="" value={filters.totalAmount} onChange={setSlider('totalAmount')} min={0} max={200000} unit="₹" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel>Monthly Deduction (₹)</FieldLabel>
                  <RangeSlider label="" value={filters.monthlyDeduction} onChange={setSlider('monthlyDeduction')} min={0} max={50000} unit="₹" />
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
                <Grid item xs={12} md={4}>
                  <FieldLabel>Basic Salary (₹)</FieldLabel>
                  <RangeSlider label="" value={filters.basic} onChange={setSlider('basic')} min={0} max={100000} unit="₹" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel>HRA (₹)</FieldLabel>
                  <RangeSlider label="" value={filters.HRA} onChange={setSlider('HRA')} min={0} max={50000} unit="₹" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel>Tel Allowance (₹)</FieldLabel>
                  <RangeSlider label="" value={filters.telAllowance} onChange={setSlider('telAllowance')} min={0} max={10000} unit="₹" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel>Impact Deduction (₹)</FieldLabel>
                  <RangeSlider label="" value={filters.impactDeduction} onChange={setSlider('impactDeduction')} min={0} max={10000} unit="₹" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel>MUT Deduction (₹)</FieldLabel>
                  <RangeSlider label="" value={filters.MUTDeduction} onChange={setSlider('MUTDeduction')} min={0} max={10000} unit="₹" />
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
    </CommonPageLayout>
  );
}
