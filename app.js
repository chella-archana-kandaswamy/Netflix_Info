var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var netflixController = require('./controller/netflixTitlesController');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Netflix API",
            description: "Netflix API Information",
            contact: {
                name: "Chella"
            },
            servers: ["http://167.99.144.102:3000/"]
        }
    },
    // ['.routes/*.js']
    apis: ["app.js"]
};

app.set('view engine', 'ejs');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', netflixController);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(bodyParser.json({}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'netflix'
}));

mongoose.connect('mongodb+srv://ckandasw:Guruman@netflixcluster-hurmw.mongodb.net/netflix?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});


// Routes
/**
 * @swagger
 * /netflix/get:
 *  get:
 *    tags:
 *     - netflix
 *    description: Use to request all netflix info
 *    responses:
 *      '200':
 *        description: A successful response
 */


 
 /**
 * @swagger
 * /netflix/:
 *    post:
 *      tags:
 *       - netflix
 *      description: Use to create a netflix info
 *      security:
 *       - bearerAuth: []
 *      consumes:
 *       - application/json
 *      produces:
 *       - application/json
 *      parameters:
 *        - name: netflix
 *          in: body
 *          description: Netflix Data  
 *          schema:
 *            type: object
 *            properties:
 *               type:
 *                 type: string
 *               title:
 *                 type: string
 *               release_year:
 *                 type: string
 *               genere:
 *                 type: string    
 *      responses:
 *        '200':
 *           description: Successfully created netflix record
 */

/**
 * @swagger
 * /netflix/{_id}:
 *    put:
 *      tags:
 *       - netflix
 *      description: Use to update a netflix info
 *      security:
 *       - bearerAuth: []
 *      consumes:
 *       - application/json
 *      produces:
 *       - application/json
 *      parameters:
 *        - name: _id
 *          description: Movie's Id
 *          in: path
 *          required: true
 *          type: string    
 *        - name: netflix
 *          in: body
 *          description: Netflix Data  
 *          schema:
 *            type: object
 *            properties:
 *               type:
 *                 type: string
 *               title:
 *                 type: string
 *               release_year:
 *                 type: string
 *               genere:
 *                 type: string    
 *      responses:
 *        '200':
 *           description: Successfully updated netflix record
 */ 

/**
 * @swagger
 * /netflix/{_id}:
 *    patch:
 *      tags:
 *       - netflix
 *      description: Use to edit a netflix info
 *      security:
 *       - bearerAuth: []
 *      consumes:
 *       - application/json
 *      produces:
 *       - application/json
 *      parameters:
 *        - name: _id
 *          description: Movie's Id
 *          in: path
 *          required: true
 *          type: string
 *        - name: netflix
 *          in: body
 *          description: Netflix Data  
 *          schema:
 *            type: object
 *            properties:
 *               type:
 *                 type: string    
 *      responses:
 *        '200':
 *           description: Successfully edited netflix record
 */ 


/**
 * @swagger
 * /netflix/{_id}:
 *    delete:
 *      tags:
 *       - netflix
 *      description: Use to delete a netflix info
 *      security:
 *       - bearerAuth: []
 *      consumes:
 *       - application/json
 *      produces:
 *       - application/json
 *      parameters:
 *        - name: _id
 *          in: path
 *          description: Netflix Id  
 *          required: true
 *          type: string   
 *      responses:
 *       '200':
 *          description: Successfully deleted netflix record
 */  
app.use('/netflix', netflixController);


app.listen(3000, function () {
    console.log('app started');
    console.log('listening on port 3000');
});