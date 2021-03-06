/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { 
    GET_ALL_ATOM_CATEGORIES_QUERY, 
    GetAllResponse 
} from './../../../../../models/atomCategory/atomCategory.query';

import SelectList from './../../../../components/Inputs/GenericSelectInput/GenericSelectInput';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomCategorySelectListProps = {
    onChange: (name: string, value: string) => void
};

/* Own States */
type LocalStates = {
    value: string
};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomCategorySelectListContainer 
extends React.Component<ChildProps<AtomCategorySelectListProps & StateProps, GetAllResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AtomCategorySelectListProps & StateProps, GetAllResponse>) {
        super(props);

        // Init state
        this.state = {
            value: ''
        };

        // Bind methods
        this._handleChange = this._handleChange.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle Select List Change
     * @method _handleChange
     * @example this._handleChange()
     * @private 
     * @param {AtomModel} atom - atom data
     * @param {any} e - Event
     * @returns {void}
     */
    private _handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        
        // VARIABLES
        let value = e.target.value;
        let name = e.target.name;

        // Update the state
        this.setState((previousState) => {
            return { ...previousState, value };
        }, () => {
            this.props.onChange(name, value);
        });
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <SelectList value={this.state.value}
                        name="atomCategoryId"
                        isBlock={true}
                        defaultOption="Other"
                        options={data.allAtomCategories ? data.allAtomCategories : null}
                        loading={data.loading}
                        error={data.error}
                        onChange={this._handleChange}/>
        );

    }

}


/********************************/
/*            QUERY             */
/********************************/
const getAllAtomCategoriesQuery = graphql<GetAllResponse, AtomCategorySelectListProps>(
    GET_ALL_ATOM_CATEGORIES_QUERY
);


/*         EXPORT          */
/***************************/
export default compose(
    getAllAtomCategoriesQuery
)(AtomCategorySelectListContainer);