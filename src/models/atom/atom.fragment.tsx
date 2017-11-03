/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { AUTHOR_ATOM_FRAGMENT } from './../user/user.fragment';
import { COMMENT_FRAGMENT } from './../comment/comment.fragment';
import { ATOM_CATEGORY_FRAGMENT } from './../atomCategory/atomCategory.fragment';


/********************************/
/*           FRAGMENT           */
/********************************/

export const ATOM_FRAGMENT = gql`
    fragment AtomFragment on Atom {
        id
        name
        html
        css
        contextualBg
        stores
        views
        likes
        comments {
            ...CommentFragment
        }
        download
        private
        author {
            ...AuthorAtomFragment
        }
        category {
            ...AtomCategoryFragment
        }
        createdAt
        updatedAt
        __typename
    }
    ${COMMENT_FRAGMENT}
    ${ATOM_CATEGORY_FRAGMENT}
    ${AUTHOR_ATOM_FRAGMENT}
`;