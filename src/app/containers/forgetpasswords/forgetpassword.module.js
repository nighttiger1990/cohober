import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onForget: (email) => dispatch(actions.forgotPassword(email))
    }
};
export default {mapStateToProps, mapDispatchToProps};