const BASE_URL = 'http://localhost:8000'
let statusLogin = ''
let loginId = ''

window.onload = async () => {
    await checkLoginEp()
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
        menuDOM = document.getElementById('menu')
        let htmlmenuDOM = '<div>'
        htmlmenuDOM += `<div class="menu">
            <div class="row">
                    <div class="col-12">
                        <div class="card card-body">
                            <h2>เมนู</h2>
                            <ul>
                                <li><a href="/employees/mainEp.html?Ep_id=${loginId}">ประกาศ</a></li>
                                <li><a href="/employees/examineEp.html?Ep_id=${loginId}">ตรวจสอบสัญญาเช่า</a></li>
                                <li><a href="/main.html">ออกจากระบบ</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
        </div>`
        htmlmenuDOM += '</div>'
        menuDOM.innerHTML = htmlmenuDOM
    } else {
        statusLogin = "logout"
        window.location.href = '/pages/loginEp.html'
    }
}

// const checkLogin = async () => {
//     console.log('checkLogin');
//     const url = new URL(window.location.href)
//     loginId = url.searchParams.get('id')
//     console.log(loginId);
//     if (loginId != null) {
//         statusLogin = "login"
//         let navloginDOM = document.getElementById('nav')
//         console.log("id", loginId);
//         let htmlnavDOM = ''
//         htmlnavDOM += `
//                     <a href="/main.html?id=${loginId}"><img src="/imags/Screenshot 2025-01-22 151148.png" width="70" height="70" style="margin: 10%;"></a>
//                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                         aria-expanded="false" aria-label="Toggle navigation">
//                         <span class="navbar-toggler-icon"></span>
//                     </button>
//                     <div class="collapse navbar-collapse p-2" id="navbarSupportedContent" style="width: 100%;">
//                         <ul class="navbar-nav me-auto mb-4 mb-lg-0" s>
//                             <a class="nav-link active" aria-current="page" href="/main.html?id=${loginId}">Home</a>
//                             <a class="nav-link active" aria-current="page" href="/pages/search.html?id=${loginId}">Search</a>
//                             <a class="nav-link active" style="width: 100px" aria-current="page" href="/pages/about.html?id=${loginId}">About Us</a>
//                         </ul>
//                         <div class="profile" style="width: 100% ; text-align: right; margin-right: 20px;">
//                             <a href="/pages/proflie.html?id=${loginId}" style="color: black; text-decoration: none;">
//                             <img src="/imags/8847419.png" width="60px">
//                             </a>
//                         </div>
//                     </div>`
//         navloginDOM.innerHTML = htmlnavDOM
//         console.log(statusLogin);
//     } else {
//         statusLogin = "logout"
//         let navlogoutDOM = document.getElementById('nav')
//         let htmlLogout = ''
//         htmlLogout += `
//                     <a href="/main.html"><img src="/imags/Screenshot 2025-01-22 151148.png" width="70" height="70" style="margin: 10%;"></a>
//                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                         aria-expanded="false" aria-label="Toggle navigation">
//                         <span class="navbar-toggler-icon"></span>
//                     </button>
//                     <div class="collapse navbar-collapse p-2" id="navbarSupportedContent" style="width: 100%; ">  
//                         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                             <a class="nav-link active" aria-current="page" href="/main.html">Home</a>
//                             <a class="nav-link active" aria-current="page" href="/pages/search.html">Search</a>
//                             <a class="nav-link active" style="width: 100px" aria-current="page" href="/pages/about.html">About Us</a>
//                         </ul>  
//                         <div class="button_login" style="width: 100% ; text-align: right; margin-right: 20px;">
//                             <a href="/pages/login.html">
//                                 <button type="button" class="btn btn-primary" data-bs-toggle="modal"data-bs-target="#exampleModal" data-bs-whatever="@fat">Login</button>
//                                 </a>
//                         </div>              
//                     <div>`
//         navlogoutDOM.innerHTML = htmlLogout
//         console.log(statusLogin);
//     }
// }