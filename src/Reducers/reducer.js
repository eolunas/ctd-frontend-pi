export const reducer = (state, action) => {
    switch(action.type) {
        case 'GET_CHARS':
            return {...state, list: action.payload };
        case 'ADD_FAVS':
            return {...state, favs: [...state.favs, action.payload] };
        case 'REMOVE_FAVS':
            // eslint-disable-next-line no-case-declarations
            const filteredFavs = state.favs.filter(item => item.id != action.payload.id);
            return {...state, favs: [...filteredFavs] };
        case 'TOGGLE_THEME':
            localStorage.setItem('theme', `${action.payload}`);
            return {...state, theme: action.payload };
    }
}