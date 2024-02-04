import React, {ButtonHTMLAttributes} from 'react';
import './BackButton.scss';
interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    onClick: () => void;
    additionalClass?: string;
}
const BackButton: React.FC<BackButtonProps> = ({ onClick, additionalClass, ...rest }) => {

    return (
        <button className={`back-button ${additionalClass}`} onClick={onClick} {...rest}>
            Назад
        </button>
    );
};

export default BackButton;

