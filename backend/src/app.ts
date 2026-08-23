import express from 'express';

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        message:"ghosh ki ma ka bhosda",
    })
})

export default app