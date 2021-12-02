console.log('Attached Script.js')

let errorDiv = document.getElementById('error_box')

async function saveNewInvoice(){
    try{
        let cid = document.getElementById('newinvoice_cid').value 
        let amount = document.getElementById('newinvoice_amount').value 
        let summary = document.getElementById('newinvoice_summary').value 
        let date = document.getElementById('newinvoice_ddate').value 
        console.log(cid, amount, summary, date)
        if(!amount || !cid || !summary || !date){
            errorDiv.innerHTML += `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> All fields are required.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `
        } else{

            let response = await fetch('/merchant/newInvoice', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerId: cid,
                    amount: amount,
                    sumary: summary,
                    date: date
                })
            });

            response = await response.json()
            console.log('response ', response)
            if(response.message == "success"){
                errorDiv.innerHTML += `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> Invoice Id: ${response.data.invoiceId}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `   
            }

        }

    } catch(err){}

}

async function merchantPendingCredits(){

    try{

        let container = document.getElementById('merchant_main')
        container.innerHTML = ""
        let response = await fetch("/merchant/pending")
        response = await response.json()

        if(response.message == "success"){
            let data = response.data
            console.log('Data ', data)
            data.map((d)=>{
                let newDiv = document.createElement("div")
                newDiv.classList.add("col-3")
                newDiv.innerHTML = 
                `<div class="card" style="width: 18rem; margin-bottom: 10px;">
                    <div class="card-body">
                        <h5 class="card-title">Customer Id: ${d.customerId}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Due On: ${d.dueData}</h6>
                        <p class="card-text">Summary: ${d.summary}!</p>
                        <button type="button" class="btn btn-success" onclick="sendReminder(${d.customerId}, ${d.invoiceId})">Reminder</button>
                        <button type="button" class="btn btn-danger">Delete</button>
                    </div>
                </div>`
                container.appendChild(newDiv)
            })

        } else{
            throw new Error(response.error)
        }

    } catch(err){
        alert(err)
    }

}

async function merchantPreviousHistory(){

    try{

        let container = document.getElementById('merchant_main')
        container.innerHTML = ""
        let response = await fetch("/merchant/history")
        response = await response.json()

        if(response.message == "success"){
            let data = response.data
            console.log('Data ', data)
            data.map((d)=>{
                let newDiv = document.createElement("div")
                newDiv.classList.add("col-3")
                newDiv.innerHTML = 
                `<div class="card" style="width: 18rem; margin-bottom: 10px;">
                    <div class="card-body">
                        <h5 class="card-title">Customer Id: ${d.customerId}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Paid On: ${d.dueData}</h6>
                        <p class="card-text">Summary: ${d.summary}!</p>
                        <span class="badge bg-primary">${d.status}</span>
                    </div>
                </div>`
                container.appendChild(newDiv)
            })

        } else{
            throw new Error(response.error)
        }

    } catch(err){
        alert(err)
    }

}

function sendReminder(customerId, invoiceId){
    try{
        alert(customerId)
        alert(invoiceId)
    } catch(err){}

}

function deleteInvoice(){
    try{
        
    } catch(err){}

}

function customerPendingPayments(){
    try{
        
    } catch(err){}

}

function customerPaidHistory(){
    try{
        
    } catch(err){}
    
}