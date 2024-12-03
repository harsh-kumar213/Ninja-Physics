// packages
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

//middleware
import { connectDB } from './middlewares/connectDB.js';

//routes
import userRoutes from './routes/user.routes.js';
import networkRoutes from './routes/network.routes.js';
import projectRoutes from './routes/project.routes.js';
import ideaRoutes from './routes/idea.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();
const PORT = 5000|| process.env.PORT;

//app.use(express.static());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth',userRoutes);
app.use('/api/idea',ideaRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/network',networkRoutes);

app.listen(PORT,()=>{
     connectDB();
     console.log(`server is running on port ${PORT}`);
})