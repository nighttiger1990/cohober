import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        category: state.category,
        lang: state.language.lang
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (data, callback) => dispatch(actions.createProject(data, callback)),
    }
};
export default { mapStateToProps, mapDispatchToProps };