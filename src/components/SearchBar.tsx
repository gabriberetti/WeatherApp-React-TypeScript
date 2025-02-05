import React, { useState } from 'react';
import { TextField, IconButton, Paper, CircularProgress } from '@mui/material';
import { Search as SearchIcon, MyLocation as MyLocationIcon } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onUseCurrentLocation: () => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onUseCurrentLocation, 
  loading = false 
}) => {
  const [city, setCity] = useState('');
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        margin: '20px auto',
        backgroundColor: isDark ? '#333' : '#fff',
      }}
    >
      <TextField
        sx={{
          ml: 1,
          flex: 1,
          '& .MuiInputBase-input': {
            color: isDark ? '#fff' : '#000',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
      />
      <IconButton 
        type="submit" 
        sx={{ p: '10px', color: isDark ? '#fff' : '#666' }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : <SearchIcon />}
      </IconButton>
      <IconButton
        sx={{ p: '10px', color: isDark ? '#fff' : '#666' }}
        onClick={onUseCurrentLocation}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : <MyLocationIcon />}
      </IconButton>
    </Paper>
  );
}; 