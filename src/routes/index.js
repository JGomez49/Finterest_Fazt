const {Router} = require('express');
const router = Router();

//Esta constante image es la que me permite crear una nueva
//imagen y guardarla en la base de datos
const Image = require('../models/Image')

router.get('/', async(req,res)=>{
    //res.send('index page');
    const images = await Image.find();
    // console.log(images);
    res.render('index', {images: images});
});

router.get('/upload', (req,res)=>{
    res.render('upload.ejs');
});

router.post('/upload', async(req,res)=>{
    const image = new Image();
    //el req.body es lo que se recibe desde el formulario
    console.log(req);
        image.title = req.body.title;
        image.description = req.body.description;
        image.filename = req.file.filename;
        image.path = 'img/uploads/' + req.file.filename;
        image.originalname = req.file.originalname;
        image.mimetype = req.file.mimetype;
        image.size = req.file.size;
    await image.save();
    console.log(image);
    res.redirect('/');
});

router.get('/image/:id', async(req,res)=>{
    const {id} = req.params;
    console.log('El id de la foto es: ' + id);
    const image = await Image.findById(id);
    console.log('Esto es image: ' + image);
    res.render('profile', {image: image});
});

router.get('/image/:id/delete', async(req,res)=>{
    console.log(req.params.id);
    const {id} = req.params;
    await Image.findByIdAndDelete(id);
    res.redirect('/');
});

module.exports = router;