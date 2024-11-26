export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            const { genres, cities,  events, topCategories } = action.payload;
            return { ...state, genres, list: events, cities, topCategories };
        case 'GET_CHARS':
            return { ...state, list: action.payload };
        case 'GET_TOPCAT':
            return { ...state, topCategories: action.payload };
        case 'ADD_FAVS':
            return { ...state, favs: [...state.favs, action.payload] };
        case 'REMOVE_FAVS':
            // eslint-disable-next-line no-case-declarations
            const filteredFavs = state.favs.filter(item => item.id != action.payload.id);
            return { ...state, favs: [...filteredFavs] };
        case 'SET_FILTERS':
            return { ...state, homeFilters: action.payload };
        case 'TOGGLE_THEME':
            localStorage.setItem('theme', `${action.payload}`);
            return { ...state, theme: action.payload };

        case 'REGISTER':
            return {
                ...state,
                user: action.payload.user,
            };
        case "SET_REGISTRATION_SUCCESS":
            return { ...state, registrationSuccess: action.payload };
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.user,  // Actualiza con el objeto completo del usuario
            };
        case "LOGOUT":
            // Limpia localStorage cuando se hace logout
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('user'); // Si también quieres borrar el objeto del usuario
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };

        default:
            return state;
    }
};
