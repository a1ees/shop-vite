import "./assets/vendor/normalize.scss"
import "./assets/vendor/fonts/fonts.css"
import "./assets/styles/theme-styles.css"
import './App.scss';
import {useTheme} from "./hooks/useTheme.tsx";
import ThemeSelect from "./components/UI/ThemeSelect.tsx";
import {Outlet} from "react-router-dom";

function App() {
    const { theme, setTheme } = useTheme();

    return (
        <div className='page'>
            <div className='page__sidebar'>
                <ThemeSelect additionalClass="page__theme-select" theme={theme} setTheme={setTheme}/>
            </div>
            <div className="page__container container">
                <Outlet />
            </div>
        </div>
    )
}

export default App
