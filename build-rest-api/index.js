const express = require('express');
const app = express();
port = 8000;

// Middleware to parse JSON
app.use(express.json()); //Built In

// Students Data
const students = [
  {id: 1, name: "Mohammed", note: 20},
  {id: 2, name: "Karim", note: 15},
  {id: 3, name: "Chaimae", note: 18},
  {id: 4, name: "Sara", note: 11},
  {id: 5, name: "Nouh", note: 19},
  {id: 6, name: "Houd", note: 17},
  {id: 7, name: "Oumaima", note: 13}
]

// Get All Students
app.get('/', (req, res) => {
  res.send(students)
})

// Get One Student By ID
app.get('/:studentId', (req, res) => {
  const {studentId} = req.params;
  const foundStudent = students.find((item) => item.id === Number(studentId))
  if(foundStudent) {
    // res.send(foundStudent)
    res.status(200).json({
      message : "Found Student !",
      data : foundStudent
    })
  } else {
    // const foundStudent = students.find((item) => item.id === Number(studentId))
    res.status(500).json({
      message : `Student with ID ${studentId} not found`
    })
  }
})

// Delete One Student By ID
app.delete('/:studentId', (req, res) => {
  // Check Student if exist
  const {studentId} = req.params;
  const foundStudent = students.find((item) => item.id === Number(studentId));
  if(!foundStudent) {
    res.status(500).json({
      message : `Student with ID ${studentId} not found`
    })
  } else {
    const newStudentData = students.filter((item) => item.id !== Number(studentId));
    if(newStudentData){
      res.status(200).json({
        data : newStudentData
      })
    }
  }
});

// Crate Student
app.post('/create', (req, res) => {
  let {newStudent} = req.body;
  newStudent = {
    id: students.length + 1,
    ...newStudent
  }
  students.push(newStudent);
  res.status(200).json({
    students
  });
});


// Update Student By ID
app.put('/update/:studentId', (req, res) => {
  let {studentId} = req.params;
  if(studentId) {
    let foundStudent = students.find((item) => item.id === Number(studentId));
    const index = students.indexOf(foundStudent);
    students[index] = {
      ...foundStudent,
      note : foundStudent.note + 1
    }
    res.json({
      updatedStudents : students,
      newUpdatedItem : students[index]
    })
  }
})


app.listen(port, () => {
  console.log('Connection with success');
})