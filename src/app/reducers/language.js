const defaultState = {
    lang: {
        type: 'en',
        content: {
            login: 'Login',
            loginAc: 'Login to account',
            loginFb: 'Login to facebook',
            forgetPass: 'Forget password',
            password: 'Password',
            logout: 'Logout',
            confirmPass: 'Confirm password',
            currentPass: 'Current password',
            updatePass: 'Update password',
            signup: 'Signup',
            signupAc: 'Register account',
            phone: 'Phone number',
            fullName: 'Full name',
            history: 'History',
            notification: 'Notification',
            category: 'Category',
            setup: 'Setting',
            editProfile: 'Edit profile',
            profile: 'Profile',
            update: 'Update',
            idea: 'Idea',
            raiseFunding: 'Raise Funding',
            confirm: 'Confirm',
            newPass: 'New password',
            follow: 'Save',
            close: 'Close',
            addCategory: 'Add category',
            nameCategory: 'Category name',
            noData: 'No data',
            followed: 'Saved',
            startDate: 'Start date',
            endDate: 'End date',
            createDate: 'Create date',
            detailNotify: 'Detail notifications',
            detailHistory: 'Detail histories',
            addIdea: 'Add idea',
            nameIdea: 'Idea name',
            timeStart: 'Start time',
            timeEnd: 'End time',
            contentIdea: 'Idea content',
            note: 'Note',
            addFunding: 'Add raise funding',
            nameProject: 'Project name',
            money: 'Money',
            typeInp: 'Type',
            name: 'Name',
            cancel: 'Cancel',
            nearby: 'Nearby',
            ok: 'OK',
            invalidEmail: 'Invalid email',
            checkLocation: 'Please check the location',
            projectInfo: "Project info",
            contact: 'Contact',
            content: 'Content',
            realEstale: 'Real estale',
            secondHand: 'Second hand',
            docu:"Second hand",
            quanlydangtin:"Manager dang tin"
        }
    }
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case'en':
            return {
                ...state,
                lang: {
                    type: 'en',
                    content: {
                        login: 'Login',
                        loginAc: 'Login to account',
                        loginFb: 'Login to facebook',
                        forgetPass: 'Forget password',
                        password: 'Password',
                        logout: 'Logout',
                        confirmPass: 'Confirm password',
                        currentPass: 'Current password',
                        updatePass: 'Update password',
                        signup: 'Signup',
                        signupAc: 'Register account',
                        phone: 'Phone number',
                        fullname: 'Full name',
                        history: 'History',
                        notification: 'Notification',
                        category: 'Category',
                        setup: 'Setting',
                        editProfile: 'Edit profile',
                        profile: 'Profile',
                        update: 'Update',
                        idea: 'Idea',
                        raiseFunding: 'Raise Funding',
                        confirm: 'Confirm',
                        newPass: 'New password',
                        follow: 'Save',
                        close: 'Close',
                        addCategory: 'Add category',
                        nameCategory: 'Category name',
                        noData: 'No data',
                        followed: 'Saved',
                        startDate: 'Start date',
                        endDate: 'End date',
                        createDate: 'Create date',
                        detailNotify: 'Detail notifications',
                        detailHistory: 'Detail histories',
                        addIdea: 'Add idea',
                        nameIdea: 'Idea name',
                        timeStart: 'Start time',
                        timeEnd: 'End time',
                        contentIdea: 'Idea content',
                        note: 'Note',
                        addFunding: 'Add raise funding',
                        nameProject: 'Project name',
                        money: 'Money',
                        typeInp: 'Type',
                        name: 'Name',
                        cancel: 'Cancel',
                        nearby: 'Nearby',
                        ok: 'OK',
                        invalidEmail: 'Invalid email',
                        checkLocation: 'Please check the location',
                        projectInfo: "Project info",
                        contact: "Contact",
                        content: 'Content',
                        realEstale: 'Real estale',
                        secondHand: 'Second hand',
                        docu:"Second hand",
                        quanlydangtin:"Manager dang tin"
                    }
                }
            };
        case'vi':
            return {
                ...state,
                lang: {
                    type: 'vi',
                    content: {
                        login: 'Đăng nhập',
                        loginAc: 'Đăng nhập tài khoản',
                        loginFb: 'Đăng nhập facebook',
                        forgetPass: 'Quên mật khẩu',
                        password: 'Mật khẩu',
                        logout: 'Đăng xuất',
                        confirmPass: 'Nhập lại mật khẩu',
                        currentPass: 'mật khẩu cũ',
                        updatePass: 'Đổi mật khẩu',
                        signup: 'Đăng ký',
                        signupAc: 'Đăng ký tài khoản',
                        phone: 'Số điện thoại',
                        fullname: 'Họ và tên',
                        history: 'Lịch sử',
                        notification: 'Thông báo',
                        category: 'Lĩnh vực',
                        setup: 'Cài đặt',
                        editProfile: 'Chỉnh sửa thông tin',
                        profile: 'Thông tin cá nhân',
                        update: 'Cập nhật',
                        idea: 'Ý tưởng',
                        raiseFunding: 'Gọi vốn',
                        confirm: 'Xác nhận',
                        newPass: 'Mật khẩu mới',
                        follow: 'Lưu',
                        close: 'Đóng',
                        addCategory: 'Thêm lĩnh vực',
                        nameCategory: 'Tên lĩnh vực',
                        noData: 'Không có dữ liệu',
                        followed: 'Đã lưu',
                        startDate: 'Ngày bắt đầu',
                        endDate: 'Ngày kết thúc',
                        createDate: 'Ngày khởi tạo',
                        detailNotify: 'Chi tiết thông báo',
                        detailHistory: 'Chi tiết lịch sử',
                        addIdea: 'Thêm ý tưởng',
                        nameIdea: 'Tên ý tưởng',
                        timeStart: 'Thời gian bắt đầu',
                        timeEnd: 'Thời gian đến',
                        contentIdea: 'Nội dung ý tưởng',
                        note: 'Ghi chú',
                        money: 'Số tiền',
                        typeInp: 'Nhập',
                        nameProject: 'Tên dự án',
                        name: 'Tên',
                        cancel: 'Hủy bỏ',
                        addFunding: 'Thêm gọi vốn',
                        nearby: 'Quanh đây',
                        ok: 'Đồng ý',
                        invalidEmail: 'Email không hợp lệ',
                        checkLocation: 'Vui lòng kiểm tra vị trí',
                        projectInfo: "Thông tin dự án",
                        contact: 'Liên hệ',
                        content: 'Nội dung',
                        realEstale: 'Bất động sản',
                        secondHand: 'Đồ cũ',
                        docu:"Đồ cũ",
                        quanlydangtin:"Quản lý đăng tin"
                    }
                }
            };
        default:
            return state;
    }
}