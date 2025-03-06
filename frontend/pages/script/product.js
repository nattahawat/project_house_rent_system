const BASE_URL = 'http://localhost:8000'
let selectedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('homeid')
    console.log('homeid', id)

    try {
        const response = await axios.get(`${BASE_URL}/datahome/${id}`)
        console.log('loadData');
        console.log(response.data);
        let htmlData = '<div>'
        let datahome = response.data[0]
        const url = new URL(window.location.href)
        loginId = url.searchParams.get('id')
        console.log(loginId);
        if (loginId != null && loginId != 'null') {
            htmlData += `<div>
        <div class="datahome card card-body m-2">
            <div class="row p-2">
            <h2 style="font-weight: bolder;">${datahome.titlehome}</h2>
            <div class="col-6 p-1">
                <img src="/imags/${datahome.image}"
                    class="img-fluid rounded-start" alt="screenshot"
                    style="object-fit: cover; width: 100%; height: 400px;">
            </div>
            <div class="col-6 p-1">
                    <div class="card-body">
                        <p class="card-text" style="font-weight: bold;">Code: ${datahome.home_id}</p>
                        <p>ห้องนอน : ${datahome.bedroom} ห้อง</p>
                        <p>ห้องน้ำ : ${datahome.bathroom} ห้อง</p>
                        <p>อยู่ที่ : ${datahome.location}</p>
                        <h3 style="color: chocolate; text-align: center;">ราคา : ${datahome.price} ต่อเดือน</h3> 
                    </div>
            </div>
            <div class="card-body ">
                    <h3>รายละเอียด</h3>
                    <p>${datahome.detail}</p>
                    <div class="col-4" style="margin: auto;">
                            <a href='/pages/agreement.html?homeid=${datahome.home_id}&id=${loginId}' style="color: black; text-decoration: none;">
                                <button type="button" class="btn btn-primary"style="width: 100%; background-color: chocolate; font-weight: bold; ">
                                ทำสัญญาเช่า
                                </button>
                            </a>
                    </div>
            </div>
        </div>
        </div>
        <div>`
        } else {
            htmlData += `<div>
            <div class="datahome card card-body m-2">
                <div class="row p-2">
                <h2 style="font-weight: bolder;">${datahome.titlehome}</h2>
                <div class="col-6 p-1">
                    <img src="/imags/${datahome.image}"
                        class="img-fluid rounded-start" alt="screenshot"
                        style="object-fit: cover; width: 100%; height: 400px;">
                </div>
                <div class="col-6 p-1">
                        <div class="card-body">
                            <p class="card-text" style="font-weight: bold;">Code: ${datahome.home_id}</p>
                            <p>ห้องนอน : ${datahome.bedroom} ห้อง</p>
                            <p>ห้องน้ำ : ${datahome.bathroom} ห้อง</p>
                            <p>อยู่ที่ : ${datahome.location}</p>
                            <h3 style="color: chocolate; text-align: center;">ราคา : ${datahome.price} ต่อเดือน</h3> 
                        </div>
                </div>
                <div class="card-body ">
                        <h3>รายละเอียด</h3>
                        <p>${datahome.detail}</p>
                        <div class="col-4" style="margin: auto;">
                                <a href="/pages/login.html" style="color: black; text-decoration: none;">
                                    <button type="button" class="btn btn-primary"style="width: 100%; background-color: chocolate; font-weight: bold; ">
                                    ทำสัญญาเช่า
                                    </button>
                                </a>
                        </div>
                </div>
            </div>
            </div>
            <div>`
        }
        htmlData += '</div>'
        document.getElementById('datahome').innerHTML = htmlData
    } catch (error) {
        console.log('error', error);
    }
    await checkLogin()
}

//check ว่าลูกค้า Loginแล้วหรือไม่ถ้ายังไม่ได้ Login navbar จะแสดงปุ่ม login ถ้าลูกค้า Login แล้ว navbar จะแสดงรูปโปรไฟล์และปุ่ม logout
const checkLogin = async () => {
    console.log('checkLogin');
    const url = new URL(window.location.href)
    loginId = url.searchParams.get('id')
    console.log(loginId);
    if (loginId != null) {
        statusLogin = "login"
        let navloginDOM = document.getElementById('nav')
        console.log("id", loginId);
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
        let navlogoutDOM = document.getElementById('nav')
        let htmlLogout = ''
        htmlLogout += `
                    <a href="/main.html"><img src="/imags/Screenshot 2025-01-22 151148.png" width="70" height="70" style="margin: 10%;"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse p-2" id="navbarSupportedContent" style="width: 100%; ">  
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <a class="nav-link active" aria-current="page" href="/main.html">Home</a>
                            <a class="nav-link active" aria-current="page" href="/pages/search.html">Search</a>
                            <a class="nav-link active" style="width: 100px" aria-current="page" href="/pages/about.html">About Us</a>
                        </ul>  
                        <div class="button_login" style="width: 100% ; text-align: right; margin-right: 20px;">
                            <a href="/pages/login.html">
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"data-bs-target="#exampleModal" data-bs-whatever="@fat">Login</button>
                                </a>
                        </div>              
                    <div>`
        navlogoutDOM.innerHTML = htmlLogout
        console.log(statusLogin);
    }
}