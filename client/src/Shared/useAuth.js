import { useState, useEffect } from 'react';
import Api from './Api';

let isChecking = false;
let checkPromise = null;
let cachedResult = null;
let listeners = new Set();

async function verifyToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(Api('token/verify'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            localStorage.removeItem('token');
            return null;
        }

        return token;
    } catch (error) {
        return null;
    }
}

function addListener(listener) {
    listeners.add(listener);

    if (cachedResult !== null) {
        listener(cachedResult);
    }

    return () => listeners.delete(listener);
}

function notifyListeners(result) {
    listeners.forEach(listener => listener(result));
}

async function checkToken() {
    if (cachedResult !== null) {
        return cachedResult;
    }

    if (isChecking && checkPromise) {
        return await checkPromise;
    }

    isChecking = true;

    checkPromise = verifyToken()
        .then(token => {
            const result = !!token;
            cachedResult = result;
            isChecking = false;
            checkPromise = null;

            notifyListeners(result);

            return result;
        }).catch(_ => {
            const result = false;
            cachedResult = result;
            isChecking = false;
            checkPromise = null;

            notifyListeners(result);

            return result;
        });

    return await checkPromise;
}

function clearCache() {
    cachedResult = null;
    isChecking = false;
    checkPromise = null;
}

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('token');
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setIsAuthenticated(false);
            return;
        }

        const removeListener = addListener(setIsAuthenticated);

        checkToken();

        return removeListener;
    }, []);

    return { isAuthenticated };
}

export { useAuth, clearCache };