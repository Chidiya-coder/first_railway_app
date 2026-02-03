const express = require('express');
const app = express();
const PORT   = process.env.PORT || 3000;

app.get('/', (req, res)=>{res.json({
    message: 'Hello from my first app',
    status:'Sucess! Setup complete!',
    timestamp: new Date().toISOString()
});
});

app.get('/skills', (req, res) => {
  res.json({
    name: 'Your Name',
    experience: '12 years',
    languages: ['C++', 'Node.js'],
    tools: ['Docker', 'Git', 'Railway.app'],
    status: 'Learning cloud deployment! 🚀'
  });
});

app.get('/about', (req, res) => {
  res.json({
    project: 'My First Railway Deployment',
    date: new Date().toISOString(),
    achievement: 'Successfully deployed to cloud!',
    next_steps: ['Add database', 'Learn Docker', 'Practice more']
  });
});

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})