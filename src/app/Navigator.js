import { StackNavigator } from 'react-navigation';
import Login from './containers/login/login';
import Home from './containers/homes/home';
import Register from './containers/registers/register';
import ForgetPassword from './containers/forgetpasswords/forgetPassword';
import SignIn from './containers/signin/signin';
import UpdatePassword from './containers/updatepasswords/updatepassword';
import Profile from './containers/profile/profile';
import History from './containers/histories/history';
import Notification from './containers/notifications/notification';
import Setting from './containers/settings/setting';
import Idea from './containers/idea/idea';
import RaiseFunding from './containers/raisefundings/raisefunding.component';
import Category from './containers/category/categories';
import DetailNotification from './containers/notifications/detail';
import AddCategory from './containers/addcategory/addcategory';
import DetailHistory from './containers/histories/detail';
import Around from './containers/nearby/nearby';
import RealEstale from './containers/realEstale/realEstale'
import SecondHand from './containers/secondHand/secondHand';
import ProjectDetail from './containers/projectDetail/projectDetail';
import QuanLyDangTin from './containers/quan-ly-dang-tin/index';
import FullScreenImage from './containers/fullscreen-image';

const AppNavigator = StackNavigator({

    Login: {
        screen: Login
    },
    Home: {
        screen: Home,
        navigationOptions: null
    },
    Register: {
        screen: Register
    },
    ForgetPassword: {
        screen: ForgetPassword
    },
    SignIn: {
        screen: SignIn
    },
    UpdatePassword: {
        screen: UpdatePassword
    },
    Profile: {
        screen: Profile
    },
    History: {
        screen: History
    },
    Notification: {
        screen: Notification
    },
    Setting: {
        screen: Setting
    },
    Idea: {
        screen: Idea
    },
    RaiseFunding: {
        screen: RaiseFunding
    },
    Category: {
        screen: Category
    },
    DetailNotification: {
        screen: DetailNotification
    },
    AddCategory: {
        screen: AddCategory
    },
    DetailHistory: {
        screen: DetailHistory
    },
    Around: {
        screen: Around
    },
    RealEstale: {
        screen: RealEstale
    },
    SecondHand: {
        screen: SecondHand
    },
    ProjectDetail: {
        screen: ProjectDetail
    },
    QuanLyDangTin: {
        screen: QuanLyDangTin
    },
    FullScreenImage: {
        screen: FullScreenImage
    }
}, {
        initialRouteName: 'Login',
        navigationOptions: {
            gesturesEnabled: false
        },

    });
export default AppNavigator;