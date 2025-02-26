import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const ariaLabel = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';

  return (
    <button
      className="toggle1"
      onClick={toggleTheme}
      name="theme-toggle"
      aria-label={ariaLabel}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeToggle;
