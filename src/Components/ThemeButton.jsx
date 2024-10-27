import { useCharStates } from "../Context";

 const ThemeButton = () => {
    const { state, dispatch } = useCharStates();
    const toggleTheme = () => dispatch({
      type: 'TOGGLE_THEME',
      payload: !state.theme,
    });

    return (
      <button className={`btn-theme ${state.theme ? "btn-light" : "btn-dark"}`} 
              onClick={toggleTheme} >
        {state.theme ? '🌞' : '🌑'}
      </button>
    );
}

export default ThemeButton;