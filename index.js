const express = require("express");
const app= express();
const port = 3000;
//JSONを使うことの明示
app.use(express.json());

app.listen(port, ()=> console.log("サーバが起動しました"));



const customers= [
    {title: "田中",id:1},
    {title: "佐藤",id:2},
    {title: "橋本",id:3},
];


///api/customersにアクセスした際にcustomersの中身をresposeとして送る
app.get("/api/customers/",(req,res)=>{
    res.send(customers)
})

///api/customersでpostする
app.post("/api/customers/",(req,res)=>{
    //customerを以下のJSON形式で定義する
    const cusotmer={
        title: req.body.title,
        id:customers.length+1,
    };
    //pushはaddと同じ　customersの末尾にcustomerを追加する
    customers.push(cusotmer);

    res.send(cusotmer);

})

app.put("/api/customers/:id",(req,res)=>{
    //customersの中から、req.params.idと同じidの人を探す
    const customer=customers.find((c)=> c.id===parseInt(req.params.id));
    customer.title=req.body.title;
    res.send(customer);

});

app.delete("/api/customers/:id",(req,res)=>{
    //customersの中から、req.params.idと同じidの人を探す
    const customer=customers.find((c)=> c.id===parseInt(req.params.id));
    const index=customers.indexOf(customer);
    customers.splice(index,1);
    res.send(customer);

});