const BASE_URL = 'http://localhost:8000'
let homeId = ''
let loginId = ''
let statuswed = ''
//โหลดข้อมูลเมื่อเปิดหน้าเว็บ
window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('Ep_id')
    const urlParams2 = new URLSearchParams(window.location.search)
    const edit = urlParams2.get('edit')
    await checkLoginEp()
    console.log('edit', edit);
    if (edit != 'edit' && edit != null || edit == null) {
        await loadData()
    } else {
        await editProfile()
    }
}
//โหลดข้อมูล
const loadData = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('home_id')
    homeId = id
    try {
        console.log('id', id)
        const response = await axios.get(`${BASE_URL}/datahome/${id}`)
        const data = response.data[0]
        console.log('loadData');
        console.log(response.data);

        if(data.typehome_id == 'TYH01'){
            data.typehome_id = 'บ้านเดี่ยว'
        }else if(data.typehome_id == 'TYH02'){
            data.typehome_id = 'บ้านแฝด'
        }else if(data.typehome_id == 'TYH03'){
            data.typehome_id = 'ทาวน์โฮม'
        }else if(data.typehome_id == 'TYH04'){
            data.typehome_id = 'อาคารพาณิชย์'
        }else if(data.typehome_id == 'TYH05'){
            data.typehome_id = 'อพาร์ทเม้นท์'
        }

        let datahomeDOM = document.getElementById('datahome')
        let htmldataDOM = ''
        htmldataDOM += `
            <h1 class="text-center" style="font-weight: bold;">ข้อมูลบ้าน</h1>
            <h4 class="text-center" style="font-weight: bold;">บ้านID: ${data.home_id}</h4>
            <div class="col-12 p-1" style="margin-top: 10px;">
                <div class="card-body">
                    <div class="row p-2">
                        <div class="้home" style="text-align: center;">
                            <img src="/imags/${data.image}" alt="" id="home_image" style="width: 50%; height: 300px;">
                        </div>
                    </div>
                    <div class="owner">
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">ชื่อบ้าน:</div>
                                <input type="text" class="form-control" name="home_title" placeholder="ID" value="${data.titlehome}" disabled
                                    readonly>
                            </div>
                            <div class="col-6">
                                <div style="font-weight: bold;">ราคา:</div>
                                <input type="text" class="form-control" name="home_price" placeholder="ราคา / เดือน" value="${data.price}"
                                    disabled readonly>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-12">
                                <div style="font-weight: bold;">ที่อยู่:</div>
                                <textarea style="width: 50%; resize: none;" class="form-control" name="home_location"
                                    placeholder="บ้านเลขที่ หมู่ที่ ถนน ตำบล อำเภอ จังหวัด" disabled
                                    readonly>${data.location}</textarea>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">ห้องนอน:</div>
                                <input type="text" class="form-control" name="bedroom" placeholder="ห้องนอน" value="${data.bedroom}"
                                    disabled readonly>
                            </div>
                            <div class="col-6">
                                <div style="font-weight: bold;">ห้องน้ำ:</div>
                                <input type="text" class="form-control" name="bathroom" placeholder="ห้องน้ำ" value="${data.bathroom}"
                                    disabled readonly>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-12">
                                <div style="font-weight: bold;">รายละเอียด:</div>
                                <textarea style="width: 100%; resize: none;" class="form-control" name="home_detail"
                                placeholder="รายละเอียด" disabled readonly>${data.detail}</textarea>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">ค่าประกัน:</div>
                                <input type="text" class="form-control" name="home_damage" placeholder="damage_insurance" value="${data.damage_insurance}"
                                    disabled readonly>
                            </div>
                            <div class="col-6">
                                <div style="font-weight: bold;">ประเภทบ้าน:</div>
                                <input type="text" class="form-control" name="home_type" placeholder="typehome" value="${data.typehome_id}"
                                    disabled readonly>
                                
                            </div>
                        </div>
                    </div>
                    <div id="edithome"></div>
                </div>
            </div>`
        datahomeDOM.innerHTML = htmldataDOM

        console.log(homeId)
        let buttonDOM = document.getElementById('edithome')
        let htmlbuttonDOM = ''
        htmlbuttonDOM += `
        <button class="btn col-1 p-2" onclick="window.location.href='/employees/edit.html?home_id=${homeId}&Ep_id=${loginId}&edit=edit'"
                        style="text-align: center; border: 2px solid black; margin-left: 90%; width: auto;">
                        แก้ไขข้อมูล
                    </button>`
        buttonDOM.innerHTML = htmlbuttonDOM
    } catch (error) {
        console.log('error', error);
    }
}
//แก้ไขข้อมูล Profile
const editProfile = async () => {
    console.log('editProfile');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('home_id');

    try {
        console.log('id', id);
        const response = await axios.get(`${BASE_URL}/datahome/${id}`);
        const data = response.data[0];
        console.log('data', data);

        let datahomeDOM = document.getElementById('datahome');
        let htmldataDOM = `
            <h1 class="text-center" style="font-weight: bold;">ข้อมูลบ้าน</h1>
            <h4 class="text-center" style="font-weight: bold;">บ้านID: ${data.home_id}</h4>
            <div class="col-12 p-1" style="margin-top: 10px;">
                <div class="card-body">
                    <div class="row p-2">
                        <div class="้home" style="text-align: center;">
                            <img src="/imags/${data.image}" alt="" id="home_image" style="width: 50%; height: 300px;">
                        </div>
                    </div>
                    <div class="owner">
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">ชื่อบ้าน:</div>
                                <input type="text" class="form-control" name="home_title" placeholder="ID" value="${data.titlehome}">
                            </div>
                            <div class="col-6">
                                <div style="font-weight: bold;">ราคา:</div>
                                <input type="text" class="form-control" name="home_price" placeholder="ราคา / เดือน" value="${data.price}">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-12">
                                <div style="font-weight: bold;">ที่อยู่:</div>
                                <textarea class="form-control" name="home_location"
                                    style="width: 50%; resize: none;">${data.location}</textarea>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">ห้องนอน:</div>
                                <input type="text" class="form-control" name="bedroom" value="${data.bedroom}">
                            </div>
                            <div class="col-6">
                                <div style="font-weight: bold;">ห้องน้ำ:</div>
                                <input type="text" class="form-control" name="bathroom" value="${data.bathroom}">
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-12">
                                <div style="font-weight: bold;">รายละเอียด:</div>
                                <textarea class="form-control" name="home_detail"
                                    style="width: 100%; resize: none;">${data.detail}</textarea>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col-6">
                                <div style="font-weight: bold;">ค่าประกัน:</div>
                                <input type="text" class="form-control" name="home_damage" value="${data.damage_insurance}">
                            </div>
                            <div class="col-6">
                                <div style="font-weight: bold;">ประเภทบ้าน:</div>
                                <select class="form-select mb-3" id="typehome" aria-label="Default select example">
                                    <option value="TYH01">บ้านเดี่ยว</option>
                                    <option value="TYH02">บ้านแฝด</option>
                                    <option value="TYH03">ทาวน์โฮม</option>
                                    <option value="TYH04">อาคารพาณิชย์</option>
                                    <option value="TYH05">อพาร์ทเม้นท์</option>
                                </select> 
                            </div>
                        </div>
                    </div>
                    <div id="edithome"></div>
                </div>
            </div>
        `;
        datahomeDOM.innerHTML = htmldataDOM;

        // ตั้งค่าประเภทบ้านหลังจากอัปเดต DOM
        setTimeout(() => {
            let typehomeSelect = document.getElementById("typehome");
            if (typehomeSelect && data.typehome_id) {
                typehomeSelect.value = data.typehome_id;
            }
        }, 100);

        console.log("test:",data.home_id);    
        let editDOM = document.getElementById('edithome');
        let htmlEditDOM = `
        <button class="btn col-1 p-2" onclick="window.location.href='/employees/edit.html?home_id=${data.home_id}&Ep_id=${loginId}'"
                style="text-align: center; border: 2px solid black; margin-left: 90%; width: auto;">
                Cancel
        </button>
        <button class="btn col-1 p-2" onclick="updateHome()" 
                style="text-align: center; border: 2px solid black; margin-left: 90%; width: auto;">
                Save
        </button>
        `;
        editDOM.innerHTML = htmlEditDOM;

    } catch (error) {
        console.log('error', error);
    }
};

// อัปเดตข้อมูลบ้าน
const updateHome = async () => {
    try {
        let dataUpdate = {
            titlehome: document.getElementsByName('home_title')[0].value,
            price: document.getElementsByName('home_price')[0].value,
            location: document.getElementsByName('home_location')[0].value,
            bedroom: document.getElementsByName('bedroom')[0].value,
            bathroom: document.getElementsByName('bathroom')[0].value,
            detail: document.getElementsByName('home_detail')[0].value,
            damage_insurance: document.getElementsByName('home_damage')[0].value,
            typehome_id: document.getElementById('typehome').value
        }
        console.log('profile', dataUpdate)
        const urlParams = new URLSearchParams(window.location.search)
        const id = urlParams.get('Ep_id')
        const urlParams2 = new URLSearchParams(window.location.search)
        const home_id = urlParams2.get('home_id')
        const response = await axios.put(`${BASE_URL}/datahome/${home_id}`, dataUpdate)
        console.log(response.data)
        window.location.href = `/employees/edit.html?home_id=${home_id}&Ep_id=${loginId}`
    } catch (error) {
        console.log('error', error);
    }
}
// เช็คการ login
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
                    <button class="navbar-toggler" type= "button" data-bs-toggle="collapse"
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