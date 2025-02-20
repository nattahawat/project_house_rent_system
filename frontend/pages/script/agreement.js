const BASE_URL = 'http://localhost:8000'
let selectedId = ''
let statusagreement = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('homeid')
    console.log('id', id)
    await checkLogin()
    try {
        const response = await axios.get(`${BASE_URL}/datahome/${id}`)
        const datahome = response.data[0]
        console.log('datahome', datahome.home_id)

        console.log('loadData');
        console.log(response.data);
        const owner_id = datahome.owner_id
        const response1 = await axios.get(`${BASE_URL}/owner/${owner_id}`)
        const owner = response1.data[0]
        console.log('loadData');
        console.log(response1.data);
        console.log(owner.firstname)
        console.log(owner.lastname)

        let Owner_firstnameDOM = document.querySelector('input[name=owner_name]')
        let Owner_addressDOM = document.querySelector('textarea[name=owner_address]')

        let Home_idDOM = document.querySelector('input[name=home_id]')
        let Home_addressDOM = document.querySelector('textarea[name=home_address]')
        let Home_priceDOM = document.querySelector('input[name=home_price]')
        let Home_insuranceDOM = document.querySelector('input[name=damage_insurance]')
        let Home_taxDOM = document.querySelector('input[name=home_tax]')

        let Sing_ownerDOM = document.querySelector('input[name=sign_owner]')

        Owner_firstnameDOM.value = owner.firstname + ' ' + owner.lastname
        Owner_addressDOM.value = owner.location

        Home_idDOM.value = datahome.home_id
        Home_addressDOM.value = datahome.location
        Home_priceDOM.value = datahome.price
        Home_insuranceDOM.value = datahome.damage_insurance
        Home_taxDOM.value = datahome.tax

        Sing_ownerDOM.value = owner.firstname + ' ' + owner.lastname

    } catch (error) {
        console.log('error', error);
    }
}

const validateDatauser = (agreementData) => {
    let errors = [];
    if (!agreementData.contractdate) {
        errors.push('กรุณากรอก ช่องวันที่ทำสัญญา');
    }
    if (!agreementData.owner_name) {
        errors.push('กรุณากรอก ช่องชื่อ-นามสกุล(ผู้ให้เช่า)');
    }
    if (!agreementData.owner_address) {
        errors.push('กรุณากรอก ช่องที่อยู่(ผู้ให้เช่า)');
    }
    if (!agreementData.renter_name) {
        errors.push('กรุณากรอก ช่องชื่อ-นามสกุล(ผู้เช่า)');
    }
    if (!agreementData.renter_address) {
        errors.push('กรุณากรอก ช่องที่อยู่(ผู้เช่า)');
    }
    if (!agreementData.renter_nationalcard_number) {
        errors.push('กรุณากรอก ช่องถือบัตรประชาชนเลข(ผู้เช่า)');
    }
    if (!agreementData.renter_id_issued_by) {
        errors.push('กรุณากรอก ช่องออกให้ ณ(ผู้เช่า)');
    }
    if (!agreementData.renter_id_date) {
        errors.push('กรุณากรอก ช่องวันที่ออกบัตร(ผู้เช่า)');
    }
    if (!agreementData.home_id) {
        errors.push('กรุณากรอก ช่องรหัสทรัพย์สิน');
    }
    if (!agreementData.home_address) {
        errors.push('กรุณากรอก ช่องที่อยู่ทรัพย์สิน');
    }
    if (!agreementData.home_price) {
        errors.push('กรุณากรอก ช่องราคาเช่า');
    }
    if (!agreementData.home_paymentdate) {
        errors.push('กรุณากรอก ช่องวันที่ชำระเงิน');
    }
    if (!agreementData.home_insurance) {
        errors.push('กรุณากรอก ช่องค่าประกันภัย');
    }
    if (!agreementData.home_tax) {
        errors.push('กรุณากรอก ช่องภาษี');
    }
    if (!agreementData.rental_time) {
        errors.push('กรุณากรอก ช่องระยะเวลาเช่า');
    }
    if (!agreementData.checkin_date) {
        errors.push('กรุณากรอก ช่องเริ่มตั้งแต่วันที่');
    }
    if (!agreementData.checkout_date) {
        errors.push('กรุณากรอก ช่องครบกำหนดวันเช่า');
    }
    if (!agreementData.sign_renter) {
        errors.push('กรุณากรอก ช่องลงชื่อ(ผู้เช่า)');
    }
    if (!agreementData.sign_witness_renter) {
        errors.push('กรุณากรอก ช่องลงชื่อพยาน(ผู้เช่า)');
    }
    if (!agreementData.sign_owner) {
        errors.push('กรุณากรอก ช่องลงชื่อ(ผู้ให้เช่า)');
    }
    if (!agreementData.sign_witness_owner) {
        errors.push('กรุณากรอก ช่องลงชื่อพยาน(ผู้ให้เช่า)');
    }
    return errors;
}

const submitData = async () => {
    let messageDOM = document.getElementById('message')
    try {
        console.log('test');
        let agreementData = {
            contractdate: document.querySelector('input[name=contract_date]').value,
            owner_name: document.querySelector('input[name=owner_name]').value,
            owner_address: document.querySelector('textarea[name=owner_address]').value,

            renter_name: document.querySelector('input[name=renter_name]').value,
            renter_address: document.querySelector('textarea[name=renter_address]').value,
            renter_nationalcard_number: document.querySelector('input[name=renter_id]').value,
            renter_id_issued_by: document.querySelector('input[name=renter_id_issued_by]').value,
            renter_id_date: document.querySelector('input[name=renter_id_date]').value,

            home_id: document.querySelector('input[name=home_id]').value,
            home_address: document.querySelector('textarea[name=home_address]').value,
            home_price: document.querySelector('input[name=home_price]').value,
            home_paymentdate: document.querySelector('input[name=home_payment_date]').value,
            home_insurance: document.querySelector('input[name=damage_insurance]').value,
            home_tax: document.querySelector('input[name=home_tax]').value,

            rental_time: document.querySelector('input[name=rental_time]').value,
            checkin_date: document.querySelector('input[name=renter_checkin]').value,
            checkout_date: document.querySelector('input[name=renter_checkout]').value,

            sign_renter: document.querySelector('input[name=sign_renter]').value,
            sign_witness_renter: document.querySelector('input[name=sign_witness1]').value,
            sign_owner: document.querySelector('input[name=sign_owner]').value,
            sign_witness_owner: document.querySelector('input[name=sign_witness2]').value
        }
        console.log(agreementData);

        const errors = validateDatauser(agreementData)
        if (errors.length > 0) {
            throw {
                message: 'กรอกข้อมูลไม่ครบ!',
                errors: errors
            }
        }
        let message = 'บันทึกข้อมูลสำเร็จ!'

        const response = await axios.post(`${BASE_URL}/agreement`, agreementData)
        console.log('response', response.data)
        console.log('บันทึกข้อมูลสำเร็จ')

        messageDOM.innerText = message
        messageDOM.className = 'message success'
        if (response.data.length = 1) {
            console.log('Add from success')
            window.location.href = `/main.html?id=${loginId}`
        }
    } catch (error) {
        console.log('error message', error.message)
        console.log('error', error.errors)
        if (error.response) {
            console.log(error.response)
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }
        let htmlData = '<div>'
        htmlData += `<div style="font-weight: bold;">${error.message}</div>`
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '<div>'

        messageDOM.innerHTML = htmlData
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
        let htmlnavDOM = '<div>'
        htmlnavDOM += `<div>
            <div class="nav">
                    <a href="/main.html?id=${loginId}"><img src="/imags/Screenshot 2025-01-22 151148.png" width="70" height="70"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <a class="nav-link active" aria-current="page" href="/main.html?id=${loginId}">Home</a>
                            <a class="nav-link active" aria-current="page" href="/pages/search.html?id=${loginId}">Search</a>
                            <a class="nav-link active" aria-current="page" href="/pages/about.html?id=${loginId}">About Us</a>
                        </ul>
                    </div>
                    <div class="profile" style="margin-left: 1150px;">
                            <a href="/pages/proflie.html?id=${loginId}" style="color: black; text-decoration: none;">
                            <img src="/imags/8847419.png" width="60px">
                    </div>
            </div>
        <div> </div>
        <div>`
        htmlnavDOM += '</div>'
        navloginDOM.innerHTML = htmlnavDOM
        console.log(statusLogin);
    } else {
        statusLogin = "logout"
        window.location.href = '/pages/login.html'
    }
}