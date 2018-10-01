import actions from "../../actions";
import reactotronReactNative from 'reactotron-react-native';

const mapStateToProps = (state) => {
    reactotronReactNative.log("xxxxx", state);
    return {
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