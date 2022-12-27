require("dotenv").config();
let mongoose = require("mongoose");

const mySecret = process.env["MONGO_URI"];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

//
// Person Schema
//
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  favoriteFoods: [String],
});

//
// Person Model
//
let Person = mongoose.model("Person", personSchema);

//
// Create and Save a Record of a Model
//
const createAndSavePerson = (done) => {
  const aPerson = new Person({
    name: "Taiwo O",
    age: 40,
    gender: "Male",
    favoriteFoods: ["Jollof", "Rice", "Spag"],
  });
  aPerson.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//
// Create Many Records with model.create()
//
let arrayOfPeople = [
  {
    name: "Taiwo O",
    age: 40,
    gender: "Male",
    favoriteFoods: ["Jollof", "Rice", "Spag"],
  },
  {
    name: "Taiwo O",
    age: 40,
    gender: "Male",
    favoriteFoods: ["Jollof", "Rice", "Spag"],
  },
  {
    name: "Taiwo O",
    age: 40,
    gender: "Male",
    favoriteFoods: ["Jollof", "Rice", "Spag"],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//
// Use model.find() to Search Your Database
//
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//
// Use model.findOne() to Return a Single Matching Document from Your // Database
//
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//
// Use model.findById() to Search Your Database By _id
//
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//
// Perform Classic Updates by Running Find, Edit, then Save
//
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // .findById() method to find a person by _id with the parameter
  // personId as search key.
  Person.findById({ _id: personId }, function (err, person) {
    if (err) return console.error(err);

    // Array.push() method to add "hamburger" to the list of the
    //person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

//
// Perform New Updates on a Document Using model.findOneAndUpdate()
//
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, updatedData) {
      if (err) return console.error(err);
      done(null, updatedData);
    }
  );
};

//
// Delete One Document Using model.findByIdAndRemove
//
const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//
// Delete Many Documents with model.remove()
//
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// find people who like foodToSearch.
// Sort them by name, limit the results to two documents, and hide their age.
// Chain .find(), .sort(), .limit(), .select(), and then .exec().
// Pass the done(err, data) callback to exec().
//
// Chain Search Query Helpers to Narrow Search Results
//
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
