import { ProductStoreActionTypes, ProductStoreAction } from './product-store.action';

export interface StateModel {
    getStoreHomeData: any;
    storeGetDetails: any;
    productGetList: any;
    productGetDetails: any;
    eventGetDetails: any;
}

const initialState: StateModel = {
    getStoreHomeData: null,
    storeGetDetails: null,
    productGetList: null,
    productGetDetails: null,
    eventGetDetails: null
};

export function productStoreReducer(state = initialState, action: ProductStoreAction): StateModel {

    switch (action.type) {

        case ProductStoreActionTypes.StoreGetHomeSuccess: {
            return {
                ...state,
                getStoreHomeData: action.payload
            };
        }

        case ProductStoreActionTypes.StoreGetDetailsSuccess: {
            return {
                ...state,
                storeGetDetails: action.payload
            };
        }

        case ProductStoreActionTypes.ProductGetListSuccess: {
            return {
                ...state,
                productGetList: action.payload
            };
        }

        case ProductStoreActionTypes.ProductGetDetailsSuccess: {
            return {
                ...state,
                productGetDetails: action.payload
            };
        }

        case ProductStoreActionTypes.EventGetDetailsSuccess: {
            return {
                ...state,
                eventGetDetails: action.payload
            };
        }

        default:
            return state;
    }
}
