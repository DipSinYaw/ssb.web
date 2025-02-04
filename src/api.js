// src/api.js

import { getCookie, setCookie } from './cookie.js';

const API_BASE_URL = 'http://localhost:3000'; // Or your actual API base URL

function getTokenFromCookies() {
    return getCookie('token');
}

async function fetchAPI(endpoint, options = {}) {
    const token = getTokenFromCookies();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
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
    const response = await fetchAPI('/user/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });

    // if (response.token) {
    //     setCookie('token', response.token, 7); // Set token cookie for 7 days
    // }

    return response;
}

export async function logoutUser() {
    return fetchAPI('/user/logout', {
        method: 'POST',
    });
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


// Product API

export async function getAllProducts() {
    return fetchAPI('/product');
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
    return fetchAPI(`/products/like`, {
        method: 'PUT',
        body: JSON.stringify({ productId }),
    });
}

export async function unlikeProduct(productId) {
    return fetchAPI(`/product/unlike`, {
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

    // if (response && response.data) {
    //     const base64String = await bufferToBase64(response.data);
    //     const mimeType = 'image/png'; // Default to 'image/jpeg' if mimeType is not provided
    //     const imgSrc = `data:${mimeType};base64,${base64String}`;
    document.getElementById('photo-show').innerHTML = `<img src="${imgSrc}" alt="product photo">`;
    //     // document.getElementById('photo-show').textContent = 'Photo available';
    // } else {
    //     document.getElementById('photo-show').textContent = 'No photo available';
    // }

    // const formData = new FormData();
    // formData.append('photo', photo);
    // return formData;
}

export async function bufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}