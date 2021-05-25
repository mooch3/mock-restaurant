import classes from './OrderForm.module.css';
import useInput from '../../../hooks/use-input';

const OrderForm = (props) => {

    const {
        hasError: fNameHasError,
        onBlurHandler: fNameBlurHandler,
        onChangeHandler: fNameOnChangedHandler,
        value: fName,
        reset: resetFName,
        isValid: fNameIsValid

    } = useInput(value => value.trim() !== '');

    const {
        hasError: lNameHasError,
        onBlurHandler: lNameBlurHandler,
        onChangeHandler: lNameOnChangedHandler,
        value: lName,
        reset: resetLName,
        isValid: lNameIsValid

    } = useInput(value => value.trim() !== '');

    const {
        hasError: addressHasError,
        onBlurHandler: addressBlurHandler,
        onChangeHandler: addressOnChangedHandler,
        value: address,
        reset: resetAddress,
        isValid: addressIsValid

    } = useInput(value => value.trim() !== '');

    const {
        hasError: emailHasError,
        onBlurHandler: emailBlurHandler,
        onChangeHandler: emailOnChangedHandler,
        value: email,
        reset: resetEmail,
        isValid: emailIsValid

    } = useInput(value => value.includes('@'));

    let formIsValid = false;
    
    if (emailIsValid && fNameIsValid && lNameIsValid && addressIsValid) {
        formIsValid = true;
    }

    const submitHandler = event => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        console.log(fName, lName, email, address);

        const order = {
            firstName: fName,
            lastName: lName,
            email: email,
            address: address,
            order: props.order
        }



        fetch('https://react-http-de322-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        resetFName();
        resetLName();
        resetAddress();
        resetEmail();

    };



    const fNameClasses = fNameHasError ? classes['form-control'] + ' ' + classes.invalid : classes['form-control'];
    const lNameClasses = lNameHasError ? classes['form-control'] + ' ' + classes.invalid : classes['form-control'];
    const addressClasses = addressHasError ? classes['form-control'] + ' ' + classes.invalid : classes['form-control'];
    const emailClasses = emailHasError ? classes['form-control'] + ' ' + classes.invalid : classes['form-control'];

    return (
        <form onSubmit={submitHandler} className={classes.form}>
        <h1>Order Details</h1>
            <div className={fNameClasses}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    autoComplete="off"
                    onBlur={fNameBlurHandler}
                    onChange={fNameOnChangedHandler}
                    id="firstName"
                    value={fName}
                />
                {fNameHasError && <p>Please enter your first name.</p>}
            </div>
            <div className={lNameClasses}>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    autoComplete="off"
                    onBlur={lNameBlurHandler}
                    onChange={lNameOnChangedHandler}
                    id="lastName"
                    value={lName}
                />
                {lNameHasError && <p>Please enter your last name.</p>}
            </div>
            <div className={addressClasses}>
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    autoComplete="off"
                    onBlur={addressBlurHandler}
                    onChange={addressOnChangedHandler}
                    id="address"
                    value={address}
                />
                {addressHasError && <p>Please enter your address.</p>}
            </div>
            <div className={emailClasses}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    autoComplete="off"
                    onBlur={emailBlurHandler}
                    onChange={emailOnChangedHandler}
                    id="email"
                    value={email}
                />
                {emailHasError && <p>Please enter a valid email.</p>}
            </div>
            <div className={props.classes}>
                <button className={props.btncCnlClasses} onClick={props.onClosed}>Close</button>
                {props.hasItems && <button disabled={!formIsValid} className={formIsValid ? props.btnClasses : undefined}>Order</button>}
            </div>
        </form>
    )
}

export default OrderForm;