import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        history: state.history,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => dispatch(actions.getHistory())
    }
};
export default {mapStateToProps, mapDispatchToProps};