import {connect} from 'react-redux';
import Register from "./register.component";
import module from './register.module'

export default connect(module.mapStateToProps, module.mapDispatchToProps)(Register);