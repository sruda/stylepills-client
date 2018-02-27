/************************************/
/*           DEPENDENCIES           */
/************************************/
import { kebabCase, find, omit } from 'lodash';
import * as appConfig from './../constants/app.constants';

import { INormalizedResult } from './../interfaces/interfaces';


/************************************/
/*            INTERFACES            */
/************************************/

interface IFunctionUtil {
    updateObject: (oldObject: Object, newValues: any) => any;
    copyArray: (array: Array<any>) => Array<any>;
    addItemInArray: (array: Array<any>, newItem: any) => Array<any>;
    updateItemInArray: (array: Array<any>, key: string, value: number | string, updateItemCallback: Function) => Array<any>;
    deleteItemInArray: (array: Array<any>, key: string, value: number | string) => Array<any>;
    itemExistsInArray: (array: Array<any>, value: any, key: string) => boolean;
    turnArrayIntoObject: (array: Array<any>, key?: string) => Object;
    deletePropInCollection: (array: Array<any>, ...keys: Array<string>) => Array<any>;
    consoleLog: (message: string, value?: any) => void;
    truncateText: (str: string, length: number, ending: string) => string;
    toUrlFormat: (value: string) => string;
}


/************************************/
/*         CLASS DEFINITION         */
/************************************/
class FunctionsUtil implements IFunctionUtil {

    constructor() {/**/}


    /**********************************/
    /*            METHODS             */
    /**********************************/

    /**
     * @desc Encapsulate the idea of passing a new object as 
     * the first parameter to Object.assign to ensure we correctly 
     * copy data instead of mutating.
     * @function updateObject
     * @example - this.updateObject(state, {todos : newTodos});
     * @param {Object} oldObject - old object to update
     * @param {any} newValues - values or object to include in old object
     * @return {Object}
     */
    updateObject(oldObject: Object, newValues: any = {}): any {
        return Object.assign({}, oldObject, newValues);
    }


    /**
     * @desc Encapsulate the idea of copy an Array ensuring we 
     * correctly copy data instead of mutating.
     * @function copyArray
     * @example - this.copyArray(array);
     * @param {Array<any>} array - old array to concat (or copy)
     * @param {Array<any>} newArray - new array to use to concat
     * @return {Array<any>}
     */
    copyArray(array: Array<any>): Array<any> {
        return [].concat(array);
    }


    /**
     * @desc Encapsulate the idea of adding and item in an array 
     * to ensure we correctly copy data instead of mutating.
     * @function addItemInArray
     * @example 
     * const newTodos = addItemInArray(state.todos, action.id, action.name, action.website);
     * @param {Array<any>} array - array of objects
     * @param {any} newItem - new item to add in the array
     * @return {Array<any>}
     */
    addItemInArray(
        array: Array<any>,
        newItem: any): Array<any> {
        
        let newArray = this.copyArray(array);

        newArray = newArray.concat(newItem);
    
        return newArray;
    }


    /**
     * @desc Encapsulate the idea of updating and item in an array 
     * to ensure we correctly copy data instead of mutating.
     * @function updateItemInArray
     * @example 
     * const newTodos = updateItemInArray(state.todos, 'id', action.id, todo => {
     *      return updateObject(todo, {completed : !todo.completed});
     * });
     * @param {Array<any>} array - array of objects
     * @param {number | string} value - value to use to find item inside the array
     * @param {string} key - item identifier: e.g. id, uuid, etc.
     * @return {Array<any>}
     */
    updateItemInArray(
        array: Array<any>,
        key: string = 'id',
        value: number | string, 
        updateItemCallback: Function): Array<any> {

        const updatedItems = array.map(item => {
            if (item[key] !== value) {
                /* Since we only want to update one item, 
                    preserve all others as they are now */
                return item;
            }
    
            // Use the provided callback to create an updated item
            const updatedItem = updateItemCallback(item);
            return updatedItem;
        });
    
        return updatedItems;
    }


    /**
     * @desc Encapsulate the idea of deleting and item in an array 
     * to ensure we correctly copy data instead of mutating.
     * @function deleteItemInArray
     * @example 
     * const newTodos = deleteItemInArray(state.todos, 'id', action.id);
     * @param {Array<any>} array - array of objects
     * @param {number | string} value - value to use to find item inside the array
     * @param {string} key - item identifier: e.g. id, uuid, etc.
     * @return {Array<any>}
     */
    deleteItemInArray(
        array: Array<any>,
        key: string = 'id',
        value: number | string): Array<any> {

        const newList = array.filter(
            (item) => {
            if (item[key] === value) {
                return false;
            } else {
                return true;
            }
        });
    
        return newList;
    }


    /**
     * @desc Validate if an item exists on an Array
     * @function itemExistsInArray
     * @example this.itemExistsInArray(array, 'primary', 'typeColor')
     * @param {Array<any>} array - array to validate
     * @param {any} value - value to use to check if exists in the array
     * @param {string} key - If array has inner objects, this is the key that contain the value
     * @return {boolean} value exists in array (true or false)
     */
    itemExistsInArray(array: Array<any>, value: any, key: string = null): boolean {
        
        let res = false;

        if (array.length > 0) {

            let newArray = array.filter((elem: any) => {
                if (key) {
                    return elem[key] === value;
                } else {
                    return elem === value;
                }
            });

            if (newArray.length > 0) { res = true; }
        }

        return res;
    }


    /**
     * @desc Turn an Array into an Object (normalize)
     * @function turnArrayIntoObject
     * @example this.turnArrayIntoObject(array, 'tempId')
     * @param {Array<any>} array - array to validate
     * @param {any} value - value to use to check if exists in the array
     * @param {string} key - If array has inner objects, this is the key that contain the value
     * @return {INormalizedResult} it return and normalized result object
     */
    turnArrayIntoObject(array: Array<any>, key: string = 'id'): INormalizedResult {
        
        const entities = array.reduce((accumulator, current) => {
            accumulator[current[key]] = current;
            return accumulator;
        }, {});
         
        const result = Object.keys(entities).map(entityKey => {
                return entityKey;
            }
        );
          
        return {entities, result};
    }


    /**
     * @desc Encapsulate the idea of deleting inner props an array 
     * to ensure we correctly copy data instead of mutating.
     * @function deletePropInCollection
     * @example 
     * const newTodos = deletePropInCollection(atom.todos, 'id', 'atomId', 'projectId');
     * @param {Array<any>} array - array of objects
     * @param {Array<string>} props - list of keys to delete e.g. 'id', 'atomId', 'projectId'
     * @return {Array<any>}
     */
    deletePropInCollection(array: Array<any>, ...keys: Array<string>): Array<any> {

        const newCollection = array.map((item) => {
            let newItem = this.updateObject(item);

            keys.forEach(
                (key) => {
                    if (item.hasOwnProperty(key)) {
                        newItem = omit(item, key);
                    }
                }
            );
            
            return newItem;
        });

        return newCollection;

    }


    /**
     * @desc Generic console log
     * @function consoleLog
     * @example - this.consoleLog('AtomDetailsBox is actived');
     * @param {string} message - console log message
     * @param {any} value - values or object to show on console.log
     * @return {void}
     */

    consoleLog(message: string, value: any = ''): void {
        if (appConfig.DEBUG) {
            console.log(message, value);
        }
    }


    /**
     * @desc Truncate a text based on a specific length and ending string
     * @function truncateText
     * @example this.truncateText('my long text', 200, '...')
     * @param {string} str - text to truncate
     * @param {number} length - max length allowed (number of chars on the text)
     * @param {string} ending - specific string to concat in the end of the text
     * @return {string} text truncated
     */
    truncateText(str: string = '', length: number = 100, ending: string = '...') {
        // NOTE: Asign default values when receive params, only validate undefined, not null. Null is considered a value
        if (str == null) { str = ''; }
        if (length == null) { length = 100; }
        if (ending == null) { ending = '...'; }

        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    }



    /**
     * toUrlFormat
     * @description - take a string and formatting it to url format ('colombia-immersion')
     * @use - functionsUtil.normalizeString('Colombia Immersion');
     * @function
     * @param {string} value - string to parse
     * @return {string} string parsed (e.g. colombia-immersion)
     */
    toUrlFormat(value: string): string {
        // VARIABLES
        let valueParsed = '';
        let valueNormalized = '';

        // Remove special characters
        valueNormalized = kebabCase(value);
        // To lower case, split and join with - between them
        valueParsed = valueNormalized.toLowerCase().split(' ').join('-');

        return valueParsed;

    }

    moveElementToFirstPosition(
        array: Array<any>,
        key: string = 'id',
        value: number | string): Array<any> {

        let newArray = this.copyArray(array);
        // find index
        let elem = find(newArray, [key, value]);

        // if element does not exist in Array
        if (!elem) { return newArray; }

        // remove element in Array
        newArray = this.deleteItemInArray(newArray, key, value);

        // add element to the start
        newArray.unshift( elem );

        return newArray;
    }

}


/* Export FunctionUtils instance */
export const functionsUtil = new FunctionsUtil();