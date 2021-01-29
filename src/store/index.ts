import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './grid';
import priceReducer from './price';

const store = configureStore({
    reducer: {
        grid: gridReducer,
        price: priceReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>
export default store;
