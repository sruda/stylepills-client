/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { ChildProps } from 'react-apollo';

import ComponentNew from './New/ComponentNew.container';
import ComponentList from './List/ComponentList.container';
import ComponentDetails from './Details/ComponentDetails.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentsPageProps = {};

type WithRouterComponentsPageProps = ComponentsPageProps & RouteComponentProps<any>;

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ComponentsPage 
extends React.Component<ChildProps<WithRouterComponentsPageProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<WithRouterComponentsPageProps & StateProps, {}>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*         MARKUP          */
        /***************************/
        return (
            <Switch>
                <Route exact={true} path="/dashboard/components/new" component={ComponentNew} />
                <Route exact={true} path="/dashboard/components" component={ComponentList} />
                <Route exact={true} path="/dashboard/components/:id" component={ComponentDetails} />
            </Switch>
        );
    }

}


/*         EXPORT          */
/***************************/
export default withRouter(ComponentsPage);