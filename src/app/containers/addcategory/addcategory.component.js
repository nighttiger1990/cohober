import React from "react";
import {View} from "react-native";
import * as g from '../../util';
import HComponent from "../common/HComponent";
import Loading from "../components/loading";
import ContentAddCategory from "./components/ContentAddCategory";
import TOOLBAR from "../components/toolbar";

class AddCategory extends React.PureComponent {
    static navigationOptions = () => ({

        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            name: null
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({isLoading: false}), 3000);
    }


    render() {
        if (this.state.isLoading || this.props.category.isLoading) {
            return (<Loading/>)
        } else {
            return (
                <View style={{flex: 1, backgroundColor: '#ffffff', width: g.sw, height: g.sh}}>
                    {
                        <TOOLBAR imageLeft={require('../../assets/icons/login_back.png')}
                                 leftPress={() => requestAnimationFrame(() => this.props.navigation.goBack())}
                                 title={this.props.lang.content.addCategory}
                        />
                    }
                    {
                        <ContentAddCategory onCreateCategory={this.props.onCreateCategory} lang={this.props.lang}/>
                    }
                </View>);
        }
    }
}

export default AddCategory;