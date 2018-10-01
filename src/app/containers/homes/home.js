import React from 'react';
import {connect} from 'react-redux';
import module from './home.module';
import Home from './home.component';

export default connect(module.mapStateToProps, module.mapDispatchToProps)(Home);