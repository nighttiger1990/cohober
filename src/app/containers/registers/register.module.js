import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp: (data, callback) => dispatch(actions.signup(data, callback))
    }
};
export default { mapStateToProps, mapDispatchToProps };