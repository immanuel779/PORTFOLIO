const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Backend is running' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/experiences', require('./routes/experienceRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));