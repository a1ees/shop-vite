import {Link} from "react-router-dom";
import React from "react";
import "./CardTemplate.scss"
import {Item, Service} from "../ts/interfaces/catlist_interfaces.ts";

interface CardTemplateProps {
    item: Item | Service;
    minPrice: string;
}

const CardTemplate: React.FC<CardTemplateProps> = ({item, minPrice}) => {
    const generateLinkTo = (item: Item | Service): string => {
        if ("subcategory" in item || "services" in item) {
            return `${item.id}`
        }
        return ""
    };

    return (
        <Link
            to={generateLinkTo(item)}
            className="card"
        >
            <h2 className="card__name">{item.name}</h2>
            <p className="card__price">{minPrice || 'Цена не указана'}</p>
        </Link>
    );
}

export default CardTemplate;
