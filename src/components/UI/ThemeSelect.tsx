import React from 'react';
import './ThemeSelect.scss';

interface ThemeSelectProps {
    theme: 'dark' | 'light';
    setTheme: (theme: 'dark' | 'light') => void;
    additionalClass?: string;
}

const ThemeSelect: React.FC<ThemeSelectProps> = ({ theme, setTheme, additionalClass }) => {
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const isInputChecked = (currentTheme: string) => {
        return currentTheme === 'dark';
    };

    return (
        <div className={`theme-select ${additionalClass}`}>
            <label className="theme-select__switch">
                <input type="checkbox" onChange={toggleTheme} checked={isInputChecked(theme)}/>
                <span className="theme-select__slider round"></span>
            </label>
        </div>
    );
};

export default ThemeSelect;

