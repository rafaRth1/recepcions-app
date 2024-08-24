import { FoodProps } from './FoodProps';

export interface DishProps extends FoodProps {
	_id?: string;
	key: string;
	rice: boolean;
	salad: boolean;
	// type: string;
}
