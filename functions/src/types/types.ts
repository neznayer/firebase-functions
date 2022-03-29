type ProductOptionT = {
    name: string;
    type: string;
    values: ValuesT[];
};

type ValuesT = {
    id: number;
    title: string;
};

type VariantIdT = number;

type ImageT = {
    id: string;
    name: string;
    type: string;
    height: number;
    width: number;
    angle: number;
    scale: number;
    x: number;
    y: number;
};

type ImageSrcT = {
    is_default: boolean;
    src: string;
    position: string;
    variant_ids: VariantIdT[];
};

type PlaceholderT = {
    position: string;
    images: ImageT[];
};

type PrintAreaT = {
    placeholders: PlaceholderT[];
    variant_ids: VariantIdT[];
};

export type VariantT = {
    id: VariantIdT;
    title: string;
    price: number;
    options: number[];
    quantity: number;
    sku: string;
    is_available: boolean;
    is_default: boolean;
    is_enabled: boolean;
    cost: number;
    grams: number;
};

export interface ProductI {
    blueprint_id: number;
    created_at: string;
    id: string;
    title: string;
    description: string;
    tags: string[];
    options: ProductOptionT[];
    is_locked: boolean;
    print_areas: PrintAreaT[];
    print_details: any[];
    print_provider_id: number;
    sales_channel_properties: any[];
    shop_id: number;
    twodaydelivery_enabled: boolean;
    user_id: number;
    variants: VariantT[];
    visible: boolean;
    images: ImageSrcT[];
}

export type cartItem = {
    productId: string | null;
    quantity: number | null;
    variantId: number | null;
};
