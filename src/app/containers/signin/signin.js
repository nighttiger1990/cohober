import {connect} from 'react-redux';
import SignIn from "./signin.component";
import module from './signin.module';


export default connect(module.mapStateToProps, module.mapDispatchToProps)(SignIn);