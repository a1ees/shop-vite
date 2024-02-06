import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import cat from "../api/cat.json"
import './SectionCard.scss';
import CardTemplate from "./CardTemplate";
import Input from "./UI/Input";
import BackButton from "./UI/BackButton";
import {Item, Service} from "../ts/interfaces/catlist_interfaces";

type СatList = {
    list: Item[];
}
const SectionCard: React.FC = () => {

    const [cardList, setCardList] = useState<(Item | Service)[]>([]);
    const { list } = cat as СatList;

    const [searchValue, setSearchValue] = useState<string>('');
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const shouldShowButton = pathname !== '/';

    const goBack = () => { // коллбек для кнопки назад
        const currenPathArr = pathname.slice(1).split('/')
        currenPathArr.pop();
        navigate(`/${currenPathArr.join('/')}`);
    };

    const handleSearchChange = (inputValue: string) => {
        navigate('/')
        setSearchValue(inputValue)
    }

    // получает карточки исходя из данных в пути
    const getCardListByPath = useCallback((list: Item[] | Service[] | undefined, pathArray: string[]): Service[] | Item[] | undefined | false => {
        if (!list) {
            return false;
        }
        const currentId = Number(pathArray.shift());
        const filteredItem = list.find(item => item.id === currentId);

        if (!filteredItem) {
            return false
        }

        if ('services' in filteredItem) {
            const newList = filteredItem.services;
            return pathArray.length === 0 ? newList : getCardListByPath(newList, pathArray);
        }

        if ('subcategory' in filteredItem) {
            const newList = filteredItem.subcategory;
            return pathArray.length === 0 ? newList : getCardListByPath(newList, pathArray);
        }

        return false;
    }, []);

    const filteredCards = useMemo(() => {
        const flattenList = (list: Item[]) => {
            const getSecondLevel: (Item | Service)[] = list
                .map((item) => {
                    if (!item) {
                        return [];
                    }
                    if ('subcategory' in item) {
                        return item.subcategory || [];
                    }
                    if ('services' in item) {
                        return item.services || [];
                    }
                    return [];
                })
                .flat();

            return getSecondLevel.map((item) =>
                "services" in item && item.services || item
            ).flat();
        };

        const filteredFlattenList = (list: Item[], searchValue: string) => {
            const cards = flattenList(list);
            const searchValueUpper = searchValue.toUpperCase();
            return cards.filter(card =>
                card.name.toUpperCase().includes(searchValueUpper)
            );
        };

        return filteredFlattenList(list, searchValue);
    }, [list, searchValue]);

    const findMinPrice = (item: Item | Service): number => {
        if ("services" in item && item.services) {
            return Math.min(...item.services.map(service => service.price));
        }

        if ("subcategory" in item && item.subcategory) {
            return Math.min(...item.subcategory.map(findMinPrice));
        }

        if ("price" in item) {
            return item.price;
        }

        return 0;

    };

    const getMinPrice = (item: Item | Service): string => { // получаем строку с стоимостью
        const minPrice = findMinPrice(item);
        if ("services" in item || "subcategory" in item) {
            return `Минимальная стоимость в данной категории: ${minPrice}`;
        }

        return `Цена: ${minPrice}`;
    };

    useEffect(() => { // при монтировании компонента определяем по каким данным рендрить карточки
        const renderToPathname = pathname.length > 1;

        if (renderToPathname) {
            const pathArray = pathname.slice(1).split('/');
            const cardListByPath = getCardListByPath(list, pathArray);
            return cardListByPath ? setCardList(cardListByPath) : undefined;
        }

        return setCardList(list);
    }, [list, pathname, getCardListByPath])

    return (
        <div className="cards">
            <Input additionalClass="cards__input" searchValue={searchValue} setSearchValue={handleSearchChange}/>

            {shouldShowButton &&
                <BackButton additionalClass="cards__button" onClick={goBack}/>
            }

            <div className="cards__items">
                {searchValue.length === 0 && cardList.length > 0 &&
                    cardList.map((item, index) =>
                        <CardTemplate
                            key={index}
                            item={item}
                            minPrice={getMinPrice(item)}
                        />
                    )
                }

                {searchValue.length > 0 && filteredCards.length > 0 &&
                    filteredCards.map((item, index) =>
                        <CardTemplate
                            key={index}
                            item={item}
                            minPrice={getMinPrice(item)}
                        />
                    )
                }

                {searchValue.length > 0 && filteredCards.length === 0 &&
                    <div className="cards__not-found">Товаров не найдено</div>
                }
            </div>
        </div>
    );
};

export default SectionCard;
