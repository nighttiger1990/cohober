const initalState = {
    isLoading: false,
    isLoaded: false,
    data: null,
    err: null,

    idea: null,
    goivon: null,
    bds: null,
    docu: null,
}
export default function QuanLyDangTin(state = initalState, action) {

    switch (action.type) {
        case "LOADING_QUAN_LY_TIN":
            return {
                ...state,
            }
        case 'SUCCESS_QUAN_LY_TIN':
            let obj = chiaArray(action.data);
            return {
                ...state,
                data: action.data,
                idea: obj.idea,
                goivon: obj.goivon,
                bds: obj.bds,
                docu: obj.docu,
            }
        case 'FAIL_QUAN_LY_TIN':
            return {
                ...state,
                err: action.err
            }
        case 'DELETE':
            return {
                ...state,
                data: null,
                err: null,

                idea: null,
                goivon: null,
                bds: null,
                docu: null,
            }
        default: return state

    }
}
const chiaArray = (data) => {
    let obj = {
        idea: [],
        goivon: [],
        docu: [],
        bds: [],
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "idea") {
            obj.idea.push(data[i]);

        } else if (data[i].type === "raiseFunding") {
            obj.goivon.push(data[i]);

        } else if (data[i].type === "docu") {
            obj.docu.push(data[i]);

        } else {
            obj.bds.push(data[i]);
        }
    }
    return obj;
}