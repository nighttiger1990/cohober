import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (data) => dispatch(actions.createProject(data))
        
    }
};
export default {mapStateToProps, mapDispatchToProps};