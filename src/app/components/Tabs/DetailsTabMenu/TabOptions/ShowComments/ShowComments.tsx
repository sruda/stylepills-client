/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

import Icon from './../../../../Icon/Icon';

import { 
    Option as DetailsTabMenuOptions
} from './../../DetailsTabMenu';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ShowCommentsProps = {
    currentOption: string;
    onClick: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Show Comments option from Tab Menu component
 * @function ShowComments
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ShowComments: React.SFC<ShowCommentsProps> = ({ currentOption, onClick }) => {

    // Comments Btn Classes
    const commentsBtnClasses = classNames({
        'sp-iconTabMenu__btn': true, 
        'sp-iconTabMenu__btn--active': currentOption === DetailsTabMenuOptions.showComments
    });

        // Comments Icon on Btn Classes
    const commentsIconClasses = classNames({
        'strokeWidth-2': true, 
        'stroke-darkSecondary': currentOption === DetailsTabMenuOptions.showComments,
        'stroke-slate': currentOption !== DetailsTabMenuOptions.showComments
    });
    

    /*         MARKUP          */
    /***************************/
    return (
        <button className={commentsBtnClasses}>
            <div className="inner"
                onClick={onClick}>
                <Icon icon="messageCircle"
                    iconClass={commentsIconClasses}
                    width="22" height="22"/>
            </div>
        </button>
    );
    
};


/* Export */
export default ShowComments;