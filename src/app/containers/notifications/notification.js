import module from './notification.module';
import Notification from './notification.component';
import {connect} from 'react-redux';

export default connect(module.mapStateToProps, module.mapDispatchToProps)(Notification);