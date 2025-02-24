const BASE_URL = 'http://localhost:8000'
let statusLogin = ''
let loginId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('Ep_id')
    await checkLoginEp()
    try {
        console.log('id', id)
        const response = await axios.get(`${BASE_URL}/employee/${id}`)
        const employee = response.data[0]
        console.log('employee', employee)

        let User_firstnameDOM = document.querySelector('input[name=user_firstname]')
        let User_lastnameDOM = document.querySelector('input[name=user_lastname]')
        let User_emailDOM = document.querySelector('input[name=user_email]')
        let User_phoneDOM = document.querySelector('input[name=user_phone]')
        let User_addressDOM = document.querySelector('textarea[name=user_address]')

        User_firstnameDOM.value = employee.firstname
        User_lastnameDOM.value = employee.lastname
        User_emailDOM.value = employee.email
        User_phoneDOM.value = employee.phone
        User_addressDOM.value = employee.location

    } catch (error) {
        console.log('error', error);
    }
}

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