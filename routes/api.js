
const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel.js")

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
      .then((workoutdb) => {
        res.json(workoutdb);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  router.get("/api/workouts", (req, res) => {
    Workout.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    });
  });

  router.put("/api/workouts/:id", (req, res) => {
    Workout.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    });
  });

// make this one find by id and update
//   router.put("/api/workouts/:id", (req, res) => {
//     Workout.findByIdAndUpdate({}, (error, data) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.json(data);
//       }
//     });
//   });

//from Stackoverflow
//Model.findByIdAndUpdate(id, updateObj, {new: true}, function(err, model)


// from jon
router.put('/api/workouts/:id', ({body, params}, res) => {
Workout.findByIdAndUpdate(
    params.id,
    {$push: {exercise: body } },
    {new: true, runValidators: true }
)
.then((dbWorkout) =>{
    res.json(dbWorkout);
})
.catch((err) => {
    res.json(err);
  });
})

module.exports = router