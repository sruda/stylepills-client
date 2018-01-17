/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as appConfig from './../constants/app.constants';

import { ICurrentCode } from './../../actions/ui.action';
import { SourceCode } from './../../models/atom/atom.model';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IFunctionUtil {
    inArray: (array: Array<any>, comparisonProp: string, comparisonValue: any) => boolean;
    consoleLog: (message: string, value?: any) => void;
    sourceCodeArrayToObj: (sourceCode: Array<ICurrentCode>) => SourceCode;
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
     * inArray
     * @desc - To know if an element already exists on an Array
     * @example - functionsUtil.inArray(array, 'id', 36);
     * @function
     * @param {Array<any>} array - array to analyze
     * @param {string} comparisonProp - field to use in order to compare (e.g. 'id')
     * @param {string} comparisonValue - value to compare against comparisonProps (e.g. 36)
     * @return {boolean} yes or no element is into the array
     */
    
    inArray(array: Array<any>, comparisonProp: string, comparisonValue: any): boolean {
    
        for (let i = 0; i < array.length; i++) {
            if (array[i][comparisonProp] === comparisonValue) {
                return true;
            }
        }
    
        return false;
    
    }



    /**
     * consoleLog
     * @description - generic console log 
     * @example - this.consoleLog('AtomDetailsBox is actived');
     * @function
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
     * @desc Get Source Code from currentCode (sourceCodePanel state on Store)
     * @function
     * @method sourceCodeArrayToObj
     * @example this.sourceCodeArrayToObj(currentCode)
     * @private 
     * @returns {Object} obj - object parsed (e.g. obj = { "html": "<html>...</html>", "css": ".class {color: red}" })
     */
    sourceCodeArrayToObj(sourceCode: Array<ICurrentCode>): SourceCode {

        let obj: any = {};

        sourceCode.forEach((code) => {
            obj[code.codeType] = code.codeProps.code;
        });

        return obj;
    }

}


/* Export FunctionUtils instance */
export const functionsUtil = new FunctionsUtil();