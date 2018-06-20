import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        category: state.category,
        lang: state.language.lang
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onCreateCategory: (data) => {
            dispatch(actions.createCategory(data))
        }
    }
};
export default {mapStateToProps, mapDispatchToProps};