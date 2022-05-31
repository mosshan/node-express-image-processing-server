const path = require('path');
const Router = require('express').Router;
const multer = require('multer');
const imageProcessor = require('./imageProcessor');

const photoPath = path.resolve(__dirname, '../../client/photo-viewer.html');
const storage = multer.diskStorage({
  destination:'api/uploads/',
  filename: filename});

const router = Router();
const upload = multer({
  fileFilter: fileFilter,
  storage: storage
});

router.post('/upload', upload.single('photo'), async (request, response)=>{
  if(request.fileValidationError != null){
    return response.status(400).json({
      error: request.fileValidationError
    });     
  }
  else{
    try{
      await imageProcessor(request.file.filename);
    } catch(error){
      
    }
    return response.status(201).json({
      success: true
    })
  }
})

router.get('/photo-viewer', (request, response)=>{
  response.sendFile(photoPath);
})

module.exports = router;


function filename(request, file, callback){
  callback(null, file.originalname);
};

function fileFilter(request, file, callback){
  if(!(file.mimetype === 'image/png')){
    request.fileValidationError = 'Wrong file type';
    callback(null, false, Error('Wrong file type'));
  } else{
    callback(null, true);
  }
};