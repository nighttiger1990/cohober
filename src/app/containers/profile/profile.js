import {connect} from 'react-redux';
import module from './profile.module';
import Profile from './profile.component';


export default connect(module.mapStateToProps, module.mapDispatchToProps)(Profile);