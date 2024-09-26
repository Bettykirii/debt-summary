const express = require('express');
const multer = require ('multer');
const csv = require('csv-parser'); //parse csv files into a readable stream
const fs = require('fs'); // module used to read and write files 
const { createwriteStream } = require('fs'); //

const app = express(); //intializes the express application which handles the requests and serve responses


app.use(express.json()); //processes the json data/payload
app.use(express.urlencoded({ extended: true}));

const PORT = process.env.PORT || 3000;