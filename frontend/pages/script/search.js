const BASE_URL = 'http://localhost:8000'
let statusLogin = ''

window.onload = async () => {
    await checkLogin()
    await loadData()
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

const loadData = async () => {
    console.log('loadData');
    const url = new URL(window.location.href)
    loginId = url.searchParams.get('id')
    console.log("loginId=", loginId);
    const response = await axios.get(`${BASE_URL}/datahome`)
    console.log(response.data);

    if (loginId != null && loginId != 'null') {
        console.log('logintest123456');
        const fromDOM = document.getElementById('datahome')
        let htmlData = '<div class="row p-2">';
        for (let i = 0; i < response.data.length; i++) {
            let datahome = response.data[i]
            htmlData +=
                `<div class="col-md-4 mb-4">
            <div class="card card-body text-center shadow-sm">
                <a href='/pages/product.html?homeid=${datahome.home_id}&id=${loginId}' 
                   style="color: black; text-decoration: none;">
                    <img src="/imags/${datahome.image}" class="img-fluid rounded" style="height: 200px; object-fit: cover;">
                    <h5 class="mt-2">${datahome.titlehome}</h5> 
                    <p class="text-muted">ราคา: ${datahome.price} บาท</p> 
                </a>
            </div>
        </div>`
        }
        htmlData += '</div>';
        fromDOM.innerHTML = htmlData
    } else {
        console.log('logouttest123456   ');
        const logoutDOM = document.getElementById('datalogouthome')
        let htmlLoginData = '<div class="row p-2">';
        for (let i = 0; i < response.data.length; i++) {
            let datahome = response.data[i]
            htmlLoginData +=
                `<div class="col-md-4 mb-4">
            <div class="card card-body text-center shadow-sm">
                <a href='/pages/product.html?homeid=${datahome.home_id}' 
                   style="color: black; text-decoration: none;">
                    <img src="/imags/${datahome.image}" class="img-fluid rounded" style="height: 200px; object-fit: cover;">
                    <h5 class="mt-2">${datahome.titlehome}</h5> 
                    <p class="text-muted">ราคา: ${datahome.price} บาท</p> 
                </a>  
            </div>
        </div>`
        }
        htmlLoginData += '</div>'
        logoutDOM.innerHTML = htmlLoginData
    }
}

//search หน้าค้นหาข้อมูลโดยสามารถค้นหาได้จาก ชื่อบ้าน จังหวัด ประเภทบ้าน จำนวนห้องนอน
const search = async () => {
    try {
        console.log('loaded');
        let searchDOM = document.getElementById('search').value
        let provinceDOM = document.getElementById('province').value
        let typehomeDOM = document.getElementById('typehome').value
        let bedroomDOM = document.getElementById('bedroom').value

        let searchData = {
            titlehome: searchDOM !== "" ? searchDOM : null,
            location: provinceDOM !== "จังหวัด" ? provinceDOM : null,
            typehome: typehomeDOM !== "ประเภทบ้าน" ? typehomeDOM : null,
            bedroom: bedroomDOM !== "จำนวนห้องนอน" ? Number(bedroomDOM) : null
        }
        console.log(searchData);


        const response = await axios.post(`${BASE_URL}/datahome/search/`, searchData)
        console.log(response.data);
        console.log('search');


        const url = new URL(window.location.href)
        loginId = url.searchParams.get('id')
        console.log("loginId=", loginId);
        if (loginId != null && loginId != 'null') {
            console.log('logintest123456');
            const fromDOM = document.getElementById('datahome')
            let htmlData = '<div class="row p-2">';
            for (let i = 0; i < response.data.length; i++) {
                let datahome = response.data[i]
                htmlData +=
                    `<div class="col-md-4 mb-4">
                <div class="card card-body text-center shadow-sm">
                    <a href='/pages/product.html?homeid=${datahome.home_id}&id=${loginId}' 
                       style="color: black; text-decoration: none;">
                        <img src="/imags/${datahome.image}" class="img-fluid rounded" style="height: 200px; object-fit: cover;">
                        <h5 class="mt-2">${datahome.titlehome}</h5> 
                        <p class="text-muted">ราคา: ${datahome.price} บาท</p> 
                    </a>  
                </div>
            </div>`
            }
            if (response.data.length == 0) {
                htmlData += `<div class="col-md-12 text-center">
                ไม่พบข้อมูล
                </div>`
                console.log('ไม่พบข้อมูล');    
            }
            htmlData += '</div>';
            fromDOM.innerHTML = htmlData
        } else {
            console.log('logouttest123456');
            const logoutDOM = document.getElementById('datalogouthome')
            let htmlLoginData = '<div class="row p-2">';
            for (let i = 0; i < response.data.length; i++) {
                let datahome = response.data[i]
                htmlLoginData +=
                    `<div class="col-md-4 mb-4">
                <div class="card card-body text-center shadow-sm">
                    <a href='/pages/product.html?homeid=${datahome.home_id}' 
                       style="color: black; text-decoration: none;">
                        <img src="/imags/${datahome.image}" class="img-fluid rounded" style="height: 200px; object-fit: cover;">
                        <h5 class="mt-2">${datahome.titlehome}</h5> 
                        <p class="text-muted">ราคา: ${datahome.price} บาท</p> 
                    </a>  
                </div>
            </div>`
            }
            if (response.data.length == 0) {
                htmlLoginData += `<div class="col-md-12 text-center">
                ไม่พบข้อมูล
                </div>`
                console.log('ไม่พบข้อมูล');    
            }
            htmlLoginData += '</div>'
            logoutDOM.innerHTML = htmlLoginData
        }
    } catch (error) {
        console.log(error)
    }

}