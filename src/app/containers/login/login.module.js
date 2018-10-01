import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRefreshToken: () => {
            dispatch(actions.refeshToken())
        },
        onLoginFB: () => dispatch(actions.loginFB()),
        onChangeLang: (lang) => dispatch({type: lang})
    }
};
export default {mapStateToProps, mapDispatchToProps};