import { Entry } from "./entry.model";

export interface User {
    id: string;
    emailAddress: string;
    name: string;
    isAdmin: boolean;
    caloriesLimit: number;
    entries: Entry[];
}

export interface Token {
    token: string;
}


