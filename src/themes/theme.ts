import { createTheme } from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#fff',
    success: '#4CD964',
    error: '#FF3B30',
  },
  darkColors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#181818',
    success: '#32D74B',
    error: '#FF453A',
  },
  components: {
    Button: {
      raised: true,
      buttonStyle: {
        borderRadius: 8,
        padding: 12,
      },
      titleStyle: {
        fontWeight: 'bold',
      },
    },
    Input: {
      inputStyle: {
        color: '#222',
      },
      containerStyle: {
        marginBottom: 16,
      },
    },
    // Extend more components as needed
  },
});
