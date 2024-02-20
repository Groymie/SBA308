// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      },
    ],
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  function getLearnerData(course, ag, submissions) {
    const results = [];
    let learners = new Set();

    for (let i = 0; i < submissions.length; i++) {
      learners.add(submissions[i].learner_id)
    }

    function weightedGrades(course_assignments, student_submissions) {
      const acquired_points_object = {};
      const possible_points_object = {};
      for (let i = 0; i < student_submissions.length; i++) {
        let submission_date = student_submissions[i].submission.submitted_at;
        let due_date = course_assignments.assignments[(student_submissions[i].assignment_id) - 1].due_at;
        if (submission_date > due_date) {
          if (!acquired_points_object.hasOwnProperty(student_submissions[i].learner_id)) {
            acquired_points_object[student_submissions[i].learner_id] = student_submissions[i].submission.score - 10
          } else {
            acquired_points_object[student_submissions[i].learner_id] += student_submissions[i].submission.score - 10
          }
        } else {
          if (!acquired_points_object.hasOwnProperty(student_submissions[i].learner_id)) {
            acquired_points_object[student_submissions[i].learner_id] = student_submissions[i].submission.score;
          } else {
            acquired_points_object[student_submissions[i].learner_id] += student_submissions[i].submission.score;
          }
        }
        possible_points_object[student_submissions[i].learner_id] += course_assignments.assignments[(student_submissions[i].assignment_id) - 1].points_possible;
      } 
      const grades_object = {};
      for (student in acquired_points_object) {
        grades_object[student] = acquired_points_object[student] / possible_points_object[student]
      }
      console.log("here is the grades object ", grades_object)
      return grades_object
    }

    for (learner of learners) {
      let student_object = {}
      let average_grade = weightedGrades(ag, submissions).learner
      // console.log("the average grade is ", average_grade)
      student_object.id = learner
      student_object.avg = average_grade
      for (let i = 0; i < submissions.length; i++) {
        if (submissions[i].learner_id === learner) {
          student_object[submissions[i].assignment_id] = submissions[i].submission.score
        }
      }
      results.push(student_object)
    }
    return results
  }  
  //   const example_result = [
  //     {
  //       id: 125,
  //       avg: 0.985, // (47 + 150) / (50 + 150)
  //       1: 0.94, // 47 / 50
  //       2: 1.0, // 150 / 150
  //     },
  //     {
  //       id: 132,
  //       avg: 0.82, // (39 + 125) / (50 + 150)
  //       1: 0.78, // 39 / 50
  //       2: 0.833, // late: (140 - 15) / 150
  //     },
  //   ];
  
  //   // Parse submission data.
  //   console.log(`Submission Data:`, submissions );
  //   // Check to see if the submission was late; if so, deduct 10% of the maximum possible points.
  //   // Find existing data for this learner, if any.
  //   // If the learner already has data, add the new score to the existing data.
  //   // Calculate the average score for each learner and remove the extra data.
  
  //   //==== PUT CODE HERE =====//
  //   return results;
  // }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);