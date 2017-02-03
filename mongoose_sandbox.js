'use strict'

var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err){
    console.error("connection error:", err);
});

db.once("open", function(){
    console.log("db connection successful");

    // HERE: all database communication

    var Schema = mongoose.Schema;
    var AnimalSchema = new Schema({
        type: {type: String, default: "goldfish"},
        color:{type: String, default: "gold"},
        size: {type: String, default: "small"},
        mass: {type: Number, default: 0.007},
        name: {type: String, default: "Tony"}
    });

    var Animal = mongoose.model("Animal", AnimalSchema);

    var elephant = new Animal({
        type: "elephant",
        size: "big",
        color: "gray",
        mass: 6000,
        name: "Larry"
    });

    var animal = new Animal({});

    var whale = new Animal({
        type: "whale",
        size: "big",
        mass: 190500,
        name: "Vic"
    });

    Animal.remove({}, function(err) {
        if (err) console.error(err);
        elephant.save(function(err) {
            if (err) console.error(err);
            animal.save(function(err) {
                if (err) console.error(err);
                whale.save(function(err){
                    if (err) console.error(err);
                    Animal.find({size: "big"}, function(err, animals) {
                        animals.forEach(function(animal){
                            console.log(animal.name + " the " + animal.type);
                        });
                        db.close(function() {
                            console.log("db connection closed!");
                        });
                    });
                });
            });
        });
    });
});
