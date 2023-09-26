'use client';
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  ThemeProvider,
  createTheme
} from '@mui/material';
import Box from '@mui/material/Box';
import { Controller, useFormContext } from 'react-hook-form';
import Button from '../button';

import { ApplicationData } from '@app/applications/page';
import strings from '@app/consts/strings.json';
import { Country } from '@app/types/country';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ArrowDown from '@public/assets/ArrowDown';
import CloseIcon from '@public/assets/CloseIcon';
import { useState } from 'react';
import styles from './modal.module.scss';

interface Props {
  isOpen: boolean;
  countries: Country[] | null;
  programsAndCategories: string[];
  closeModal: () => void;
  onSubmit: (data: ApplicationData) => void;
}

function Modal({ isOpen, closeModal, onSubmit, countries, programsAndCategories }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useFormContext<ApplicationData>();
  const [phonePrefix, setPhonePrefix] = useState('');

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <Box padding={3} paddingBottom={0} display="flex" justifyContent="space-between">
        <DialogTitle className={styles.dialogTitle}>{strings.applications.modal.title}</DialogTitle>
        <IconButton className={styles.closeIcon} aria-label="close" onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <ThemeProvider theme={theme}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Box className={styles.fieldRow}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { name, onChange, value } }) => (
                  <Box className={styles.inputWrapper}>
                    <InputLabel className={styles.inputLabel}>
                      {strings.applications.modal.labels.firstName}
                    </InputLabel>
                    <TextField
                      fullWidth
                      name={name}
                      value={value}
                      onChange={onChange}
                      InputProps={{ classes: { input: styles.input } }}
                      placeholder={strings.applications.modal.placeholders.firstName}
                    />
                  </Box>
                )}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { name, onChange, value } }) => (
                  <Box className={styles.inputWrapper}>
                    <InputLabel className={styles.inputLabel}>
                      {strings.applications.modal.labels.lastName}
                    </InputLabel>
                    <TextField
                      fullWidth
                      name={name}
                      value={value}
                      onChange={onChange}
                      placeholder={strings.applications.modal.placeholders.lastName}
                      InputProps={{ classes: { input: styles.input } }}
                    />
                  </Box>
                )}
              />
              <Controller
                name="country"
                control={control}
                defaultValue={undefined}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="country"
                    options={countries || []}
                    getOptionLabel={(option) => `${option.flag} ${option.code}`}
                    onChange={(_e, item) => {
                      setPhonePrefix(`+${phonePrefix}${item?.phoneCode}`);
                      onChange(item);
                    }}
                    value={
                      value && typeof value !== 'string'
                        ? countries?.find((option) => {
                            return value.code === option.code;
                          }) ?? null
                        : null
                    }
                    popupIcon={<ArrowDown />}
                    className={styles.autocomplete}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={strings.applications.modal.labels.country}
                        placeholder={strings.applications.modal.placeholders.country}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password',
                          className: styles.input
                        }}
                      />
                    )}
                  />
                )}
              />
            </Box>
            <Box className={styles.fieldRow}>
              <Controller
                name="programAndCategory"
                control={control}
                defaultValue={''}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="programsAndCategories"
                    options={programsAndCategories}
                    getOptionLabel={(option) => option}
                    onChange={(_e, item) => {
                      onChange(item);
                    }}
                    value={value}
                    popupIcon={<ArrowDown />}
                    className={styles.programs}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={strings.applications.modal.labels.programAndCategory}
                        placeholder={strings.applications.modal.placeholders.programAndCategory}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password',
                          className: styles.input
                        }}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="dateOfBirth"
                control={control}
                defaultValue={undefined}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      className={styles.datePicker}
                      label={strings.applications.modal.labels.dateOfBirth}
                      slotProps={{
                        textField: {
                          placeholder: strings.applications.modal.placeholders.dateOfBirth
                        }
                      }}
                      onChange={onChange}
                      value={value}
                      disableFuture
                      autoFocus
                      closeOnSelect
                    />
                  </LocalizationProvider>
                )}
              />
            </Box>
            <Box className={styles.fieldRow}>
              <Controller
                name="club"
                control={control}
                defaultValue=""
                render={({ field: { name, onChange, value } }) => (
                  <Box className={styles.inputWrapper}>
                    <InputLabel className={styles.inputLabel}>
                      {strings.applications.modal.labels.club}
                    </InputLabel>
                    <TextField
                      fullWidth
                      className={styles.optionalField}
                      name={name}
                      value={value}
                      onChange={onChange}
                      placeholder={strings.applications.modal.placeholders.club}
                      InputProps={{ classes: { input: styles.input } }}
                    />
                  </Box>
                )}
              />
              <Controller
                name="teamName"
                control={control}
                defaultValue=""
                render={({ field: { name, onChange, value } }) => (
                  <Box className={styles.inputWrapper}>
                    <InputLabel className={styles.inputLabel}>
                      {strings.applications.modal.labels.team}
                    </InputLabel>
                    <TextField
                      fullWidth
                      className={styles.optionalField}
                      name={name}
                      value={value}
                      onChange={onChange}
                      placeholder={strings.applications.modal.placeholders.team}
                      InputProps={{ classes: { input: styles.input } }}
                    />
                  </Box>
                )}
              />
            </Box>
            <Box className={styles.fieldRow}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field: { name, onChange, value } }) => (
                  <Box className={styles.inputWrapper}>
                    <InputLabel className={styles.inputLabel}>
                      {strings.applications.modal.labels.phone}
                    </InputLabel>
                    <TextField
                      className={styles.optionalField}
                      name={name}
                      value={value}
                      onChange={onChange}
                      type="tel"
                      placeholder={strings.applications.modal.placeholders.phone}
                      InputProps={{
                        classes: { input: styles.input },
                        startAdornment: (
                          <InputAdornment position="start">{phonePrefix}</InputAdornment>
                        )
                      }}
                    />
                  </Box>
                )}
              />
              {Object.keys(errors).length > 0 && (
                <p className={styles.fieldError}>{strings.applications.modal.fieldError}</p>
              )}
            </Box>
          </form>
        </ThemeProvider>
      </DialogContent>
      <Divider className={styles.divider} />
      <DialogActions className={styles.actionButtons}>
        <Button
          className={styles.cancelButton}
          variant="underlined"
          onClick={() => {
            reset();
            closeModal();
          }}>
          {strings.applications.modal.buttonCancel}
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant="primary">
          {strings.applications.modal.buttonSave}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '8px 10px',
          fontSize: 14
        },
        notchedOutline: {
          '> legend': {
            width: 0
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          padding: 0,
          lineHeight: '20px',
          fontSize: 14
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: 'relative',
          transform: 'unset',
          marginBottom: '5px',
          color: '#38354D',
          fontSize: '12px',
          fontWeight: 600,
          lineHeight: '14px',
          fontFamily: 'Inter',
          fontStyle: 'normal'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          '.MuiPickersToolbar-root': {
            display: 'none'
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: 30
        }
      }
    }
  }
});

export default Modal;
