export interface Photo {
    thumb: string;
    highres?: any;
    is_user_uploaded: boolean;
}

export interface Common {
    food_name: string;
    serving_unit: string;
    tag_name: string;
    serving_qty: number;
    common_type?: number;
    tag_id: string;
    photo: Photo;
    locale: string;
}

export interface Photo2 {
    thumb: string;
    highres?: any;
    is_user_uploaded?: boolean;
}

export interface Branded {
    food_name: string;
    serving_unit: string;
    nix_brand_id: string;
    brand_name_item_name: string;
    serving_qty: number;
    nf_calories: number;
    photo: Photo2;
    brand_name: string;
    region: number;
    brand_type: number;
    nix_item_id: string;
    locale: string;
}

export interface NutritionXResponse {
    common: Common[];
    branded: Branded[];
}

