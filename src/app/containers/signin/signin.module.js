import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (data) => dispatch(actions.signIn(data))
    }
};
export default {mapStateToProps, mapDispatchToProps};