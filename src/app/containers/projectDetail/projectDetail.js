import { connect } from 'react-redux';
import ProjectDetail from "./projectDetail.component";
import actions from "../../actions";
import { fetchMyProject } from '../../actions/quan-ly-dang-tin';

const mapStateToProps = (state) => {
    return {
        project: state.project.project,
        lang: state.language
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onFollowProject: (id) => dispatch(actions.followProject(id)),
        getProjectID: (id) => dispatch(actions.getProjectID(id)),
        deleteProject: (id) => dispatch(actions.asyncDeleteProject(id)),
        getMyProject: (axios) => dispatch(fetchMyProject(axios))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);