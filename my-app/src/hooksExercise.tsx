import React, { useState, useEffect, useContext} from 'react';
import { ThemeContext, themes } from "./themeContext";
import App from './App';

//function to change light and dark modes
export function ToggleTheme() {
  //manages the current theme -> uses light as default 
  const [currentTheme, setCurrentTheme] = useState(themes.light);
 
  const toggleTheme = () => {
    //switches between light and dark mode 
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };
 
  return (
    //changes children to current theme 
    <ThemeContext.Provider value={currentTheme}>
      <button onClick={toggleTheme}> Toggle Theme </button>
      <ClickCounter />
    </ThemeContext.Provider>
  );
 }
 
 export default ToggleTheme;
//tracks number of times a button is clicked and changes between light and dark mode 
export function ClickCounter() {
  //used to track number of times the button is clicked 
  const [count, setCount] = useState(0);
  //incremements clicker count by 1 
  const handleClick = () => {
    setCount(count + 1);
  };
  //takes current theme (between light and dark)
  const theme = useContext(ThemeContext);
  //changes tab name
  useEffect(() => {
    document.title = `sticky notes`;
  }, [count]);
  //styling for clicker 
  return (
    <div
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: "20px",
      }}
    >
      <p>You clicked {count} times </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ background: theme.foreground, color: theme.background }}
      >
        Click me
      </button>
    </div>
  );
}