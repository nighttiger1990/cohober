import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang,
        functions: state.functions,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (data, callback) => dispatch(actions.createProject(data, callback)),
        getListProject: (type) => {
            dispatch(actions.getProjects(type))
        },
    }
};
export default { mapStateToProps, mapDispatchToProps };