import classes from './Header.module.css';
import img from '../../../assets/meals.jpg';
import HeaderCartButton from '../../UI/Button/HeaderCartButton';

const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>A Restaurant</h1>
                <HeaderCartButton onCheckout={props.onCheckout} />
            </header>
            <div className={classes['main-image']}>
                <img
                    src={img}
                    alt="A table of food"
                />
            </div>
        </>
    )
}

export default Header;