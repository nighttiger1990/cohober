import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        project: state.project,
        category: state.category,
        lang: state.language.lang,
        functions: state.functions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (data, callback) => dispatch(actions.createProject(data, callback)),
        onGetCategory: () => {
            dispatch(actions.getCategories())
        },
        getListProject: (type) => {
            dispatch(actions.getProjects(type))
        },
    }
};
export default { mapStateToProps, mapDispatchToProps };