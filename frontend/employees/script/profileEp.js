const BASE_URL = 'http://localhost:8000'
let statusLogin = ''
let loginId = ''
let statuswed = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('Ep_id')
    const urlParams2 = new URLSearchParams(window.location.search)
    const edit = urlParams2.get('edit')
    await checkLoginEp()
    console.log('edit', edit);
    if (edit != 'edit' && edit != null || edit == null) {
        await loadProfile()
    } else {
        await editProfile()
    }
}

const loadProfile = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('Ep_id')
    try {
        console.log('id', id)
        const response = await axios.get(`${BASE_URL}/employee/${id}`)
        const employee = response.data[0]
        console.log('employee', employee)

        let profileDOM = document.getElementById('profile')
        let htmlprofileDOM = ''
        htmlprofileDOM += `
                    <div id="button_logout"></div>
                    <h3 style="font-weight: bold; text-align: center;">My Profile</h3>
                    <div class="owner">
                        <h4 style="font-weight: bold; margin-top: 20px;">ข้อมูลผู้ใช้</h4>
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">ชื่อ:</div>
                                <input type="text" class="form-control" name="user_firstname" placeholder="ชื่อ"
                                    disabled readonly value="${employee.firstname}">
                            </div>
                            <div class="col-6">
                                <div style="font-weight: bold;">นามสกุล:</div>
                                <input type="text" class="form-control" name="user_lastname" placeholder="นามสกุล"
                                    disabled readonly value="${employee.lastname}">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">email:</div>
                                <input type="text" class="form-control" name="user_email" placeholder="email" disabled
                                    readonly value="${employee.email}">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">เบอร์ติดต่อ:</div>
                                <input type="text" class="form-control" name="user_phone" placeholder="เบอร์มือถือ"
                                    disabled readonly value="${employee.phone}">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-12">
                                <div style="font-weight: bold;">ที่อยู่:</div>
                                <textarea style="width: 100%; resize: none;" class="form-control" name="user_address"
                                    placeholder="บ้านเลขที่ หมู่ที่ ถนน ตำบล อำเภอ จังหวัด" disabled>${employee.location}</textarea>
                            </div>
                        </div>
                    </div>
                    <div id="editprofile"></div>`
        profileDOM.innerHTML = htmlprofileDOM

        let buttonDOM = document.getElementById('button_logout')
        let htmlDOM = ''
        htmlDOM += `
        <button class="btn col-1 p-2" onclick="window.location.href='/main.html'"
                        style="text-align: center; border: 2px solid black; margin-left: 90%; width: auto;">
                        <img src="/imags/logout-icon-2048x1708-5s1s9mb0.png" style="width: 30px;" alt="...">
                        Logout
                    </button>
        `
        buttonDOM.innerHTML = htmlDOM
        let editDOM = document.getElementById('editprofile')
        let htmlEditDOM = ''
        htmlEditDOM += `
        <button class="btn col-1 p-2" onclick="window.location.href='/employees/profileEp.html?Ep_id=${id}&edit=edit'"
                        style="text-align: center; border: 2px solid black; margin-left: 90%; width: auto;">
                        Edit
                    </button>
        `
        editDOM.innerHTML = htmlEditDOM
    } catch (error) {
        console.log('error', error);
    }
}
// แก้ไขข้อมูล Profile
const editProfile = async () => {
    console.log('editProfile');
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('Ep_id')
    try {
        console.log('id', id)
        const response = await axios.get(`${BASE_URL}/employee/${id}`)
        const employee = response.data[0]
        console.log('employee', employee)

        let profileDOM = document.getElementById('profile')
        let htmlprofileDOM = ''
        htmlprofileDOM += `
                   <div id="button_logout"></div>
                    <h3 style="font-weight: bold; text-align: center;">My Profile</h3>
                    <div class="owner">
                        <h4 style="font-weight: bold; margin-top: 20px;">ข้อมูลผู้ใช้</h4>
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">ชื่อ:</div>
                                <input type="text" class="form-control" name="user_firstname" placeholder="ชื่อ"
                                    value="${employee.firstname}">
                            </div>
                            <div class="col-6">
                                <div style="font-weight: bold;">นามสกุล:</div>
                                <input type="text" class="form-control" name="user_lastname" placeholder="นามสกุล"
                                    value="${employee.lastname}">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">email:</div>
                                <input type="text" class="form-control" name="user_email" placeholder="email"
                                    value="${employee.email}">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">เบอร์ติดต่อ:</div>
                                <input type="text" class="form-control" name="user_phone" placeholder="เบอร์มือถือ"
                                    value="${employee.phone}">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-12">
                                <div style="font-weight: bold;">ที่อยู่:</div>
                                <textarea style="width: 100%; resize: none;" class="form-control" name="user_address"
                                    placeholder="บ้านเลขที่ หมู่ที่ ถนน ตำบล อำเภอ จังหวัด">${employee.location}</textarea>
                            </div>
                        </div>
                    </div>
                    <div id="editprofile"></div>`
        profileDOM.innerHTML = htmlprofileDOM


        let buttonDOM = document.getElementById('button_logout')
        let htmlDOM = ''
        htmlDOM += `
        <button class="btn col-1 p-2" onclick="window.location.href='/main.html'"
                        style="text-align: center; border: 2px solid black; margin-left: 90%; width: auto; display: none;">
                        <img src="/imags/logout-icon-2048x1708-5s1s9mb0.png" style="width: 30px;" alt="...">
                        Logout
                    </button>
        `
        buttonDOM.innerHTML = htmlDOM
        let editDOM = document.getElementById('editprofile')
        let htmlEditDOM = ''
        htmlEditDOM += `
        <button class="btn col-1 p-2" onclick="window.location.href='/employees/profileEp.html?Ep_id=${id}'"
                        style="text-align: center; border: 2px solid black; margin-left: 90%; width: auto; style="display: none;">
                        Cancel
        </button>
        <button class="btn col-1 p-2" onclick="updateProfile()" style="text-align: center; border: 2px solid black; margin-left: 90%; width: auto;">
                        Save
        </button>
        `
        editDOM.innerHTML = htmlEditDOM
    } catch (error) {
        console.log('error', error);
    }
}
// บันทึกข้อมูล Profile
const updateProfile = async () => {
    try {
        let profile = {
            firstname: document.querySelector('input[name=user_firstname]').value,
            lastname: document.querySelector('input[name=user_lastname]').value,
            email: document.querySelector('input[name=user_email]').value,
            phone: document.querySelector('input[name=user_phone]').value,
            location: document.querySelector('textarea[name=user_address]').value
        }
        console.log('profile', profile)
        const urlParams = new URLSearchParams(window.location.search)
        const id = urlParams.get('Ep_id')
        const response = await axios.put(`${BASE_URL}/employee/${id}`, profile)
        console.log(response.data)
        window.location.href = `/employees/profileEp.html?Ep_id=${id}`
    } catch (error) {
        console.log('error', error);
    }
}
// ตรวจสอบการ login
const checkLoginEp = async () => {
    console.log('checkLogin');
    const url = new URL(window.location.href)
    loginId = url.searchParams.get('Ep_id')
    console.log(loginId);
    if (loginId != null) {
        statusLogin = "login"
        let navloginDOM = document.getElementById('nav')
        console.log("Ep_id", loginId);
        let htmlnavDOM = ''
        htmlnavDOM += `
                    <a href="/employees/mainEp.html?Ep_id=${loginId}"><img src="/imags/Screenshot 2025-01-22 151148.png" width="70" height="70" style="margin: 10%;"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse p-2" id="navbarSupportedContent" style="width: 100%;">
                        <ul class="navbar-nav me-auto mb-4 mb-lg-0" s>
                            <a class="nav-link active" aria-current="page" href="/employees/mainEp.html?Ep_id=${loginId}">Home</a>
                        </ul>
                        <div class="profile" style="width: 100% ; text-align: right; margin-right: 20px;">
                            <a href="/employees/profileEp.html?Ep_id=${loginId}" style="color: black; text-decoration: none;">
                            <img src="/imags/8847419.png" width="60px">
                            </a>
                        </div>
                    </div>`
        navloginDOM.innerHTML = htmlnavDOM
        console.log(statusLogin);
    } else {
        statusLogin = "logout"
        window.location.href = '/pages/loginEp.html'
    }
}