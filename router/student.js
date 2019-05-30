const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/studentModel');

// ------------------------------get request -------------------------------------
router.get('/',(req,res,next)=>{
    Student.find()
    .exec()
    .then(result =>{
        res.status(200).json(result);
    });
   
});

// ----------------------------individual get request ---------------------------

router.get('/:studentId',(req,res,next)=>{
    id = req.params.studentId;
    Student.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
    });
});

//...........................................post request ...................................
router.post('/',(req,res,next)=>{
    const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        branch:req.body.branch,
        registrationNo:req.body.registrationNo
    });
    student
    .save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message : 'added new student successfully',
            createdStudent : student
        });

    })
    .catch(err =>{
        console.log(err)
    })


    console.log(student);
    
});

// ......................update request----------------------------------------------
router.patch('/:studentId',(req,res,next)=>{
    id = req.params.studentId;
    const updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    Student.update({_id:id},{$set:updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
    });

});


// -----------------------------delete request ---------------------------------------
router.delete('/:studentId',(req,res,next)=>{
    id = req.params.studentId;
    Student.remove({_id : id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
    });


});

module.exports = router;