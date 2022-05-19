var express = require('express'); //Express Web Server 
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var router = express.Router();
var formidable = require('formidable');
var path = require('path'); //used for file path
var fs = require('fs-extra'); //File System-needed for renaming file etc
var app = express();
const cors = require("cors");
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
global.__basedir = __dirname;
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser({ defer: true })); //Now deprecated
//You now need to call the methods separately
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
/*
app.route('/upload')
    .post(function(req, res, next) {

        var form = new formidable.IncomingForm();
        //Formidable uploads to operating systems tmp dir by default
        form.uploadDir = "./img"; //set upload directory
        form.keepExtensions = true; //keep file extension

        form.parse(req, function(err, fields, files) {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            console.log("form.bytesReceived");
            //TESTING
            console.log("file size: " + JSON.stringify(files.fileUploaded.size));
            console.log("file path: " + JSON.stringify(files.fileUploaded.path));
            console.log("file name: " + JSON.stringify(files.fileUploaded.name));
            console.log("file type: " + JSON.stringify(files.fileUploaded.type));
            console.log("astModifiedDate: " + JSON.stringify(files.fileUploaded.lastModifiedDate));

            //Formidable changes the name of the uploaded file
            //Rename the file to its original name
            fs.rename(files.fileUploaded.path, './img/' + files.fileUploaded.name, function(err) {
                if (err)
                    throw err;
                console.log('renamed complete');
            });
            res.end();
        });
    });
    */
/** Request Header */
/*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, access_token"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
*/

router.Users = require('./user.routes');
router.Tutorials = require('./tutorial.routes');
router.Auth = require('./auth.routes');
//router.Upload = require('./upload.routes');
module.exports = router;

/**
 * TO running server type: npm run server.js, npm start dev
 * 
 */