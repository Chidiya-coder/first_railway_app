const express = require('express');
const app = express();
const PORT   = process.env.PORT || 3000;

app.get('/', (req, res)=>{res.json({
    message: 'Hello from my first app',
    status:'Sucess! Setup complete!',
    timestamp: new Date().toISOString()
});
});

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})