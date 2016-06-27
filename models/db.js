/**
 * Created by csimas on 6/20/16.
 */
var chalk = require('chalk');
var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://localhost/giflib';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log(chalk.green('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
    console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
    console.log(chalk.red('Mongoose disconnected'));
});

var gifSchema = new mongoose.Schema({
    link: {type: String},
    tags: {type: String},
});

mongoose.model( 'Gif', gifSchema );