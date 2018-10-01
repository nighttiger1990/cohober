import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => dispatch(actions.getNotification())
    }
};
export default {mapStateToProps, mapDispatchToProps};