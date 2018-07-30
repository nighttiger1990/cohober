import { connect } from 'react-redux';
import ProjectDetail from "./projectDetail.component";
import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        project: state.project.project,
        lang: state.language
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onFollowProject: (id) => dispatch(actions.followProject(id)),
        getProjectID: (id) => dispatch(actions.getProjectID(id))

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);