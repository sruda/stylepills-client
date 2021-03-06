/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Atom } from './../../../../../../../models/atom/atom.model';

import Icon from './../../../../../../common/Icon/Icon';

// -----------------------------------


/************************************/
/*            INTERFACES            */
/************************************/

/* Own Props */
interface AtomInfoSectionProps extends Atom {}


/**
 * @desc Represent UI Atom Info Section
 * @function AtomInfoSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const AtomInfoSection: React.SFC<AtomInfoSectionProps> = ({
    name, 
    likes = 0, 
    stores = 0,
    comments = 0, 
    views = 0,
    author
}) => {


    /*         MARKUP          */
    /***************************/
    return (
        <div className="AtomInfo px-1">

            {/* Atom Name */}
            <p className="m-0 fontSize-md fontFamily-poppins fontSmoothing-reset text-truncate">
                {name}
            </p>

            {/* Stats */}
            <div className="AtomInfo__stats">

                <div className="sp-stats">

                    <div className="like sp-stats__item">
                        <Icon icon="heart" 
                            iconClass="stroke-silver strokeWidth-2 mr-1"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-7 color-silver">{likes}</span>
                    </div>

                    <div className="comment sp-stats__item">
                        <Icon icon="messageCircle"
                            iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-7 color-silver">0</span>
                    </div>

                    <div className="store sp-stats__item">
                        <Icon icon="duplicate"
                            iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-7 color-silver">{stores}</span>
                    </div>

                    <div className="view sp-stats__item">
                        <Icon icon="eye" 
                            iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-7 color-silver">{views}</span>
                    </div>

                </div>

            </div>
        </div>
    );

};

/* Export */
export default AtomInfoSection;