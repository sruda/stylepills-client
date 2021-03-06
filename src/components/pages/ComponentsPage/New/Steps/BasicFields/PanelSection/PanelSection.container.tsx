/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as classNames from 'classnames';

import { IRootState } from './../../../../../../../reducer/reducer.config';

import { Lib as LibModel } from './../../../../../../../models/lib/lib.model';

import TabMenuContainer from './TabMenu/TabMenu.container';
import SourceCodePanelContainer from './SourceCodePanel/SourceCodePanel.container';
import ExternalLibsPanelContainer from './ExternalLibsPanel/ExternalLibsPanel.container';

import { 
    Option as DetailsTabMenuOptions
} from './../../../../../../../app/components/Tabs/DetailsTabMenu/DetailsTabMenu';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PanelSectionContainerProps = {
    html: string;
    css: string;
    libs: Array<LibModel>;
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    tab: string;
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PanelSectionContainer 
extends React.Component<ChildProps<PanelSectionContainerProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<PanelSectionContainerProps & StateProps, {}>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { html, css } = this.props;
        const { tab } = this.props;

        // Tab Menu Row Classes
        const tabMenuRowClasses = classNames({
            'row': true,
            'no-gutters': true,
            'pl-3': true,
            'align-items-center': true,
            'borderTop-1': true,
            'borderColor-smoke': true,
            'sp-bg-black': tab === DetailsTabMenuOptions.showCode,
            'sp-bg-white': tab !== DetailsTabMenuOptions.showCode
        });


        /*         MARKUP          */
        /***************************/
        return (

            <div className="PanelSection sp-rounded-bottom-md overflow-hidden">

                {/* Stats and Tab Menu Row */}
                <div className={tabMenuRowClasses}>

                    <div className="d-flex col">

                        {/* Tab Menu */}
                        <div className="ml-auto">
                            <TabMenuContainer />
                        </div>

                    </div>
                </div>

                {/* Source Code Section */}
                {tab === DetailsTabMenuOptions.showCode && 
                <SourceCodePanelContainer html={html} css={css}/>}

                {/* External Libs Section */}
                {tab === DetailsTabMenuOptions.addLibs && 
                <ExternalLibsPanelContainer />}

            </div>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {

    const { tabs } = state.ui;
    const { atomDetailsTab } = tabs;
    const { tab } = atomDetailsTab;

    return {
        tab
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const panelSectionContainerConnect = connect(mapStateToProps);


/*         EXPORT          */
/***************************/
export default compose(
    panelSectionContainerConnect
)(PanelSectionContainer);