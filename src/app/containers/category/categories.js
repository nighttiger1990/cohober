import React from 'react';
import {connect} from 'react-redux';
import module from './category.module';
import Category from './category.component.js';

export default connect(module.mapStateToProps, module.mapDispatchToProps)(Category);