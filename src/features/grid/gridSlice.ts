import { createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        loading: false,
        prices: [],
        numbers: Array(50).fill(false),
        stars: Array(12).fill(false),
    },
    reducers: {
        toggleNumber: (state, action) => {
            state.numbers[action.payload.identifier] = action.payload.checked;
        },
        toggleStar: (state, action) => {
            state.stars[action.payload.identifier] = action.payload.checked;
        },
        loadPrices: (state) => {
            state.loading = true;
        },
        loadPricesSuccess: (state, action) => {
            state.loading = false;
            state.prices = action.payload;
        },
        loadPricesFail: (state) => {
            state.loading = false;
        },
    },
});

export const { toggleNumber, toggleStar, loadPrices, loadPricesSuccess, loadPricesFail } = gridSlice.actions;

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

export const selectPrices = (state: any) => state.grid.prices;
export const selectNumbers = (state: any) => state.grid.numbers;
export const selectSelectedNumberCount = createSelector(
    selectNumbers,
    (numbers: boolean[]) => numbers.filter((item: boolean) => item).length
);
export const selectStars = (state: any) => state.grid.stars;
export const selectSelectedStarCount = createSelector(
    selectStars,
    (stars: boolean[]) => stars.filter((item: boolean) => item).length
);
export const selectCost = createSelector(
    selectSelectedNumberCount,
    selectSelectedStarCount,
    selectPrices,
    (numberCount: number, starCount: number, prices: { number: number, star: number, price: number}[]) => {
        const foundPrice = (prices || []).find(price => price.number === numberCount && price.star === starCount);
        if (foundPrice) {
            return foundPrice.price / 100;
        }
        return 0;
    }
);

export default gridSlice.reducer;
