import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        category: state.category,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetCategory: () => {
            dispatch(actions.getCategories())
        }
    }
};
export default {mapDispatchToProps, mapStateToProps};