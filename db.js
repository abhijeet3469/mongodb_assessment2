const MongoClient = require("mongodb").MongoClient;
const employeesData=require("./emp.json")

const connectionString = "mongodb://127.0.0.1:27017/";

var dbCollection;

MongoClient.connect(connectionString, async (err, db) => {
    if (err) {
      console.error("Error while connecting", err)
      return
    }
    const database = db.db("Human_Resoure")
    const dbCollection = database.collection("emp")
  
    console.log("Connected to Mongo Database")
  
    const inserting = await database.collection("emp").insertMany(employeesData)
  
    console.log(inserting)

    const tofind = await database.collection("emp").find().toArray();
    console.log(tofind);

    const findsalary = await database.collection("emp").find({"salary": {$gt: "30000"}}).toArray();
    console.log(findsalary);

    const experince = await database.collection("emp").find({"overallExp": {$gt: "1"}}).toArray();
    console.log(experince);

    const conditions = await database.collection("emp").find({$and: [{"yearGrad": {$gt: "2015"}}, {"overallExp": {$gt: "1"}}]}).toArray();
    console.log(conditions);

    const update = await database.collection("emp").updateMany({"salary": {$gt: "30000"}}, {$set: {"salary": "28000"}});
    console.log(update);

    const Delete = await database.collection("emp").deleteMany({"lastCompany": "Y"});
    console.log(Delete);
})