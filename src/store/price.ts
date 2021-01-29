import { createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './index';

/**
 * A price represent an amount of money for a given number of numbers and stars in the grid.
 */
export interface Price {

    /**
     * The number of numbers.
     */
    number: number;

    /**
     * The number of stars.
     */
    star: number;

    /**
     * The assiciated price.
     */
    price: number;
}

export interface PriceState {
    
    /**
     * Whether the price api is loading.
     */
    loading: boolean;

    /**
     * The list of available prices.
     */
    prices: Price[];

    /**
     * The min and max number of item you can select according to the price api.
     */
    minMax: PriceMinMax;
}

export interface PriceMinMax {
    minNumber: number;
    maxNumber: number;
    minStar: number;
    maxStar: number;
}

export const priceSlice = createSlice({
    name: 'price',
    initialState: {
        loading: false,
        prices: [],
        minMax: {
            minNumber: 999,
            maxNumber: 0,
            minStar: 999,
            maxStar: 0,
        }
    },
    reducers: {
        loadPrices: (state) => {
            state.loading = true;
        },
        loadPricesSuccess: (state, action) => {
            state.loading = false;
            state.prices = action.payload;
            action.payload.forEach((price: Price) => {
                if (state.minMax.minNumber > price.number) {
                    state.minMax.minNumber = price.number;
                }
                if (state.minMax.maxNumber < price.number) {
                    state.minMax.maxNumber = price.number;
                }
                if (state.minMax.minStar > price.star) {
                    state.minMax.minStar = price.star;
                }
                if (state.minMax.maxStar < price.star) {
                    state.minMax.maxStar = price.star;
                }
            });
        },
        loadPricesFail: (state) => {
            state.loading = false;
        },
    },
});

// Actions
const { loadPrices, loadPricesSuccess, loadPricesFail } = priceSlice.actions;

export const loadPricesApi = () => (dispatch: any) => {
    dispatch(loadPrices());

    axios.get(
        'https://www.fdj.fr/apigw/rtg/rest/euromillions'
    ).then((response) => {
        dispatch(loadPricesSuccess(response.data.multiples.map((data: any) => ({
            number: data.pattern[0],
            star: data.pattern[1],
            price: data.cost.value
        }))));
    }).catch(() => {
        dispatch(loadPricesFail());
    });
};

// Selectors
const selectSlice = (state: RootState): PriceState => state.price;
export const selectPrices = createSelector(selectSlice, (state: PriceState): Price[] => state.prices);
export const selectMinMax = createSelector(selectSlice, (state: PriceState): PriceMinMax => state.minMax);

export default priceSlice.reducer;
