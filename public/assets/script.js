console.log('Attached Script.js')

let errorDiv = document.getElementById('error_box')

let merchantMap = {}

// fetch token from local storage
function getToken(){
    return localStorage.getItem('token');
}

async function saveNewInvoice() {
    try {
        let cid = document.getElementById('newinvoice_cid').value
        let amount = document.getElementById('newinvoice_amount').value
        let summary = document.getElementById('newinvoice_summary').value
        let date = document.getElementById('newinvoice_ddate').value
        console.log(cid, amount, summary, date)
        if (!amount || !cid || !summary || !date) {
            errorDiv.innerHTML += `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> All fields are required.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `
        } else {
            console.log('Token LS ', getToken())
            let response = await fetch('/merchant/newInvoice', {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getToken()}`, 
                }),
                body: JSON.stringify({
                    customerId: cid,
                    amount: amount,
                    sumary: summary,
                    date: date
                })
            });

            response = await response.json()
            console.log('response ', response)
            if (response.message == "success") {
                errorDiv.innerHTML += `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> Invoice Generated!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `
            }
        }

    } catch (err) { }

}

async function merchantPendingCredits() {

    try {

        let container = document.getElementById('merchant_main')
        container.innerHTML = ""
        let response = await fetch("/merchant/pending", {
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`, 
            })
        })
        response = await response.json()

        if (response.message == "success") {
            let data = response.data
            console.log('Data ', data)
            data.map((d) => {
                let newDiv = document.createElement("div")
                newDiv.classList.add("col-3")
                newDiv.innerHTML =
                    `<div class="card" style="width: 18rem; margin-bottom: 10px;">
                    <div class="card-body">
                        <h5 class="card-title">Customer Id: ${d.customerId}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Due On: ${(d.due).substring(0, 10)}</h6>
                        <p class="card-text">Summary: ${d.summary}!</p>
                        <p class="card-text">Amount: ${d.amount}!</p>
                        <button type="button" class="btn btn-success" onclick="sendReminder(${d.customerId}, ${d._id})">Reminder</button>
                    </div>
                </div>`
                container.appendChild(newDiv)
            })

        } else {
            throw new Error(response.error)
        }

    } catch (err) {
        alert(err)
    }

}

async function merchantPreviousHistory() {

    try {

        let container = document.getElementById('merchant_main')
        container.innerHTML = ""
        let response = await fetch("/merchant/history",{
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`, 
            })
        })
        response = await response.json()

        if (response.message == "success") {
            let data = response.data
            console.log('Data ', data)
            data.map((d) => {
                let newDiv = document.createElement("div")
                newDiv.classList.add("col-3")
                newDiv.innerHTML =
                    `<div class="card" style="width: 18rem; margin-bottom: 10px;">
                    <div class="card-body">
                        <h5 class="card-title">Customer Id: ${d.customerId}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Paid On: ${(d.due).substring(0, 10)}</h6>
                        <p class="card-text">Summary: ${d.summary}!</p>
                        <span class="badge bg-primary">${d.status}</span>
                    </div>
                </div>`
                container.appendChild(newDiv)
            })

        } else {
            throw new Error(response.error)
        }

    } catch (err) {
        alert(err)
    }

}

function sendReminder(customerId, invoiceId) {
    try {
        errorDiv.innerHTML += `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Reminder Sent!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `

    } catch (err) { }

}

function deleteInvoice() {
    try {

    } catch (err) { }

}

async function getMerchant(merchantId){

    console.log('Pay function called', merchantId)
    let response = await fetch('/merchant/getInfo', {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            merchantId: merchantId,
        })
    });

    response = await response.json()
    return response

}

async function payToMerchant(id, amount, sumary) {
    
    let merchant = await getMerchant(id)
    merchant = merchant.data

    let options = {
        "key": merchant.apiKey, // Enter the Key ID generated from the Dashboard
        "amount": amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": merchant.name,
        "description": sumary,
        "handler": function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "notes": {
            "address": merchant.address
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    let rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
    
    rzp1.open();

}

async function customerPendingPayments() {
    try {

        let container = document.getElementById('customer_main')
        container.innerHTML = ""
        let response = await fetch("/customer/pending", {
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`, 
            })
        })
        response = await response.json()

        if (response.message == "success") {
            let data = response.data
            console.log('Data ', data)
            data.map((d, index) => {
                let newDiv = document.createElement("div")
                newDiv.classList.add("col-3")
                let id=d.merchantId
                newDiv.innerHTML =
                    `<div class="card" style="width: 18rem; margin-bottom: 10px;">
                        <div class="card-body">
                            <h5 class="card-title">Merchant: ${d.merchantId}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Due On: ${(d.due).substring(0, 10)}</h6>
                            <p class="card-text"><div>${d.summary}</div><div>Amount: ${d.amount}</div></p>
                            <button type="button" class="btn btn-success" onclick="payToMerchant('${id}', '${d.amount}', '${d.summary}')"> Pay</button>
                        </div>
                    </div>`
                container.appendChild(newDiv)
            })

        } else {
            throw new Error(response.error)
        }

    } catch (err) {
        alert(err)
    }
}

async function customerPaidHistory() {
    try {

        let container = document.getElementById('customer_main')
        container.innerHTML = ""
        let response = await fetch("/customer/paid", {
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`, 
            })
        })
        response = await response.json()

        if (response.message == "success") {
            let data = response.data
            console.log('Data ', data)
            data.map((d) => {
                let newDiv = document.createElement("div")
                newDiv.classList.add("col-3")
                newDiv.innerHTML =
                    `<div class="card" style="width: 18rem; margin-bottom: 10px;">
                        <div class="card-body">
                            <h5 class="card-title">Merchant: ${d.merchantId}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Due On: ${(d.due).substring(0, 10)}</h6>
                            <p class="card-text">${d.summary}!!</p>
                            <span class="badge bg-success">${d.status}</span>
                        </div>
                    </div>`
                container.appendChild(newDiv)
            })

        } else {
            throw new Error(response.error)
        }

    } catch (err) {
        alert(err)
    }
}
