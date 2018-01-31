/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Possible size options */
export enum SizeOption {
    sm = 'sm',
    md = 'md',
    lg = 'lg'
}

/* Own Props */
type GenericTextInputProps = {
    value: string | number | string[];
    size?: SizeOption;
    isBlock?: boolean;
    placeholder: string;
    disabled?: boolean;
    onChange: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Generic Text Input
 * @function GenericTextInput
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const GenericTextInput: React.SFC<GenericTextInputProps> = ({
    value,
    placeholder,
    size = SizeOption.md,
    disabled = false,
    isBlock = false,
    onChange
 }) => {

    // Input Classes
    const inputClasses = classNames({
        'sp-input': true, 
        [`sp-input--${size}`]: true,
        'sp-input--block': isBlock
    });    
    
    

    /*         MARKUP          */
    /***************************/
    return (
        <input type="text" 
                placeholder={placeholder}
                className={inputClasses}
                value={value}
                name={name}
                disabled={disabled}
                onChange={onChange}/>
    );
    
};


/* Export */
export default GenericTextInput;