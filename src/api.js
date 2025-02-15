// src/api.js

import {delCookie, getCookie} from './cookie.js';

const API_BASE_URL = 'http://localhost:3000'; // Or your actual API base URL

async function getUserFromCookies() {
    const user = JSON.parse(getCookie("userDetail"));
    if(user){
        return user.token;
    }
    return null;
}

async function fetchAPI(endpoint, options = {}) {
    const token = await getUserFromCookies();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // try {
    //     const parse = JSON.parse(token);
    //
    //     console.log("check true token:"+parse.token);
    // } catch (e) {
    //
    //     console.log("check false token!!!");
    // }

    // if(token){
    //     console.log("check token:"+token);
    // }

    if (endpoint !== '/token/registerUser' && endpoint !== '/token/login' && token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: headers,
    });

    if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'API request failed');
    }

    return response.json();
}

// User API

export async function getAllUsers() {
    return fetchAPI('/user');
}

export async function updateUser(userId, userData) {
    return fetchAPI(`/user/updateById`, {
        method: 'POST',
        body: JSON.stringify({ userId, ...userData }),
    });
}

export async function registerUser(userData) {
    return await fetchAPI('/user/registerUser', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
}

export async function loginUser(credentials) {
    return await fetchAPI('/user/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

export async function logoutUser() {
    const response = fetchAPI('/user/logout', {
        method: 'POST',
    });

    delCookie("userDetail");

    return response;
}

export async function removeUser(userId) {
    return fetchAPI('/user/remove', {
        method: 'DELETE',
        body: JSON.stringify({ userId }),
    });
}

export async function getUserById(userId) {
    return fetchAPI(`/user/${userId}`);
}

export async function updateUserById(user) {
    return await fetchAPI(`/user/updateById`, {
        method: "POST",
        body:  JSON.stringify( user ) ,
    });
}


// Product API

export async function getAllProducts() {
    return await fetchAPI('/product');
}

export async function getProductById(productId) {
    return fetchAPI(`/product/id`, {
        method: 'GET',
        body: JSON.stringify({ productId }),
    });
}

export async function addProduct(productData) {
    return fetchAPI('/product/add', {
        method: 'POST',
        body: JSON.stringify(productData),
    });
}

export async function updateProduct(productId, productData) {
    return fetchAPI(`/product/updateById`, {
        method: 'PUT',
        body: JSON.stringify({ productId, ...productData }),
    });
}

export async function deleteProduct(productId) {
    return fetchAPI('/product/remove', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
    });
}

export async function updateProductPhoto(formData) {
    const response = await fetch(`${API_BASE_URL}/products/updatePhoto`, {
        method: 'PUT',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
    }

    return response.json();
}

export async function likeProduct(productId) {
    return await fetchAPI(`/product/like`, {
        method: 'PUT',
        body: JSON.stringify({ productId }),
    });
}

export async function unlikeProduct(productId) {
    return await fetchAPI(`/product/unlike`, {
        method: 'PUT',
        body: JSON.stringify({ productId }),
    });
}

export async function getLikesCount(productId) {
    return fetchAPI(`/product/getLikesCount`, {
        method: 'GET',
        body: JSON.stringify({ productId }),
    });
}

export async function getPhoto(productId) {
    return fetchAPI(`/product/getPhoto`, {
        method: 'POST',
        body: JSON.stringify(productId),
    });
}

export async function getProductsByLike() {
    return fetchAPI(`/product/getProductsByLikes`, {
        method: 'GET',
    });
}

export async function getProductsByCreateDate() {
    return fetchAPI(`/product/getProductsByCreatedAt`, {
        method: 'GET',
    });
}

// Test API

export async function testAPI(endpoint, method, headersText, bodyText) {
    let headers = {};
    try {
        headers = JSON.parse(headersText);
    } catch (error) {
        alert('Invalid JSON in headers');
        return;
    }
    let body = null;
    if (method === 'POST' || method === 'PUT') {
        try {
            body = JSON.parse(bodyText);
        } catch (error) {
            alert('Invalid JSON in body');
            return;
        }
    }
    const options = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null,
    };
    try {
        const response = await fetchAPI(endpoint, options);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function convertPhoto(response) {
    console.log("check fetchAPI !!")

    document.getElementById('photo-show').innerHTML = `<img src="${imgSrc}" alt="product photo">`;

}