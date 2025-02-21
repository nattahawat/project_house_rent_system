const BASE_URL = 'http://localhost:8000'
let selectedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    await checkLogin()
    try {
        console.log('id', id)
        const response = await axios.get(`${BASE_URL}/custom/${id}`)
        const custom = response.data[0]
        console.log('custom', custom)

        let User_firstnameDOM = document.querySelector('input[name=user_firstname]')
        let User_lastnameDOM = document.querySelector('input[name=user_lastname]')
        let User_emailDOM = document.querySelector('input[name=user_email]')
        let User_phoneDOM = document.querySelector('input[name=user_phone]')
        let User_addressDOM = document.querySelector('textarea[name=user_address]')

        User_firstnameDOM.value = custom.firstname
        User_lastnameDOM.value = custom.lastname
        User_emailDOM.value = custom.email
        User_phoneDOM.value = custom.phone
        User_addressDOM.value = custom.location

    } catch (error) {
        console.log('error', error);
    }
}

const checkLogin = async () => {
    console.log('checkLogin');
    const url = new URL(window.location.href)
    loginId = url.searchParams.get('id')
    console.log(loginId);
    if (loginId != null) {
        statusLogin = "login"
        let navloginDOM = document.getElementById('nav')
        console.log("id",loginId);
        let htmlnavDOM = ''
        htmlnavDOM += `
                    <a href="/main.html?id=${loginId}"><img src="/imags/Screenshot 2025-01-22 151148.png" width="70" height="70" style="margin: 10%;"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse p-2" id="navbarSupportedContent" style="width: 100%;">
                        <ul class="navbar-nav me-auto mb-4 mb-lg-0" s>
                            <a class="nav-link active" aria-current="page" href="/main.html?id=${loginId}">Home</a>
                            <a class="nav-link active" aria-current="page" href="/pages/search.html?id=${loginId}">Search</a>
                            <a class="nav-link active" style="width: 100px" aria-current="page" href="/pages/about.html?id=${loginId}">About Us</a>
                        </ul>
                        <div class="profile" style="width: 100% ; text-align: right; margin-right: 20px;">
                            <a href="/pages/proflie.html?id=${loginId}" style="color: black; text-decoration: none;">
                            <img src="/imags/8847419.png" width="60px">
                            </a>
                        </div>
                    </div>`
        navloginDOM.innerHTML = htmlnavDOM
        console.log(statusLogin);
    } else {
        statusLogin = "logout"
        window.location.href = '/pages/login.html'
    }
}

const view = async () => {
    window.location.href = `/pages/view.html?id=${loginId}`
}