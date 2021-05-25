import { useState } from 'react';

const useInput = (validateInput) => {
    const [touched, setTouched] = useState(false);
    const [enteredValue, setEnteredValue] = useState('');

    const validate = validateInput(enteredValue);

    const hasError = !validate && touched;

    const onBlurHandler = () => {
        setTouched(true);
    };

    const onChangeHandler = e => {
        setEnteredValue(e.target.value);
    };

    const reset = () => {
        setEnteredValue('');
        setTouched(false);
    };

    return {
        hasError,
        onBlurHandler,
        onChangeHandler,
        reset,
        value: enteredValue,
        isValid: validate
    }
}

export default useInput;