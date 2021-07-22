var driverDB = require('../model/model.js');

// create and save new driver

exports.create = (req,res) => {
    // validate request
    if(!req.body){
        req.status(400).send({message:"Content cannot be empty!"});
        return;
    }
    // new driver

    const driver = new driverDB({
        name:req.body.name, 
        phone:req.body.phone, 
        gender: req.body.gender, 
        location:req.body.location
    });

    // save user in the database
    driver 
        .save(driver)
        .then(data=>{
            // res.send(data);
            res.redirect('/send-loc')
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || 'Some error occured while creating an operation'
            })
        })
}

// retrieve and return all users/single user
exports.find = (req,res) => {
    if(req.query.id){
        
        const id = req.query.id;
        
        driverDB.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Driver was not found!"})
            } else{
                res.send(data);
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Error in retrieving driver"})
        })

    } else{
        driverDB.find()
        .then(driver=>{
            res.send(driver);
        })
        .catch(err=>{
            res.status(500).send({
                message :err.message||"Error occured while retriving driver"
            })
        })
    }

}

// update a new idenified user by user id
exports.update = (req,res) => {
    if(!req.body){
        req.status(400).send({message:"Data to update cannot be empty!"})
        return;
    };

    const id = req.params.id;

    driverDB.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:'Cannot find the driver!'})
        }else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({message: 'Error update user information'})
    })
}