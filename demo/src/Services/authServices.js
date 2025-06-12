const Mock_User = {
    email: 'sau@gamil.com',
    password: '123456789'
};

export const authServices = {
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === Mock_User.email && password === Mock_User.password) {
                    const userData = {
                        email: Mock_User.email,
                        name: 'Sau User',
                    };
                    localStorage.setItem('user', JSON.stringify(userData));
                    resolve(userData);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 1000);
        });
    },
    logout: () => {
        localStorage.removeItem('user');
    },
    isAuthenticated: () => {
        const user = localStorage.getItem('user');
        return user !== null;
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};