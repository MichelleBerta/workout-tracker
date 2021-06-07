const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel.js");

// create workout
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((workoutdb) => {
      res.json(workoutdb);
    })
    .catch((err) => {
      res.json(err);
    });
});

// update workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true, runValidators: true })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get all workouts add duration
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration',
            },
        },
    },
])
.then(workoutDB => {
    res.json(workoutDB);
})
.catch(err => {
    res.json(err);
});
});

router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration: {
                  $sum: '$exercises.duration',
              },
          },
      },
  ])
  .sort({ _id: -1 })
  .limit(7)
  .then(workoutDB => {
      console.log(workoutDB);
      res.json(workoutDB);
  })
  .catch(err => {
      res.json(err);
  });
});

router.delete('/api/workouts', ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
  .then(() => {
      res.json(true);
  })
  .catch(err => {
      res.json(err);
  });
});


module.exports = router;
