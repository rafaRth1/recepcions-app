import { FoodProps } from './FoodProps';

export interface DishProps extends FoodProps {
	key: string;
	rice: boolean;
	salad: boolean;
	// type: string;
}
