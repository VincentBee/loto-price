import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Price, PriceMinMax, selectMinMax, selectPrices } from './price';

export interface GridState {
    numbers: boolean[];
    stars:  boolean[];
}

export const gridSlice = createSlice({
    name: 'grid',
    initialState: {
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
    },
});

// Actions
export const { toggleNumber, toggleStar } = gridSlice.actions;

// Selectors
const selectSlice = (state: RootState): GridState => state.grid;
export const selectNumbers = createSelector(
    selectSlice,
    (state: GridState): boolean[] => state.numbers
);
export const selectNumberCount = createSelector(
    selectNumbers,
    (numbers: boolean[]): number => numbers.filter((item: boolean) => item).length
);

export const selectStars = createSelector(
    selectSlice,
    (state: GridState): boolean[] => state.stars
);
export const selectStarCount = createSelector(
    selectStars,
    (stars: boolean[]) => stars.filter((item: boolean) => item).length
);
export const selectCost = createSelector(
    selectNumberCount,
    selectStarCount,
    selectPrices,
    (numberCount: number, starCount: number, prices: Price[]): number => {
        const foundPrice = (prices || []).find(price => price.number === numberCount && price.star === starCount);
        if (foundPrice) {
            return foundPrice.price / 100;
        }
        return 0;
    }
);

export const selectNumberMax = createSelector(
    selectPrices,
    selectMinMax,
    selectNumberCount,
    selectStarCount,
    (prices: Price[], minMax: PriceMinMax, numberCount: number, starCount: number): boolean => {
        return numberCount >= minMax.maxNumber ||
            (numberCount >= minMax.minNumber && starCount >= minMax.minStar && !prices.find(
                price => price.star === starCount && price.number > numberCount
            )
        )
    }
);
export const selectStarMax = createSelector(
    selectPrices,
    selectMinMax,
    selectStarCount,
    selectNumberCount,
    (prices: Price[], minMax: PriceMinMax, starCount: number, numberCount: number): boolean => {
        return starCount >= minMax.maxStar ||
            (numberCount >= minMax.minNumber && starCount >= minMax.minStar && !prices.find(
                price => price.number === numberCount && price.star > starCount
            )
        )
    }
);

export default gridSlice.reducer;
