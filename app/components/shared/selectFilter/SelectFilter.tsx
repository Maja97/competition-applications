import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { useState } from 'react';
import styles from './selectfilter.module.scss';

export const initialValue = 'All';

interface Props {
  label: string;
  options: { label: string; value: string }[];
  handleChange: (value: string) => void;
}

function SelectFilter({ label, options, handleChange }: Props) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: SelectChangeEvent) => {
    setValue(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <Box className={styles.wrapper}>
      <InputLabel className={styles.label}>{label}: </InputLabel>
      <ThemeProvider theme={theme}>
        <Select
          sx={{
            boxShadow: 'none',
            '.MuiOutlinedInput-notchedOutline': { border: 0 }
          }}
          defaultValue="All"
          value={value}
          classes={{ root: styles.select }}
          onChange={onChange}
          inputProps={{ className: styles.selectInput }}
          MenuProps={{
            PaperProps: {
              classes: { root: styles.selectMenu }
            }
          }}
          label={label}>
          {options.map((option, index) => (
            <MenuItem key={`menu-item-${option}-${index}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </ThemeProvider>
    </Box>
  );
}

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#ff842b !important',
          '> legend': {
            width: 0
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#ff842b80',
            '&:hover': {
              backgroundColor: '#ff842b80'
            }
          },
          '&:hover': {
            backgroundColor: '#ff842b80'
          }
        }
      }
    }
  }
});

export default SelectFilter;
