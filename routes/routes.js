/**
 * Created by csimas on 6/20/16.
 */
var mongoose = require( 'mongoose' );
var Gif = mongoose.model( 'Gif' );
var path = require('path');

exports.addGIF = function(req, res) {
  //get link, tag, etc from request
    var link = req.body.link;
    var tags = req.body.tags;

    var http = /http/;
    var gif = /gif/;
    if ( !(http.test(link)) || !(gif.test(link)) ) {
        var message = "not a valid gif url";
        console.log(message);
        res.status(400).sendFile('gifSubpost.html', { root: path.join(__dirname, '../public') });
        return;
    }

    var newGif = new Gif();

    newGif.link = link;
    newGif.tags = tags;

    newGif.save(function(err, savedGif){
        if (err) {
            var message = "Error submitting new GIF";
            console.log(message+"\n"+err);
            res.status(500).sendFile('gifSubpost.html', { root: path.join(__dirname, '../public') });
        } else {
            res.status(201).sendFile('index.html', { root: path.join(__dirname, '../public') });
        }
    });
}

exports.getGifs = function(req, res) {
    Gif.find({}, function(err, records){

        if (err) {
            console.log(err);
            res.status(500).send("Error Occurred while fetching data");
            return;
        } else {
            var data = records;
            res.status(200).send(data);
        }

    });
}

exports.getGif = function(req, res) {
    var id = req.params.id;
    Gif.findOne({"_id":id}, function(err, record){
        if(err){
            console.log(err);
            res.status(404).send("No Record Found");
            return;
        }else{
            var data = record;
            res.status(200).send(data);
        }
    });
}