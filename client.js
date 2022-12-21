
function viewInvoice(e)
{
    e.preventDefault();
    fetch('http://localhost:9000/invoice')
    .then(res => res.json())
    .then(data =>
        {
            clearOutput();
            displayInvoice(data);
           
            addEventListeners();
        });

        

}

function addEventListeners()
{
    const deletes= document.querySelectorAll('#delete-item');
            for(i=0;i<deletes.length;i++)
            {
                deletes[i].addEventListener('click',deleteInvoice);
            }

            const slots=document.querySelectorAll('.dbclick');
            
                slots.forEach(slot=>
                    {
                        slot.addEventListener('dblclick',makeEditable);
                    });

            const edits= document.querySelectorAll('#edit-item');
            edits.forEach(edit =>
                {
                    edit.addEventListener('click',updateInvoice);
                });

                
}

function clearOutput()
    {
        const output= document.querySelector('#invoice-list');
        
         output.textContent='';
    }

    function makeEditable(event)
    {
        
        event.target.setAttribute('contenteditable',true);
        event.preventDefault();
    }

function displayInvoice(data)
{
    let output= document.querySelector('#invoice-list');

    for (invoice of data)
    {
        let tr= document.createElement('tr');
        
        invoice.InvoiceDate=invoice.InvoiceDate.substr(0,10);
        
        tr.innerHTML=`
        <td id="id" class="hidden">${invoice.InvoiceId}</td>
        <td colspan="2" class="dbclick">${invoice.CustomerId}</td> 
        <td colspan="2" class="dbclick"> ${invoice.InvoiceDate} </td>
        <td colspan="2" class="dbclick"> ${invoice.BillingAddress}, ${invoice.BillingCity},${invoice.BillingState},${invoice.BillingCountry},${invoice.BillingPostalCode}</td>
        <td class="dbclick"> ${invoice.Total}</td>
        <td><a href="#" class="secondary-content"><i id="edit-item" class="fa fa-pencil"></i></a></td>
        <td><a href="#" class= "secondary-content"><i id="delete-item" class="fa fa-remove"></i></a></td>`;
        
        output.appendChild(tr);
    }
    
}

function addInvoice(event)
{
    //get info from form
    let formdata = new FormData(document.querySelector('#add-form'));
    event.preventDefault(); 
    fetch('http://localhost:9000/invoice',{method:'post',body:formdata})
    .then(res => 
        {
            console.log(res.json());
            alert('Invoice Added');
        })
        .catch(err =>
            {
                alert(err)
            });       
}



function deleteInvoice(event)
{
    const parent = event.target.parentElement.parentElement.parentElement;
    let id= parent.firstElementChild.innerText;
    
    fetch(`http://localhost:9000/invoice/${id}`,
    {headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'DELETE',
});
    alert('Invoice Deleted');
}

 function updateInvoice(event)
 {
    
    const parent = event.target.parentElement.parentElement.parentElement;
    let ID= parent.firstElementChild.innerText;
    
    data= parent.children;
    
    let invoiceData={};
    invoiceData.custID=data[1].textContent;
    invoiceData.invoiceDate=data[2].textContent;
    invoiceData.billAddress=data[3].textContent.split(',');
    invoiceData.total=data[4].textContent;
    invoiceData= JSON.stringify(invoiceData);
    

    fetch(`http://localhost:9000/invoice/${ID}`,
    {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    method:'put',
    body:invoiceData
 });

    alert('Invoice Updated');

}



function addEvents()
{
    //CLICK EVENTS
    document.querySelector('.add-btn').addEventListener('click', addInvoice);
    document.querySelector('.view-btn').addEventListener('click', viewInvoice);

}

addEvents();