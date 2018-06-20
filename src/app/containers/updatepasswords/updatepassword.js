import {connect} from 'react-redux';
import UpdatePassword from "./updatepassword.component";
import module from './updatepassword.module';

export default connect(module.mapStateToProps, module.mapDispatchToProps)(UpdatePassword);