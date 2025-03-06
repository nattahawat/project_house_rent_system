const BASE_URL = 'http://localhost:8000'
let selectedId = ''

window.onload = async () => {
    await checkLoginEp()
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('agreements_id')
    console.log('id', id)
    try {
        const response = await axios.get(`${BASE_URL}/agreement/${id}`)
        const datahome = response.data[0]
        console.log('datahome', datahome.home_id)
        console.log(datahome);

        let contractdateDOM = document.querySelector('input[name=contract_date]')
        let owner_nameDOM = document.querySelector('input[name=owner_name]')
        let owner_addressDOM = document.querySelector('textarea[name=owner_address]')

        let renter_nameDOM = document.querySelector('input[name=renter_name]')
        let renter_idDOM = document.querySelector('input[name=renter_id]')
        let renter_addressDOM = document.querySelector('textarea[name=renter_address]')
        let renter_nationalcard_numberDOM = document.querySelector('input[name=renter_nationalcard_number]')
        let renter_id_issued_byDOM = document.querySelector('input[name=renter_id_issued_by]')
        let renter_id_dateDOM = document.querySelector('input[name=renter_id_date]')

        let home_idDOM = document.querySelector('input[name=home_id]')
        let home_addressDOM = document.querySelector('textarea[name=home_address]')
        let home_priceDOM = document.querySelector('input[name=home_price]')
        let home_paymentdateDOM = document.querySelector('input[name=home_payment_date]')
        let home_insuranceDOM = document.querySelector('input[name=damage_insurance]')
        let home_taxDOM = document.querySelector('input[name=home_tax]')

        let rental_timeDOM = document.querySelector('input[name=rental_time]')
        let checkin_dateDOM = document.querySelector('input[name=renter_checkin]')
        let checkout_dateDOM = document.querySelector('input[name=renter_checkout]')
    
        let sign_renterDOM = document.querySelector('input[name=sign_renter]')
        let sign_witness_renterDOM = document.querySelector('input[name=sign_witness1]')
        let sign_ownerDOM = document.querySelector('input[name=sign_owner]')
        let sign_witness_ownerDOM = document.querySelector('input[name=sign_witness2]')
    
        contractdateDOM.value = datahome.contractdate
        owner_nameDOM.value = datahome.owner_name
        owner_addressDOM.value = datahome.owner_address

        renter_nameDOM.value = datahome.renter_name
        renter_idDOM.value = datahome.custom_id
        renter_addressDOM.value = datahome.renter_address
        renter_nationalcard_numberDOM.value = datahome.renter_nationalcard_number
        renter_id_issued_byDOM.value = datahome.renter_id_issued_by
        renter_id_dateDOM.value = datahome.renter_id_date

        home_idDOM.value = datahome.home_id
        home_addressDOM.value = datahome.home_address
        home_priceDOM.value = datahome.home_price
        home_paymentdateDOM.value = datahome.home_paymentdate
        home_insuranceDOM.value = datahome.home_insurance
        home_taxDOM.value = datahome.home_tax

        rental_timeDOM.value = datahome.rental_time
        checkin_dateDOM.value = datahome.checkin_date
        checkout_dateDOM.value = datahome.checkout_date

        sign_renterDOM.value = datahome.sign_renter
        sign_witness_renterDOM.value = datahome.sign_witness_renter
        sign_ownerDOM.value = datahome.sign_owner
        sign_witness_ownerDOM.value = datahome.sign_witness_owner

        let renter_imageDOM = document.getElementById('renter_images')
        let htmlimageDOM = '<div calss="renter_image">'
        htmlimageDOM += `<img src="/uploads/${datahome.image}" width="300" height="300">`
        htmlimageDOM += '</div>'
        renter_imageDOM.innerHTML = htmlimageDOM
        
        let buttonDOM = document.getElementById('button')
        let htmlbuttonDOM = ''
        if(datahome.status != 'ตรวจสอบแล้ว' && datahome.status != 'ยกเลิก'){ 
            htmlbuttonDOM += `
            <div class="col-12 p-1" style="margin-top: 10px;">
                <div class="card-body">
                    <div class="row text-center">
                        <div class="col-6">
                            <button class="btn btn-danger" style="margin-top: 20px; width: 80%;"
                                onclick="notpass()">ไม่ผ่านการตรวจสอบ</button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-success" style="margin-top: 20px; width: 80%;"
                                onclick="pass()">ผ่านการตรวจสอบ</button>
                        </div>
                    </div>
                    <div class="row text-center">
                        <div class="col-12">
                            <button class="btn btn-primary" style="margin-top: 20px; width: 90%;"
                                onclick="back()">ย้อนกลับ</button>
                        </div>
                    </div>
                </div>
            </div>`
        }else{
            htmlbuttonDOM += `
            <div class="col-12 p-1" style="margin-top: 10px;">
                <div class="card-body">
                    <div class="row text-center">
                        <div class="col-12">
                            <button class="btn btn-primary" style="margin-top: 20px; width: 90%;"
                                onclick="back()">ย้อนกลับ</button>
                        </div>
                    </div>
                </div>
            </div>`
        }
        buttonDOM.innerHTML = htmlbuttonDOM
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
// ยืนยันการตรวจสอบ
const pass = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('agreements_id')
    console.log('id', id)
    const response = await axios.put(`${BASE_URL}/agreementpass/${id}`)
    console.log(response.data)
    window.location.href = `/employees/examineEp.html?Ep_id=${loginId}`
}
// ไม่ผ่านการตรวจสอบ
const notpass = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('agreements_id')
    console.log('id', id)
    const response = await axios.put(`${BASE_URL}/agreementnotpass/${id}`)
    console.log(response.data)
    window.location.href = `/employees/examineEp.html?Ep_id=${loginId}`
}
// ย้อนกลับ
const back = async () => {
     window.location.href = `/employees/examineEp.html?Ep_id=${loginId}`
}