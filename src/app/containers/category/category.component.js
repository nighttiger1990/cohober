import React from 'react';
import CategoryComponent from './components/category';
import Loading from '../components/loading';

class Category extends React.PureComponent {
    static navigationOptions = () => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.onGetCategory();
        setTimeout(() => this.setState({isLoading: false}), 3000);
    }

    render() {
        if (this.state.isLoading || this.props.category.isLoading)
            return (<Loading/>);
        else return (
            <CategoryComponent data={this.props.category.data} navigation={this.props.navigation}
                               lang={this.props.lang}/>)
    }
}

export default Category;