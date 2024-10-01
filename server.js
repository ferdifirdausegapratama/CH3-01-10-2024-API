const fs = require("fs")
// const http = require("http")
const express = require("express")

const app = express();

// default URL = Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        "status": "Succes",
        "message": "Application is running good...",
    })
})

// kalau HTTP module kan if(req.url === / "ferdi") {}
app.get('/ferdi', (req, res) => {
    res.status(200).json({
        "message": "Ping Successfully !"
    })
})

// /api/v1/(collection nya) => collectionnya ini harus JAMAK (s)
app.get('/api/v1/cars', (req, res) => {
    const cars = JSON.parse(
        fs.readFileSync(`${__dirname}/data/cars.json`, "utf-8")
    ); 
    
    res.status(200).json({
        status : "Succes",
        message: "Succes get cars data",
        isSucces: true,
        data: cars,
    });
});

// middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada di aplikasi 
// membuat middlkeware = our own middleware
app.use((req, res, next) => {
    res.status(404).json({
        "status": "Failed",
        "message": "API not exist !!!"
    })
})

app.listen("3000", ()=>{
    console.log("Start Aplikasi Kita Di Port 3000")
})
 