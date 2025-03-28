const BASE_URL = 'http://localhost:8000'

window.onload = async () => {
    await checkLoginEp()
    await loadData()
}
const loadData = async () => {
    console.log('loadData');
    const response = await axios.get(`${BASE_URL}/datahome`)
    console.log(response.data);
    const url = new URL(window.location.href)
    loginId = url.searchParams.get('Ep_id')
    console.log(loginId);

    const fromDOM = document.getElementById('datahome')

    let htmlData = '<div>'
    for (let i = 0; i < response.data.length; i++) {
        let datahome = response.data[i]
        htmlData +=
            `<div>
        <div class="datahome">
            <div class="card card-body m-2">
                <a href='/employees/edit.html?home_id=${datahome.home_id}&Ep_id=${loginId}' style="color: black; text-decoration: none;">
                    <img src="../imags/${datahome.image}" width="200" height="200">
                    ${datahome.titlehome} <label>ราคา:</label> ${datahome.price} <label>บาท</label>
                </a>   
            </div>
        </div>
        <div>`
    }
    htmlData += '</div>';
    fromDOM.innerHTML = htmlData

    const deleteDOM = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDOM.length; i++) {
        deleteDOM[i].addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id')
            console.log(id);
            try {
                await axios.delete(`${BASE_URL}/agreement/${id}`)
                loadData() //recursive function = เรียกฟังก์ชันตัวเองซ้ำ
            } catch (error) {
                console.log(error);
            }
        })
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
                                <li><a href="/employees/product.html.?Ep_id=${loginId}">แก้ไขข้อมูล</a></li>
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