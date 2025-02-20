const BASE_URL = 'http://localhost:8000'

window.onload = async () => {
    await loadData()
}
const loadData = async () => {
    console.log('loadData');
    const response = await axios.get(`${BASE_URL}/agreement`)
    console.log(response.data);

    const fromDOM = document.getElementById('datahome')

    let htmlData = '<div>'
    for (let i = 0; i < response.data.length; i++) {
        let datahome = response.data[i]
        htmlData += `<div>
        <div class="datahome">
            <div class="card card-body m-2">
                <div class="datahome-group">
                <label>IDสัญญาเช่า:</label> ${datahome.agreements_id} <label>วันที่:</label> ${datahome.contractdate}  <label>สถานะ:</label> ${datahome.status}
                </div>
                <div>
                    <a href='/employees/agreementEp.html?id=${datahome.agreements_id}'><button>Edit</button></a>
                    <button class ='delete' data-id='${datahome.home_id}'>Delete</button>
                </div>
            </div>
    </div>
        <div>`
    }
    htmlData += '</div>'
    fromDOM.innerHTML = htmlData

    const deleteDOM = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDOM.length; i++) {
        deleteDOM[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id
            try {
                await axios.delete(`${BASE_URL}/agreement/${id}`)
                loadData() //recursive function = เรียกฟังก์ชันตัวเองซ้ำ
            } catch (error) {
                console.log(error);
            }
        })
    }
}
