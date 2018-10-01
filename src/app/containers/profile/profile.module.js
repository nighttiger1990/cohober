import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(actions.logout()),
        onProfile: () => dispatch(actions.getProfile()),
        onUpdate: (data) => dispatch(actions.updateProfile(data))
    }
};
export default {mapStateToProps, mapDispatchToProps};