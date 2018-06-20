import {connect} from 'react-redux';
import Login from './login.component';
import module from './login.module';

export default connect(module.mapStateToProps, module.mapDispatchToProps)(Login);