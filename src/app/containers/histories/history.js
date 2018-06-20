import {connect} from 'react-redux';
import History from './history.component';
import module from './history.module'


export default connect(module.mapStateToProps, module.mapDispatchToProps)(History);