import {connect} from 'react-redux';
import ForgetPassword from './forgetpassword.component';
import module from './forgetpassword.module';

export default connect(module.mapStateToProps, module.mapDispatchToProps)(ForgetPassword);