import { useLayoutEffect, useState } from "react";

type Theme = 'dark' | 'light';

export const useTheme = (): { theme: Theme, setTheme: (theme: Theme) => void } => {
    const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme: Theme = isDarkTheme ? 'dark' : 'light';

    const storedTheme = localStorage.getItem('app-theme');
    const initialTheme: Theme = (storedTheme && (storedTheme === 'dark' || storedTheme === 'light')) ? storedTheme : defaultTheme;

    const [theme, setTheme] = useState<Theme>(initialTheme);

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    return { theme, setTheme };
};
