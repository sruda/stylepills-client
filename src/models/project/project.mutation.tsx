/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { Color as ColorModel } from './../color/color.model';


/************************************/
/*            INTERFACES            */
/************************************/


/********************************/
/*          MUTATIONS           */
/********************************/
export const CREATE_PROJECT_MUTATION = gql`
    mutation createProject($input: CreateProjectInput!) {
        createProject(input: $input) {
            ok
            message
        }
    }
`;

/*        TYPE         */
/***********************/

export type CreateProjectInput = {
    authorId: number;
    name: string;
    website?: string;
    colorPalette: Array<ColorModel>;
    private: boolean;
    projectCategoryId: number;
};


// --------------------------------


/*

CREATE_PROJECT_MUTATION
mutation createProject($input: CreateProjectInput!) {
    createProject(input: $input){
        ok
        message
    }
}

Query Variables:
{
    "input": {
        "authorId": 2,
        "name": "Airbnb 50",
        "website": "https://www.airbnb.com",
        "colorPalette":[
            { 
                "name": "light primary 50",
                "type": "primary",
                "hex": "#CCCCCC",
                "rgba": {
                    "r": 255,
                    "g": 254,
                    "b": 253,
                    "a": 1
                }
            },
            { 
                "name": "secondary 50",
                "type": "secondary",
                "hex": "#000000",
                "rgba": {
                    "r": 243,
                    "g": 242,
                    "b": 241,
                    "a": 1
                }
            }
        ],
        "private": true,
        "projectCategoryId": 1
    }
}

*/