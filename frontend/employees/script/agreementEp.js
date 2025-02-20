const BASE_URL = 'http://localhost:8000'
let selectedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    console.log('id', id)
    try {
        console.log(`${BASE_URL}/agreement/${id}`)
        const response = await axios.get(`${BASE_URL}/agreement/${id}`)
        const datahome = response.data[0]
        console.log('datahome', datahome.home_id)
        console.log(datahome);

        let contractdateDOM = document.querySelector('input[name=contract_date]')
        let owner_nameDOM = document.querySelector('input[name=owner_name]')
        let owner_addressDOM = document.querySelector('textarea[name=owner_address]')

        let renter_nameDOM = document.querySelector('input[name=renter_name]')
        let renter_addressDOM = document.querySelector('textarea[name=renter_address]')
        let renter_nationalcard_numberDOM = document.querySelector('input[name=renter_id]')
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


    } catch (error) {
        console.log('error', error);
    }
}