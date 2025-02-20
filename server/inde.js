const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const multer = require('multer');
const path = require('path');


app.use(bodyParser.json()); //สำหรับเก็บข้อมูล users
app.use(cors()) //เพื่อให้สามารถเรียกใช้งาน api จากฝั่งอื่นได้

const port = 8000;

let conn = null;


const initMysql = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'house_rental',
        port: 3307
    });
    console.log('Connected to mysql');
}

// ตั้งค่า Multer สำหรับอัปโหลดไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'D:/project/project_house_rent_system/frontend/uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });



//เช็คว่า server ทำงานได้หรือไม่
app.get('/', (req, res) => {
    res.json({
        message: 'Server started!'
    })
})

// 1.GET /datahome สำหรับ get datahome ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/datahome', async (req, res) => {
    const results = await conn.query('SELECT * FROM homes');
    res.json(results[0]);
})

//2.get /datahome/:id สำหรับ get datahome ตาม id ที่เราส่งเข้ามา
app.get('/datahome/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM homes WHERE home_id = ?', id);
        if (results[0].length == 0) {
            res.status(404).json({
                message: 'No from found'
            })
            return;
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// //3.POST /agreement สำหรับเพิ่ม agreement ใหม่
// app.post('/agreement', async (req, res) => {
//     try {
//         let agreementData = req.body;
//         console.log("123456")
//         console.log(agreementData)
//         const results = await conn.query('INSERT INTO agreements SET ?', agreementData)
//         res.json({
//             message: 'Add from success',
//             data: agreementData[0]
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// })

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
app.delete('/datahome/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM homes WHERE home_id = ?', id);
        res.json({
            message: 'Delete from success'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// 6.GET /agreement สำหรับ get agreement ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/agreement', async (req, res) => {
    const results = await conn.query('SELECT * FROM agreements');
    res.json(results[0]);
})


//7.GET /datahome/search/:keyword สำหรับค้นหา บ้าน โดยใช้ keyword ที่ระบุ 
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
app.get('/owner/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT owner_id, firstname, lastname, phone, signature, location FROM owners WHERE owner_id = ?', id);
        if (results[0].length == 0) {
            res.status(404).json({
                message: 'No from found'
            })
            return;
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//get /employee/:id สำหรับ get employee ตาม id ที่เราส่งเข้ามา
app.get('/employee/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT employee_id, firstname, lastname, phone FROM employees WHERE employee_id = ?', id);
        if (results[0].length == 0) {
            res.status(404).json({
                message: 'No from found'
            })
            return;
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//post /employee/login สำหรับ get employee ตาม id ที่เราส่งเข้ามา
app.post('/employee/login', async (req, res) => {
    try {
        let agreementData = req.body;
        console.log(agreementData);
        const results = await conn.query('SELECT employee_id FROM employees WHERE email = ? AND password = ?', [agreementData.email, agreementData.password]);
        if (results[0].length == 0) {
            res.status(404).json({
                message: 'No from found'
            })
            return;
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//ส่วน agreement

// API อัปโหลดรูปและเพิ่มข้อมูล Agreement
app.post('/agreement', upload.single('image_agreement'), async (req, res) => {
    try {
        console.log("ไฟล์ที่อัปโหลด:", req.file);  // แสดงชื่อไฟล์ที่อัปโหลด

        const agreementData = req.body;
        const image = req.file ? req.file.filename : null; // เก็บชื่อไฟล์ในฐานข้อมูล

        // เพิ่ม image ลงใน agreementData ก่อน
        agreementData.image = image;

        // Execute SQL
        const [results] = await conn.query(
            `INSERT INTO agreements SET ?`,
            [agreementData]
        );

        res.json({
            message: 'เพิ่มข้อมูลสำเร็จ',
            agreement_id: results.insertId,
            image: image
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
});



//get /agreement/:id สำหรับ get agreement ตาม id ที่เราส่งเข้ามา
app.get('/agreement/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM agreements WHERE agreements_id = ?', id);
        if (results[0].length == 0) {
            res.status(404).json({
                message: 'No from found'
            })
            return;
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//put /agreement/:id สำหรับยืนยัน agreement ตาม id ที่เราส่งเข้ามา
app.put('/agreementpass/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let agreementData = { status: 'ตรวจสอบแล้ว' }

        const results = await conn.query('UPDATE agreements SET ? WHERE agreements_id = ?', [agreementData, id])
        res.json({
            message: 'Update from success',
            data: agreementData[0]
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//put /agreement/:id สำหรับยืนยัน agreement ตาม id ที่เราส่งเข้ามา
app.put('/agreementnotpass/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let agreementData = { status: 'ยกเลิก' }

        const results = await conn.query('UPDATE agreements SET ? WHERE agreements_id = ?', [agreementData, id])
        res.json({
            message: 'Update from success',
            data: agreementData[0]
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//DELETE /agreement/:id สำหรับลบ from ตาม id ที่เราส่งเข้ามา
app.delete('/agreement/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM agreements WHERE agreements_id = ?', id);
        res.json({
            message: 'Delete from success'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//api custom
//GET /custom/:id สำหรับ get custom ตาม id ที่เราส่งเข้ามา
app.get('/custom/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT custom_id, firstname, lastname, phone, email,location FROM customs WHERE custom_id = ?', id);
        if (results[0].length == 0) {
            res.status(404).json({
                message: 'No from found'
            })
            return;
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//post /custom/login สำหรับ get custom ตาม id ที่เราส่งเข้ามา
app.post('/custom/login', async (req, res) => {
    try {
        let customData = req.body;
        console.log(customData);
        const results = await conn.query('SELECT custom_id FROM customs WHERE email = ? AND password = ?', [customData.email, customData.password]);
        if (results[0].length == 0) {
            res.status(404).json({
                message: 'No from found'
            })
            return;
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.listen(port, async (req, res) => {
    await initMysql();
    console.log('http server run at ' + port);
});