const BASE_URL = 'http://localhost:8000'
let statusLogin = ''

const validateDatauser = (formData) => {
    let errors = [];
    if (!formData.firstname) {
        errors.push('กรุณากรอก ช่องชื่อ');
    }
    if (!formData.lastname) {
        errors.push('กรุณากรอก นามสกุล');
    }
    if (!formData.email) {
        errors.push('กรุณากรอก อีเมล');
    }
    if (!formData.password) {
        errors.push('กรุณากรอก รหัสผ่าน');
    }
    if (formData.password.length < 6) {
        errors.push('กรุณากรอก รหัสผ่านมากกว่า 6 ตัวอักษร');
    }
    if (!formData.phone) {
        errors.push('กรุณากรอก เบอร์โทรศัพท์');
    }
    if (formData.phone.length < 10 || formData.phone.length > 10) {
        errors.push('กรุณากรอก เบอร์โทรศัพท์ให้ครบ 10 หลัก');
    }
    if (!formData.location) {
        errors.push('กรุณากรอก ที่อยู่');
    }   
    return errors;
}

const submitData = async () => {
    try{
        let formData = {
            firstname: document.querySelector('input[name=user_firstname]').value,
            lastname: document.querySelector('input[name=user_lastname]').value,
            phone: document.querySelector('input[name=user_phone]').value,
            email: document.querySelector('input[name=user_email]').value,
            password: document.querySelector('input[name=user_password]').value,
            location: document.querySelector('textarea[name=user_address]').value
        }
        console.log(formData)
         // ตรวจสอบข้อมูลก่อนส่ง
        let errors = validateDatauser(formData);
        if (errors.length > 0) {
            throw {
                message: 'กรอกข้อมูลไม่ครบ!',
                errors: errors
            };
        }
        const response = await axios.post(`${BASE_URL}/custom`, formData);
         // ตรวจสอบ response ว่ามี error หรือไม่
         if (response.status === 400) {
            throw {
                message: response.data.message,
                errors: response.data.errors
            };
        }else{
            alert('สมัครสมาชิกเรียบร้อย');
            window.location.href = '/pages/login.html';
        }
        console.log(response.data);
    }catch(err){
        console.log("test");
        console.log(err);
        // ตรวจสอบ error จาก email หรือ password ซ้ำ
        if (err.response && err.response.status === 400) {
            alert(err.response.data.message); // แจ้งเตือนข้อความ error
        } else {
            alert(err.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล');
        }
    }
}
