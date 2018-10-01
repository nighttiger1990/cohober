import {connect} from 'react-redux';
import module from './nearby.module';
import NearBy from "./nearby.component";

export default connect(module.mapStateToProps, module.mapDispatchToProps)(NearBy);
