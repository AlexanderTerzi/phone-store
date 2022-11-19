import { CartItemType } from './../redux/slices/cartSlice';

export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((sum, obj) => (obj.currentPrice * obj.count) + sum, 0);
};