import actions from "../../actions";

const mapStateToProps = (state) => {
    return {

        auth: state.auth,
        lang: state.language.lang,
        project: state.project,
        functions: state.functions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (type) => dispatch(actions.getProjectByNearMeProject(type))
    }
};
export default {mapStateToProps, mapDispatchToProps};