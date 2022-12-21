/* 
    AUTHOR: KEDEJRA CAMERON
    Date: Dec 1 2022
   Database Table Used: Invoice
*/
const PORT=9000;

const express= require('express');
const app= express();

const DB= require('better-sqlite3');
const db= new DB('./database/Chinook_Sqlite.sqlite');

const multer= require('multer');
const upload=multer();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const cors = require('cors');
app.use(cors({origin:'*'}));


app.get('/invoice', (req,res)=>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    const sql= "SELECT * FROM Invoice";
    const statement= db.prepare(sql);
    const result= statement.all();
    res.json(result);
});

app.post('/invoice',upload.none(), (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    const sql="INSERT INTO Invoice (CustomerId,InvoiceDate,BillingAddress,BillingCity,BillingState,BillingCountry,BillingPostalCode,Total) VALUES (?,?,?,?,?,?,?,?)";
    const statement= db.prepare(sql);
    statement.run([req.body.custID,req.body.invoiceDate,req.body.billingAddr,req.body.billingCity,req.body.billingState,req.body.billingCountry,req.body.billingPostal,req.body.billingTotal]);

    res.end('Invoice Added');
})

app.delete('/invoice/:id',upload.none(),(req,res)=>
{
    const sql = "DELETE FROM Invoice WHERE InvoiceId = ?";
    const statement = db.prepare(sql);
    const result=statement.run([req.params.id]);
    res.json(result);
    res.end('Deleted Invoice:',req.params.id);
    
    });

    app.put('/invoice/:id',upload.none(),(req,res)=>
    {
        res.setHeader('Access-Control-Allow-Origin','*');
        const sql = "UPDATE Invoice SET CustomerId = ?,InvoiceDate = ?,BillingAddress = ?,BillingCity = ?,BillingState = ?,BillingCountry = ?,BillingPostalCode = ?,Total = ? WHERE InvoiceId=?";
        const statement = db.prepare(sql);
        statement.run([req.body.custID,req.body.invoiceDate,req.body.billAddress[0],req.body.billAddress[1],req.body.billAddress[2],req.body.billAddress[3],req.body.billAddress[4],req.body.total, req.params.id]);
        res.end('Invoice Updated');
    });

app.listen(PORT, ()=> console.log('Running on port',PORT));