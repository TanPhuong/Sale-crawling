import { gql } from "apollo-angular";

// User
export const GET_USERS = gql`
    query {
        findAllUser {
            id
            fullName
            email
            phoneNumber
            role {
                id
                name
            }
        }
    }
`;

export const GET_USER_BY_ID = gql`
    query($id: ID) {
        findUserById(id: $id) {
            id
            fullName
            email
            phoneNumber
            role {
                id
                name
            }
        }
    }
`;

export const GET_USER_BY_EMAIL = gql`
    query findUserByEmail($email: String) {
        findUserByEmail(email: $email) {
            id
            fullName
            email
            phoneNumber
            role {
                id
                name
            }
        }
    }
`;


// Role
export const GET_ROLES = gql`
    query {
        findAllRole {   
            id
            name
        }
    }
`;

export const CREATE_ROLES = gql`
    mutation addRole($id: ID!, $name: String!) {
        addRole(input: { id: $id, name: $name }) {
            id
            name
        }
    }
`;

export const UPDATE_ROLES = gql`
    mutation updateRole($id: ID!, $name: String!) {
        updateRole(input: { id: $id, name: $name }) {
            id
            name
        }
    }
`;

export const DELETE_ROLES = gql`
    mutation deleteRole($id: ID!) {
        deleteRole(id: $id) {
            id
            name
        }
  }
`;

export const GET_ROLE_BY_ID = gql`
    query($id: ID) {
        findRoleById(id: $id) {
            name
        }
    }
`;



// Crawl web
export const GET_CRAWL = gql`
    query {
        findAllCrawl {
            id
            nameUrl
            status
        }
    }
`;


// Product 
export const GET_PRODUCT = gql`
    query {
        findAllProduct {
            id
            name
            price
            discount
            salePrice
            url
            image
            review
            sold
        }
    }
`;