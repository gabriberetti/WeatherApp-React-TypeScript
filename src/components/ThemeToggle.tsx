import React from 'react';
import { IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 20,
        right: 20,
      }}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: isDark ? '#fff' : '#000',
        }}
      >
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
}; 