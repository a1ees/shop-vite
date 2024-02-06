export interface Item {
    description: string;
    id: number;
    name: string;
    order: number;
    tag: string;
    subcategory?: Item[];
    services?: Service[];
}

export interface Service {
    code: string;
    id: number;
    name: string;
    price: number;
    tag: string;
}

