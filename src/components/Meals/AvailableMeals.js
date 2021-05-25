import { useCallback, useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card/Card';
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {
    const [availableMeals, setAvailableMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMealsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('https://react-http-de322-default-rtdb.firebaseio.com/meals.json');

            if (!res.ok) {
                throw new Error('Something went wrong!')
            }

            const data = await res.json();

            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                });
            }

            setAvailableMeals(loadedMeals);
            setIsLoading(false)
        } catch (error) {
            setError(error.message);
        }
    }, []);

    useEffect(() => {
        fetchMealsHandler();
    }, [fetchMealsHandler])

    let content = <p>No meals found.</p>;

    if (isLoading) {
        content = 
        <section>
            <p className={classes.MealsLoading}>Loading available meals...</p>
        </section>;
        
    }

    if (availableMeals.length > 0) {
        content = availableMeals.map(meal =>
            <MealItem
                id={meal.id}
                name={meal.name}
                price={meal.price}
                description={meal.description}
                key={meal.id}
            />
        )
    }

    if (error) {
        content = <p>{error}</p>
    }



    return (
        <section className={classes.meals}>
            <Card>
                <ul>{content}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;