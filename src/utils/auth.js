const isBrowser = typeof window !== `undefined`

export const setUser = user => (window.localStorage.betsmartUser = JSON.stringify(user));

const getUser = () => {
    if(window.localStorage.betsmartUser) {
        let user = JSON.parse(window.localStorage.betsmartUser);
        return user ? user : null
    }
    return null
}

export const isLoggedIn = () => {
    if(!isBrowser) return false;

    const user = getUser();
    if (user) {
        return user
    } else {
        return false
    }
}

export const getCurrentUser = () => isBrowser && getUser();

export const logout = callback => {
    if(!isBrowser) return
    setUser(null);
    callback();
}