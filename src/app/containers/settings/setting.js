import {connect} from 'react-redux';
import module from './setting.module';
import Setting from "./setting.component";


export default connect(module.mapStateToProps, module.mapDispatchToProps)(Setting);