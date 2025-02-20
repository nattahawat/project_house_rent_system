const BASE_URL = 'http://localhost:8000'

const submitData = async () => {
    try{
        let agreementData = {
            email: document.querySelector('input[name=email]').value,
            password: document.querySelector('input[name=password]').value
        }
        console.log(agreementData);
        let response = await axios.post(`${BASE_URL}/employee/login`, agreementData);
        console.log(response.data);
        if(response.data.length = 1){
            window.location.href = `/employees/mainEp.html?Ep_id=${response.data[0].employee_id}`;
            return;     
        }
    }catch(error){
        console.log(error);
        alert('กรอกอีเมลหรือรหัสผ่านไม่ถูกต้อง');  
    }
}