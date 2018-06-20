import actions from "../../actions";

const mapStateToProps = (state) => {
    return {
        user: state.user.info,
        project: state.project,
        lang: state.language.lang,
        functions: state.functions,
        locations: state.locations
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListProject: (type) => {
            dispatch(actions.getProjects(type))
        },
        logOut: () => {
            dispatch(actions.logout())
        },
        dismiss: () => {
            dispatch(actions.dismissLoading())
        },
        onChangeLang: (lang) => dispatch({type: lang}),
        onFollowProject: (id) => dispatch(actions.followProject(id)),
        getProjectID: (id) => dispatch(actions.getProjectID(id)),
        toggleSearchResultModal: (data) => dispatch(actions.toggleSearchResultModal(data)),
        getAddressPredictions: (data) => dispatch(actions.getAddressPredictions(data)),
        getSelectedAddress: (id) => dispatch(actions.getSelectedAddress(id)),
        onCurrentLocation: () => dispatch(actions.getCurrentAddress()),
        onChangeFunction: (type) => dispatch({type: type})

    }
};
export default {
    mapStateToProps, mapDispatchToProps
}