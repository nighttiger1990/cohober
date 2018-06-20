import {connect} from 'react-redux';
import RaiseFunding from "./raisefunding.component";
import module from './raisefunding.module'


export default connect(module.mapStateToProps, module.mapStateToProps)(RaiseFunding);