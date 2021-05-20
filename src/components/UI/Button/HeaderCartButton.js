import { useContext, useEffect, useState } from 'react';
import classes from "./HeaderCartButton.module.css";
import CartIcon from './CartIcon/CartIcon';
import CartContext from '../../../store/cart-context';

const HeaderCartButton = (props) => {
    const [buttonBump, setButtonBump] = useState(false);
    const ctx = useContext(CartContext);

    const numberOfCartItems = ctx.items.reduce((currVal, item) => {
        return currVal + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${buttonBump ? classes.bump : ''}` 

    const { items } = ctx;

    useEffect(() => {
        if (items.length === 0){
            return;
        } else {
            setButtonBump(true);
        }

        const timer = setTimeout(() => {
            setButtonBump(false)
        }, 300);

        return () => {
            clearTimeout(timer);
        }

    }, [items])
    
    return (
        <button onClick={props.onCheckout} className={btnClasses}>
            <span>
                <CartIcon
                    className={classes.icon}
                />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )


}

export default HeaderCartButton;