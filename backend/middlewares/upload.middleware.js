import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.files)
    const category = req.body.category || 'general';  
    console.log(category)
    
    if (file.mimetype.startsWith('image/')) {
      cb(null, `backend/uploads/${category}/images`);
    } else if (file.mimetype === 'application/pdf') {
      cb(null, `backend/uploads/${category}/pdfs`);
    } else {
      
      cb(new Error('Invalid file type, only images and PDFs are allowed'), false);
    }
  },
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  
}).fields([
  { name: 'image', maxCount: 1 },  
  { name: 'pdf', maxCount: 3 }, 
  {name:'showroom',maxCount:10},   
]);


export default upload;
