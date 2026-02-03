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
    name: 'Preeti Rani',
    experience: '12 years in C++ and Node.js',
    current_role: 'Senior Developer',
    languages: ['C++', 'C++11/14/17', 'Node.js', 'JavaScript'],
    tools: ['Docker', 'Git', 'Railway.app', 'Google Test', 'CMake'],
    databases: ['PostgreSQL', 'MySQL', 'MongoDB'],
    current_learning: ['AWS', 'Kubernates', 'System Design'],
    status: 'Interview ready!🚀',
    github: 'github.com/Chidiya-coder',
    deployed_on: 'Railway.app',
    achievement: 'First cloud deployment completed!'
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

app.get('/projects', (req, res) => {
  res.json({
    total_projects: 'Multiple enterprise applications',
    years_experience: 11,
    team_leadership: 'Led team of 3 developers',
    testing: 'Google Test framework (gtest)',
    microservices: 'Node.js microservices architecture',
    recent_achievement: 'Deployed cloud application with CI/CD'
  });
});

app.get('/interview-ready', (req, res) => {
  res.json({
    technical_skills: 'Strong ✓',
    cloud_deployment: 'Experienced ✓',
    version_control: 'Git & GitHub ✓',
    ci_cd: 'Implemented ✓',
    ready_to_interview: true,
    confidence: 'HIGH',
    proof: 'You are looking at it! This live API proves my skills.'
  });
});

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})