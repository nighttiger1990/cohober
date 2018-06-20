import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        project: state.project,
        category: state.category,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (data) => dispatch(actions.createProject(data)),
        onGetCategory: () => {
            dispatch(actions.getCategories())
        }
    }
};
export default {mapStateToProps, mapDispatchToProps};