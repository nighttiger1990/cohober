import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp: (data) => dispatch(actions.signup(data))
    }
};
export default {mapStateToProps, mapDispatchToProps};