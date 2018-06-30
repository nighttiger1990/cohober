import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native'
import Toast from 'react-native-toast-native';

export const getDataSuccess = (data) => {
    return {
        type: 'FETCH_PROJECT_DATA_SUCCESS',
        data
    }
};

export const loading = () => {
    return {
        type: "LOADING_PROJECT",
    }
};
export const getDataFail = () => {
    return {
        type: 'FETCH_DATA_FAILURE'
    }
};
export const addSuccess = () => {
    return {
        type: 'ADD_PROJECT_SUCCESS'
    }
};
export const nearbyMe = (data) => {
    return {
        type: 'FETCH_NEARBY_DATA',
        data
    }
};
function typeName(data) {
    //  'bds_sell', 'bds_buy', 'bds_thue', 'bds_doi', 'docu'
    switch (data.type) {
        case "raiseFunding":
            return JSON.stringify({
                "name": data.name,
                "detail": data.detail,
                "type": data.type,
                "startDate": data.startDate,
                "endDate": data.endDate,
                "location": data.location,
                "category": data.category,
                "raiseMoney": data.raiseMoney
            })
        case 'idea':
            return JSON.stringify({
                "name": data.name,
                "detail": data.detail,
                "type": data.type,
                "startDate": data.startDate,
                "endDate": data.endDate,
                "location": data.location,
                "category": data.category
            })
        case 'bds_sell': return JSON.stringify({
            "name": data.name,
            "detail": data.detail,
            "type": data.type,
            "startDate": data.startDate,
            "endDate": data.endDate,
            "location": data.location,
            "huong": data.direction,
            "address": data.address,
            "dienTich": data.area,
            "price": data.price,
            "images": data.image
        })
        case 'bds_buy':
            return JSON.stringify({
                "name": data.name,
                "detail": data.detail,
                "type": data.type,
                "startDate": data.startDate,
                "endDate": data.endDate,
                "location": data.location,
                "huong": data.direction,
                "address": data.address,
                "dienTich": data.area,
                "price": data.price,
                "images": data.image
            })
        case 'bds_thue':
            return JSON.stringify({
                "name": data.name,
                "detail": data.detail,
                "type": data.type,
                "startDate": data.startDate,
                "endDate": data.endDate,
                "location": data.location,
                "huong": data.direction,
                "address": data.address,
                "dienTich": data.area,
                "price": data.price,
                "images": data.image
            })
        case 'bds_doi':
            return JSON.stringify({
                "name": data.name,
                "detail": data.detail,
                "type": data.type,
                "startDate": data.startDate,
                "endDate": data.endDate,
                "location": data.location,
                "huong": data.direction,
                "address": data.address,
                "dienTich": data.area,
                "price": data.price,
                "images": data.image
            })
        case 'docu':
            return JSON.stringify({
                "name": data.name,
                "detail": data.detail,
                "type": data.type,
                "startDate": data.startDate,
                "endDate": data.endDate,
                "location": data.location,
                "price": data.price,
                "images": data.image,
                "address": data.address
            })
        default: {
            return (JSON.stringify({
                "name": data.name,
                "detail": data.detail,
                "type": data.type,
                "startDate": data.startDate,
                "endDate": data.endDate,
                "location": data.location,
                "category": data.category
            }))
        }
    }
}
export const createProjectAsync = async (data, token) => {
    console.log("a:" + JSON.stringify(JSON.parse(typeName(data))))
    try {
        return await fetch('http://api.cohober.vn/api/projects', {
            method: 'POST',
            headers: {
                'Authorization': token
            },
            body: JSON.stringify(JSON.parse(typeName(data)))
        }).then(async (response) => {
            return await response.json();
        }).then(async (res) => {
            return await res
        })
    } catch (error) {
        console.log(error)
    }

};
export const createProject = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let token = await AsyncStorage.getItem('token');
            let projects = await createProjectAsync(data, token);
            if (projects.id) {
                dispatch(addSuccess());
                dispatch(NavigationActions.back());

                Toast.show('Thành công', Toast.SHORT, Toast.TOP, {
                    height: 50,
                    width: 400,
                    backgroundColor: '#ffca00',
                    opacity: 0.5,
                    textAlign: 'center',
                    lines: 1,
                    borderRadius: 3
                });
                if (data.type == 'idea') {
                    dispatch(getProjects("idea"));
                } else if (data.type == 'raiseFunding') {
                    dispatch(getProjects("raiseFunding"));
                } else if (data.type === 'docu') {
                    dispatch(getProjects("docu"));
                } else {
                    dispatch(getProjects(["bds_sell", "bds_thue", "bds_buy", "bds_doi"]));
                }

            } else {
                dispatch(getDataFail());
                try {
                    let message = '';
                    for (project of projects) {
                        message += project.msg
                    }
                    Toast.show(message, Toast.SHORT, Toast.TOP, {
                        height: 50,
                        width: 400,
                        backgroundColor: '#ffca00',
                        opacity: 0.5,
                        textAlign: 'center',
                        lines: 1,
                        borderRadius: 3
                    });
                } catch (error) {
                }
            }
        } catch (error) {

        }

    }
};
export const getProjectsAsync = async (type, token) => {
    try {
        return await fetch('http://api.cohober.vn/api/projects?where=' + JSON.stringify({
            "type": type
        }), {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            }).then(async (response) => {
                return await response.json()
            }).then(async (res) => {
                return await res
            })
    } catch (error) {
        return error;
    }

};
export const getProjects = (type) => {
    return async (dispatch) => {
        try {
            let token = await AsyncStorage.getItem('token');
            // let typeAsync = type === 0 ? 'raiseFunding' : 'idea';
            //if(type==='realEstale')
            let projects = await getProjectsAsync(type === 'realEstale' ? ["bds_sell", "bds_buy", "bds_thue", "bds_doi"] : type, token);
            dispatch({ type: type });
            if (projects) {
                // {coordinate:{latitude:21.004934,longitude: 105.7808754},title:'Khách sạn xanh',price:100000000,detail:''},
                // {coordinate:{latitude:21.020803,longitude: 105.8053493},title:'Nuôi lợn sạch',price:500000000,detail:'Mô hình chăn lợn'}
                //    console.log(JSON.stringify(projects))
                let collect = [];
                for (const project of projects) {
                    try {
                        let data = {
                            key: project.id,
                            name: project.name,
                            detail: project.detail,
                            raiseMoney: project.raiseMoney,
                            coordinate: {
                                latitude: project.location.coordinates[1],
                                longitude: project.location.coordinates[0]
                            },
                            type: project.type,
                            owner: project.owner,
                            category: project.category,
                            startDate: project.startDate,
                            endDate: project.endDate,
                            phoneNumber: project.owner.phoneNumber ? project.owner.phoneNumber : "0"
                        };
                        collect.push(data)
                    } catch (error) {
                        console.log(error);
                    }

                }
                Promise.all(collect).then(() => {
                    dispatch(getDataSuccess(collect))
                })


            }
        } catch (error) {
            console.log(error)
        }
    }
};
export const getProjectIDAsync = async (id, token) => {
    try {
        return await fetch("http://api.cohober.vn/api/projects/" + id + "?populate=owner,category", {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then(async (response) => {
            return await response.json()
        }).then(async (res) => {
            return await res
        })
    }
    catch (error) {
        return error;
    }
};
export const getProjectID = (id) => {
    return async (dispatch) => {
        try {
            let token = await AsyncStorage.getItem('token');
            let projects = await getProjectIDAsync(id, token);
            if (projects.id) {
                dispatch({ type: 'FETCH_PROJECT_DETAIL_SUCCESS', data: projects })
            }
        } catch (error) {
            console.log(error)
        }
    }
};
export const followProjectAsync = async (id, token) => {
    return await fetch('http://api.cohober.vn/api/projects/follow', {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: JSON.stringify({
            "projectId": id
        })
    }).then(async (response) => {
        return await response.json()
    }).then(async (res) => {
        return await res
    })
};
export const followProject = (id) => {
    return async (dispatch) => {
        try {
            let token = await AsyncStorage.getItem('token');
            let projects = await followProjectAsync(id, token);
            if (projects.id) {
                console.log(JSON.stringify(projects));
                return 0
            } else return 1;
        } catch (error) {
            console.log(error)
        }
    }
};
export const getProjectByNearMeAsync = async (data, type, token) => {
    console.log(data);
    return await fetch('http://api.cohober.vn/api/projects/nearMe?where=' + JSON.stringify({
        "location": data,
        "type": type
    }) + "&populate=owner,category"
        , {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then(async (response) => {
            return await response.json()
        }).then(async (res) => {
            return await res
        })
};
export const measure = (lat1, lon1, lat2, lon2) => {
    const R = 6378.137; // Radius of earth in KM
    const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
export const getProjectByNearMeProject = (type) => {
    return async (dispatch) => {
        try {
            let data = [];
            let token = await AsyncStorage.getItem('token');
            dispatch({ type: type });
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    let lnglat = {
                        1: position.coords.longitude,
                        2: position.coords.latitude,
                    };
                    let dataLL = Object.values(lnglat);
                    let projects = await getProjectByNearMeAsync(dataLL, type === 'realEstale' ? ["bds_sell", "bds_buy", "bds_thue", "bds_doi"] : type, token);
                    // dispatch({type:type});

                    if (projects) {
                        console.log(projects)
                        dispatch(getProjects(type));
                        for (let i = 0; i < projects.length; i++) {
                            let p = projects[i];
                            // console.log(dataLL[1] + "," + dataLL[0] + "," + projects[i].location.coordinates[1] + "," + projects[i].location.coordinates[0]);
                            p.distance = measure(dataLL[1], dataLL[0], projects[i].location.coordinates[1], projects[i].location.coordinates[0]);
                            data.push(p);
                        }
                        Promise.all(data).then((value) => {
                            value.sort((a, b) => {
                                return a.distance - b.distance;
                            });
                            console.log(value)
                            dispatch(nearbyMe(value))
                        });
                    }
                } catch (error) {
                    console.log(error)
                }
            }, (error) => console.log(error));

        } catch (error) {
            console.log(error)
        }
    }
};

export const getProjectByIdUser = (type) => {
    return (dispatch) => {
        //fetch data o day
        dispatch({ type: type }) //chuyen type cua cno
        //get data
    }
}
