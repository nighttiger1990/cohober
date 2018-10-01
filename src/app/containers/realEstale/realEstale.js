import {connect} from 'react-redux';
import RealEstale from "./realEstale.component";
import module from './realEstale.module';


export default connect(module.mapStateToProps, module.mapDispatchToProps)(RealEstale);