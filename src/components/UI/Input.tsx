import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import "./Input.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    searchValue: string;
    setSearchValue: (value: string) => void;
    additionalClass?: string;
}

const Input: React.FC<InputProps> = ({ searchValue, setSearchValue, additionalClass, ...rest }) => {

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <input
            value={searchValue}
            onChange={handleSearchChange}
            placeholder='Поиск'
            className={`${additionalClass} input`}
            {...rest}
        />
    );
};

export default Input;

