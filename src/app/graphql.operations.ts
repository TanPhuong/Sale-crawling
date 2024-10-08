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
        updateRole(id: $id, roleInput: { id: $id, name: $name }) {
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
export const ALL_PRODUCT = gql`
    query {
        getAllProduct {
            id
            name
            price
            discount
            salePrice
            url
            image
            review
            sold
            crawl {
                id
                nameUrl
                status
            }
        }
    }
`;


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
            crawl {
                id
                nameUrl
                status
            }
        }
    }
`;

export const PRIORITIZE_PRODUCT = gql`
    query {
        prioritizeProduct {
            id
            name
            price
            discount
            salePrice
            url
            image
            review
            sold
            crawl {
                id
                nameUrl
                status
            }
        }
    }
`;

export const REALTIME_CRAWLING = gql`
    query {
        realTimeCrawl {
            id
            name
            price
            discount
            salePrice
            url
            image
            review
            sold
            crawl {
                id
                nameUrl
                status
            }
        }
    }
`;

export const GET_PRODUCT_BY_PRICE = gql`
    query {
        findProductByPriceDESC {
            id
            name
            price
            discount
            salePrice
            url
            image
            review
            sold
            crawl {
                id
                nameUrl
                status
            }
        }
    }
`;

export const GET_PRODUCT_BY_DISCOUNT = gql`
    query {
        findProductByDiscount {
            id
            name
            price
            discount
            salePrice
            url
            image
            review
            sold
            crawl {
                id
                nameUrl
                status
            }
        }
    }
`;

// task
export const CREATE_TASK = gql`
    mutation createTasks($productInput: ProductInput, $userInput: UserInput){
        createTasks(productInput: $productInput, userInput: $userInput)
    }
`

// keyword
export const GET_KEYWORD = gql`
    query {
        findAllKeyword{
            id
            keyword_sale_url
            keyword_wrapper
            keyword_uptime
            keyword_title
            keyword_image
            keyword_price
            keyword_discount
            keyword_sale
            keyword_product
            keyword_review
            keyword_sold
            crawl {
                id
                nameUrl
                status
            }
        }
    }
`;

export  const GET_KEYWORD_BY_CRAWL = gql`
    query findKeywordByCrawl($input: crawlInput){
        findKeywordByCrawl(input: $input) {
            id
            keyword_sale_url
            keyword_wrapper
            keyword_uptime
            keyword_title
            keyword_image
            keyword_price
            keyword_discount
            keyword_sale
            keyword_product
            keyword_review
            keyword_sold
            crawl {
                id
                nameUrl
                status
            }
        }
    }
`;

export const RE_CONFIG_KEYWORD = gql`
    query reConfigKeyword($input: crawlInput){
        reConfigKeyword(input: $input) {
            id
            keyword_sale_url
            keyword_wrapper
            keyword_uptime
            keyword_title
            keyword_image
            keyword_price
            keyword_discount
            keyword_sale
            keyword_product
            keyword_review
            keyword_sold
            crawl {
                id
                nameUrl
                status
            }
        }
    }
`;
