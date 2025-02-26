import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';



const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

return (
    <button className="toggle1" onClick={toggleTheme}>
         {theme === 'light' ? 'Dark' : 'Light'} 
    </button>
);
};
export default ThemeToggle;
