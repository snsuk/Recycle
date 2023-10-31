import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('images'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname )
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 1024* 1024 * 2},
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            return cb(null, true)
        }
        return cb(new Error('Только формат .png или .jpeg (.jpeg)'), false)
    }
})
export default upload