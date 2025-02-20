const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();

app.use(bodyParser.json()); //สำหรับเก็บข้อมูล users
app.use(cors()) //เพื่อให้สามารถเรียกใช้งาน api จากฝั่งอื่นได้
const port = 8000;

let conn= null;


const initMysql = async ()=>{
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'house_rental',
        port: 3307
    });
    console.log('Connected to mysql');
}
//เช็คว่า server ทำงานได้หรือไม่
app.get('/',(req,res)=>{
    res.json({
        message:'Server started!'
    })
})

// 1.GET /datahome สำหรับ get datahome ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/datahome',async(req,res)=>{
    const results = await conn.query('SELECT * FROM homes');
    res.json(results[0]);
})

//2.get /datahome/:id สำหรับ get datahome ตาม id ที่เราส่งเข้ามา
app.get('/datahome/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM homes WHERE home_id = ?',id);
        if(results[0].length == 0){
            res.status(404).json({
                message:'No from found'
            })
            return;
        }
        res.json(results[0]);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

//3.POST /agreement สำหรับเพิ่ม agreement ใหม่
app.post('/agreement',async(req,res)=>{
    try{
        let agreementData = req.body;
        console.log("123456")
        console.log(agreementData)
        const results = await conn.query('INSERT INTO agreements SET ?',agreementData)
        res.json({
            message:'Add from success',
            data: agreementData[0]
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

// //4.PUT /datahome/:id สำหรับแก้ไข datahome ตาม id ที่เราส่งเข้ามา
// app.put('/from/:id',async(req,res)=>{
//     try{
//         let id = req.params.id;
//         let userData = req.body;
//         const errors = validateData(userData);
//         if (errors.length > 0){
//             throw{
//                 message: 'ข้อมูลไม่ครบถ้วน',
//                 errors: errors
//             }
//         }
//         const results = await conn.query('UPDATE medical_records SET ? WHERE id = ?',[userData,id])
//         res.json({
//             message:'Update from success',
//             data: userData[0]
//         })
//     }catch(error){
//         res.status(500).json({
//             message:error.message
//         })
//     }
// })

//5.DELETE /from/:id สำหรับลบ from ตาม id ที่เราส่งเข้ามา
app.delete('/datahome/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const results = await conn.query('DELETE FROM homes WHERE home_id = ?',id);
        res.json({
            message:'Delete from success'
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

//GET /doctor/search/:keyword สำหรับค้นหา user โดยใช้ keyword ที่ระบุ 
app.get('/datahome/search/:keyword',async(req,res)=>{
    try{
        let keyword = req.params.keyword;
        //ยังมีerror ที่ถ้าใส่ ชื่อกับนามสกุล แล้วไม่เจอ จะเข้าไปที่ catch
        const results = await conn.query('SELECT * FROM homes WHERE titlehome LIKE ? OR location LIKE ?',['%'+keyword+'%','%'+keyword+'%']);
        if(results[0].length == 0){
            res.status(404).json({
                message:'No users found'
            })
            return;
        }
        res.json(results[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:'Internal server error'
        })
    }
})

// 6.GET /agreement สำหรับ get agreement ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/agreement',async(req,res)=>{
    const results = await conn.query('SELECT * FROM agreements');
    res.json(results[0]);
})



//7.GET /datahome/search/:keyword สำหรับค้นหา user โดยใช้ keyword ที่ระบุ 
app.post('/datahome/search', async (req, res) => {
    try {
        let { titlehome, location, typehome, bedroom } = req.body;

        let query = `SELECT * FROM homes WHERE 1=1`;
        let values = [];

        if (titlehome) {
            query += ` OR (titlehome LIKE ? OR location LIKE ?)`;
            values.push(`%${titlehome}%`, `%${titlehome}%`);
        }
        if (location) {
            query += ` AND location = ?`;
            values.push(location);
        }
        if (typehome) {
            query += ` AND typehome_id = ?`;
            values.push(typehome);
        }
        if (bedroom) {
            query += ` AND bedroom = ?`;
            values.push(bedroom);
        }
        
        console.log(query);
        console.log(values);

        const [rows] = await conn.query(query, values);
        res.json(rows);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching data');
    }
});



//8.get /owner/:id สำหรับ get owner ตาม id ที่เราส่งเข้ามา
app.get('/owner/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const results = await conn.query('SELECT owner_id, firstname, lastname, phone, signature, location FROM owners WHERE owner_id = ?',id);
        if(results[0].length == 0){
            res.status(404).json({
                message:'No from found'
            })
            return;
        }
        res.json(results[0]);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

//get /employee/:id สำหรับ get employee ตาม id ที่เราส่งเข้ามา
app.get('/employee/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const results = await conn.query('SELECT employee_id, firstname, lastname, phone FROM employees WHERE employee_id = ?',id);
        if(results[0].length == 0){
            res.status(404).json({
                message:'No from found'
            })
            return;
        }
        res.json(results[0]);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

//post /employee/login สำหรับ get employee ตาม id ที่เราส่งเข้ามา
app.post('/employee/login',async(req,res)=>{
    try{
        let agreementData = req.body;
        console.log(agreementData);
        const results = await conn.query('SELECT employee_id FROM employees WHERE email = ? AND password = ?',[agreementData.email,agreementData.password]);
        if(results[0].length == 0){
            res.status(404).json({
                message:'No from found'
            })
            return;
        }
        res.json(results[0]);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

//get /agreement/:id สำหรับ get agreement ตาม id ที่เราส่งเข้ามา
app.get('/agreement/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM agreements WHERE agreements_id = ?',id);
        if(results[0].length == 0){
            res.status(404).json({
                message:'No from found'
            })
            return;
        }
        res.json(results[0]);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

//api custom
//GET /custom/:id สำหรับ get custom ตาม id ที่เราส่งเข้ามา
app.get('/custom/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const results = await conn.query('SELECT custom_id, firstname, lastname, phone, email,location FROM customs WHERE custom_id = ?',id);
        if(results[0].length == 0){
            res.status(404).json({
                message:'No from found'
            })
            return;
        }
        res.json(results[0]);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

//post /custom/login สำหรับ get custom ตาม id ที่เราส่งเข้ามา
app.post('/custom/login',async(req,res)=>{
    try{
        let customData = req.body;
        console.log(customData);
        const results = await conn.query('SELECT custom_id FROM customs WHERE email = ? AND password = ?',[customData.email,customData.password]);
        if(results[0].length == 0){
            res.status(404).json({
                message:'No from found'
            })
            return;
        }
        res.json(results[0]);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

app.listen(port, async (req,res) => {
    await initMysql();
    console.log('http server run at ' + port);
});