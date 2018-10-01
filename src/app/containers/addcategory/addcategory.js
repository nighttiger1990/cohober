import React from 'react';
import {connect} from 'react-redux';
import module from './addcategory.module';
import AddCategory from './addcategory.component';

export default connect(module.mapStateToProps, module.mapDispatchToProps)(AddCategory);