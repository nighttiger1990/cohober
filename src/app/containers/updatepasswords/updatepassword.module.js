import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatePassword: (data) => {
            dispatch(actions.updatePassword(data))
        }
    }
};
export default {mapStateToProps, mapDispatchToProps};