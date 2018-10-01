import {connect} from 'react-redux';
import SecondHand from "./secondHand.component";
import module from './secondHand.module';


export default connect(module.mapStateToProps, module.mapDispatchToProps)(SecondHand);