/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../../../reducer/reducer.config';
import { CodeSupportedOption } from './../../../../../../../core/interfaces/interfaces';

import {
    CurrentCode
} from './../../../../../../../reducer/ui.reducer';

import { Basic as BasicColorModel } from './../../../../../../../models/color/color.model';
import { Lib as LibModel } from './../../../../../../../models/lib/lib.model';
import LibService from './../../../../../../../models/lib/lib.service';

import { changeColorAction } from './../../../../../../../actions/ui.action';

import { getCurrentColor, getLibListDenormalized, getCurrentCode } from './../../../../../../../selectors/ui.selector';

import PreviewBox from './../../../../../../../app/components/PreviewBox/PreviewBox';
import Iframe from './../../../../../../common/Iframe/Iframe.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PreviewSectionContainerProps = {
    html: string;
    css: string;
};

/* Own States */
type LocalStates = {
    html: string,
    css: string
};

/* Mapped State to Props */
type StateProps = {
    color: BasicColorModel,
    currentCode: CurrentCode,
    libs: Array<LibModel>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changeColor: (color: BasicColorModel) => void;
        }
    };
};

/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PreviewSectionContainer
extends React.Component<ChildProps<PreviewSectionContainerProps & StateProps & DispatchProps, {}>, LocalStates> {

    /********************************/
    /*         STATIC PROPS         */
    /********************************/
    private _DEFAULT_COLOR_HEX: string = '#F9FAFC';


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: PreviewSectionContainerProps & StateProps & DispatchProps) {
        super(props);

        // Init local state
        this.state = {
            html: props.html || '',
            css: props.css || ''
        };
    }


    /********************************/
    /*       COMPONENTDIDMOUNT      */
    /********************************/
    componentDidMount() {

        // TODO: Analizar por que no estoy seguro que esto sea tarea de este componente
        
        const DEFAULT_COLOR_HEX = this._DEFAULT_COLOR_HEX;
        const DEFAULT_COLOR_RGBA = {
            r: 249, g: 250, b: 252, a: 1
        };

        const defaultColor: BasicColorModel = {
            hex: DEFAULT_COLOR_HEX,
            rgba: DEFAULT_COLOR_RGBA

        };

        this._changeColor(defaultColor);
    }


    /**********************************/
    /*  COMPONENT WILL RECEIVE PROPS  */
    /**********************************/
    componentWillReceiveProps(nextProps: PreviewSectionContainerProps & StateProps) {   
        const { currentCode } = nextProps;

        this.setState({
            html: currentCode[CodeSupportedOption.html].code,
            css: currentCode[CodeSupportedOption.css].code
        });
        
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Change Color of Color Picker
     * @method _changeColor
     * @example this._changeColor()
     * @private 
     * @returns {void}
     */
    private _changeColor(color: BasicColorModel) {
        this.props.actions.ui.changeColor(color);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring state & props 
        const { html, css } = this.state;
        const { color, libs} = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <PreviewBox height="30" 
                        isEmptyPreview={html === ''}> 
                <Iframe children={html} 
                                css={css} 
                                title={'new'}
                                background={color.hex}
                                stylesheets={LibService.getStylesheetsFromLibs(libs)} />
            </PreviewBox>
        );
    }
    
}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        color: getCurrentColor(state),
        currentCode: getCurrentCode(state),
        libs: getLibListDenormalized(state)
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeColor: (color: BasicColorModel) => dispatch(changeColorAction(color))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const previewSectionContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    previewSectionContainerConnect
)(PreviewSectionContainer);