/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../../../../reducer/reducer.config';

import { Lib as LibModel, LibTypeOptions } from './../../../../../../../../models/lib/lib.model';

import { changeLibsTabAction, changeLibsAction } from './../../../../../../../../actions/ui.action';

import CodeTabMenu, { 
    Option as CodeTabMenuOption 
} from './../../../../../../../../app/components/Tabs/CodeTabMenu/CodeTabMenu';
import AddLibForm from './../../../../../../../../app/components/Forms/AddLibForm/AddLibForm';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ExternalLibsPanelProps = {};

/* Own States */
type LocalStates = {
    libs: Array<LibModel>
};

/* Mapped State to Props */
type StateProps = {
    tab: string,
    libs: Array<LibModel>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changeLibsTab: (tab: string) => void;
            changeLibs: (libs: Array<LibModel>) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ExternalLibsPanel 
extends React.Component<ChildProps<ExternalLibsPanelProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ExternalLibsPanelProps & StateProps & DispatchProps) {
        super(props);

        // Init local state
        this.state = {
            libs: [...props.libs] || []
        };

        // Bind methods
        this._handleTabClick = this._handleTabClick.bind(this);
        this.handleAddLibClick = this.handleAddLibClick.bind(this);
        this.handleDeleteLibClick = this.handleDeleteLibClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleAddLibClick
     * @method handleAddLibClick
     * @example this.handleAddLibClick()
     * @public
     * @param {LibModel} newLib - new lib to add on the libs array
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleAddLibClick = (name: string, url: string) => (e: React.FormEvent<{}>) => {
        this._addLib(name, url);
    }


    /**
     * @desc HandleDeleteLibClick
     * @method handleDeleteLibClick
     * @example this.handleDeleteLibClick()
     * @public
     * @param {LibModel} lib - lib that I want to remove of the libs list
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleDeleteLibClick = (lib: LibModel) => (e: React.FormEvent<{}>) => {
        this._deleteLib(lib);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleTabClick
     * @method _handleTabClick
     * @example this._handleTabClick()
     * @private
     * @param {string} tab - source code tab (e.g. 'html', 'css')
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleTabClick = (tab: string) => (e: React.FormEvent<{}>) => {
        e.preventDefault();
        this._changeTab(tab);
    }


    /**
     * @desc Change Tab
     * @method _changeTab
     * @example this._changeTab()
     * @private
     * @param {string} tab - type code tab (e.g. 'javascript', 'css') 
     * @returns {void}
     */
    private _changeTab(tab: string) {
        this.props.actions.ui.changeLibsTab(tab);
    }


    /**
     * @desc Add Lib
     * @method _addLib
     * @example this._addLib()
     * @private 
     * @param {LibModel} newLib - new lib to add in the list
     * @returns {void}
     */
    private _addLib(name: string, url: string) {

        // Copy state
        let libsCopy = [].concat(this.state.libs);
        let newLib: LibModel = {
            name,
            url,
            type: LibTypeOptions.css // TODO: Esto esta quemado aqui, implementar cambio de tab
        };
 
        if (url !== '') {
            
            /* Add new lib to the beginning of libs array */
            libsCopy.unshift(newLib);

            this.setState((previousState: LocalStates) => ({
                ...previousState,
                libs: libsCopy
            }), () => {
                this.props.actions.ui.changeLibs(libsCopy);
            });

        }

    }


    /**
     * @desc Delete Lib
     * @method _deleteLib
     * @example this._deleteLib()
     * @private 
     * @param {LibModel} lib - lib that I want to remove of the libs list
     * @returns {void}
     */
    private _deleteLib(lib: LibModel) {

        // Destructuring state
        const { libs } = this.state;
        
        let libArray = libs.filter(function (candidateLib: LibModel) {
            return candidateLib !== lib;
        });

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            libs: libArray
        }), () => {
            this.props.actions.ui.changeLibs(libArray);
        });

    }


    /**
     * @desc Build Add Lib Form component
     * @method _buildAddLibForm
     * @example this._buildAddLibForm('css')
     * @private
     * @param {LibTypeOptions} type - external lib type (css, javascript)
     * @returns {JSX.Element} <AddLibForm />
     */
    private _buildAddLibForm(): JSX.Element {

        // VARIABLES
        let title = 'EXTERNAL LIBRARIES';
        let description = `Include any external resource (e.g. Boostrap, Bulma, 
                            your own helper classes library, etc.)`;

        return (
            <AddLibForm label={title}
                        helpMsg={description}
                        onAddClick={this.handleAddLibClick}/>
        );
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { tab } = this.props;

        // VARIABLES
        let options: Array<CodeTabMenuOption> = [
            CodeTabMenuOption.css,
            CodeTabMenuOption.js
        ]; 


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ExternalLibsPanel row no-gutters borderTop-1 borderColor-smoke overflow-hidden">
                
                {/* Type Code Tab Menu */}
                <div className="borderBottom-1 borderColor-smoke w-100">
                    <CodeTabMenu options={options} 
                                isReversed={false}
                                tab={tab} 
                                onTabClick={this._handleTabClick}/>
                </div>
                

                {/* External Libs Panel */}
                <div className="row no-gutters w-100 sp-bg-white">
                    <div className="col-12 position-relative">

                        {/* External Libs */}
                        <div className="ExternalLibs d-flex align-items-center position-relative p-5">
                            
                            {this._buildAddLibForm()}

                        </div>

                    </div>

                </div>

            </div>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const {tabs, libsPanel} = state.ui;
    const {libsTab} = tabs;
    const {tab} = libsTab;
    // TODO: Estudiar muy bien la gestion de componentes anidados, ya que estoy pasando muchas props desde los padres,
    // a niveles de anidamiento muy grandes, y se esta volviendo inmanejable los componentes, estoy aplicando muy mal
    // la teoria de containers components, los cuales deberian ser creados rapidamente simplemente para que se conecte 
    // a Redux y ya.
    const { libs } = libsPanel;

    return {
        tab,
        libs
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeLibsTab: (tab) => dispatch(changeLibsTabAction(tab)),
                changeLibs: (libs) => dispatch(changeLibsAction(libs))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const externalLibsPanelConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    externalLibsPanelConnect
)(ExternalLibsPanel);