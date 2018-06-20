import {connect} from 'react-redux';
import Idea from './idea.component';
import module from './idea.module';

export default connect(module.mapStateToProps, module.mapDispatchToProps)(Idea);