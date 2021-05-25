import { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import OrderForm from './OrderForm/OrderForm';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    console.log(cartCtx.totalAmount)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => 
        <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
        />
        )}
    </ul>;
    
    return (
        <Modal onClosed={props.onClosed}>
            <div>
                {cartItems}
            </div>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <OrderForm
                classes={classes.actions}
                btnClasses={classes.button}
                btnCnlClasses={classes['button--alt']}
                onClosed={props.onClosed}
                hasItems={hasItems}
                order={cartCtx.items}
            />
        </Modal>
    )
}

export default Cart;