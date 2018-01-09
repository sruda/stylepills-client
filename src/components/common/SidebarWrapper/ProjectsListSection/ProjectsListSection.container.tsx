/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { graphql, compose, ChildProps } from 'react-apollo';
import { Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { functionsUtil } from './../../../../core/utils/functionsUtil';
import { IRootState } from './../../../../reducer/reducer.config';

import { Basic } from './../../../../models/project/project.model';

import { GET_BASIC_PROJECTS_BY_USER_ID_QUERY, GetBasicProjectsByUserIdResponse } from './../../../../models/project/project.query';

import Icon from './../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectsListSectionProps = {
    userId: number
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        router: {
            goToProjectDetail: (projectId: number) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectsListSection
extends React.Component<ChildProps<ProjectsListSectionProps & StateProps & DispatchProps, GetBasicProjectsByUserIdResponse>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectsListSectionProps & StateProps & DispatchProps, GetBasicProjectsByUserIdResponse>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('SidebarWrapper -> ProjectsListSection actived');

        // Bind methods
        this._handleClick = this._handleClick.bind(this);

    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle click
     * @method _handleClick
     * @example this._handleClick()
     * @private
     * @param {number} projectId - Project Id
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     * // TODO: Implementar cuando sea posible, por ahora se continuamos usando Link. NOTE: 1
     */
    private _handleClick = (projectId: number) => (e: React.FormEvent<{}>) => {
        e.preventDefault();
        this.props.actions.router.goToProjectDetail(projectId);
    }


    /**
     * @desc Get Create Project Btn
     * @method _getCreateProjectBtn
     * @example this._getCreateProjectBtn()
     * @private
     * @returns {JSX.Element} <Popup />
     */
    private _getCreateProjectBtn(): JSX.Element {
        return (
            <Popup
            trigger={
                <Link className="link-reset d-flex align-content-center ml-auto"
                      to="/dashboard/projects/new">
                    <Icon icon="plus"
                          iconClass="title__icon stroke-white strokeWidth-4"
                          width="18" height="18"/>
                </Link>
            }
            position="top center"
            size="tiny"
            inverted={true}>
                Create a project
            </Popup>
        );
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;


        /*       VALIDATIONS       */
        /***************************/
        if (data.loading) {
            return (
                <div className="ProjectsSection">
                <div className="subtitle px-3 py-2 d-flex align-items-center">
                    <span>
                        Loading...
                    </span>
                </div>
            </div>
            );
        }

        if (data.error) {
            return (<p>{data.error.message}</p>);
        }


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ProjectsSection">
                <div className="subtitle px-3 py-2 d-flex align-items-center">
                    <span>
                        Projects
                    </span>
                    {this._getCreateProjectBtn()}
                </div>

                {/* Create Projects List */}
                {data.basicProjectsByUserId.map((basicProject: Basic) => (
                    <Link key={basicProject.id} 
                    to={`/dashboard/projects/${basicProject.id}`} className="option px-3 py-1">
                        <Icon icon="chevronRight"
                            iconClass="stroke-white strokeWidth-3 ml-2 mr-1"
                            width="16" height="16"/>
                        <span className="fontSize-sm fontWeight-6 color-white">
                            {basicProject.name}
                        </span>
                    </Link>
                ))}
            </div>
        );
    }
    
}


// Query options
const config = {
    options: (ownProps: ProjectsListSectionProps & StateProps) => {
        return { 
            variables: 
            { 
                userId: ownProps.userId
            } 
        };
    }
};

// Query
const getBasicProjectsByUserIdQuery = graphql<GetBasicProjectsByUserIdResponse, ProjectsListSectionProps>(
    GET_BASIC_PROJECTS_BY_USER_ID_QUERY, config
);


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
// TODO: Implementar cuando sea posible, por ahora se continuamos usando Link. NOTE: 1
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            router: {
                goToProjectDetail: (projectId) => dispatch(push(`/dashboard/projects/${projectId}`))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const projectsListSectionConnect = connect(null, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose<any>(
    projectsListSectionConnect,
    getBasicProjectsByUserIdQuery
)(ProjectsListSection);


/*

(1) - Por alguna razón al lanzar la Action: dispatch(push(`/dashboard/projects/${projectId}`)), si cambia la url
pero no se dispara la Action (No se ve en Redux DevTools console). Volvi a implementar Link, dejo una referencia
que deberiamos aplicar para cambiar las rutas a través de Actions:
reference: https://blog.marvelapp.com/managing-the-url-in-a-redux-app/

*/