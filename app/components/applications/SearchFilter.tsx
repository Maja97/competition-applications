import { TextField } from '@mui/material';
import SearchIcon from '@public/assets/SearchIcon';
import React from 'react';
import styles from './searchfilter.module.scss';

interface Props {
  placeholder?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

function SearchFilter({ placeholder, className, onChange }: Props) {
  return (
    <TextField
      type="search"
      inputProps={{ className: styles.input }}
      onChange={onChange}
      className={className}
      variant="outlined"
      InputProps={{
        startAdornment: <SearchIcon />
      }}
      placeholder={placeholder}
    />
  );
}

export default SearchFilter;
