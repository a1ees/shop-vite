export type Item = {
    description: string;
    id: number;
    name: string;
    order: number;
} & (Subcategory | Services)

type Subcategory = {
    tag: "cat";
    subcategory?: Item[];
}

type Services = {
    tag: "subcat";
    services?: Service[];
}

export interface Service {
    code: string;
    id: number;
    name: string;
    price: number;
    tag: "serv";
}
