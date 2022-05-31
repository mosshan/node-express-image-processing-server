var Router = require('express').Router;
var multer = require('multer');

const storage = multer.diskStorage({
  destination:'api/uploads/',
  filename: filename});
const router = Router();
const upload = multer({
  fileFilter: fileFilter,
  storage: storage
});

router.post('/upload', upload.single('photo'), (request, response)=>{
  if(request.fileValidationError != null){
    return response.status(400).json({
      error: request.fileValidationError
    });     
  }
  else{
    return response.status(201).json({
      success: true
    })
  }
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