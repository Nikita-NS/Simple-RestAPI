const express = require("express");
const bodyParser = require("body-Parser");

let students = [
  {
    id: 1,
    firstName: "Ivan",
    lastName: "Ivanov",
    group: "VIS21",
    createdAt: "2020-03-02T12:41:09.533Z", // дата создания
    updatedAt: "2020-03-02T12:45:02.121Z" // дата редактирования
  }
];

const app = express();

app.use(bodyParser.json());

app.get("/students", (req, res) => {
  res.statusCode = 200;
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.StatusCode = 400;
    res.end("Student Not Found");
    return;
  }
  const student = students.find(s => s.id === parseInt(id));

  if (!student) {
    res.statusCode = 400;
    res.end("Student Not Found");
    return;
  }
  res.statusCode = 200;
  res.json(students);
});
app.post("/students", (req, res) => {
  const { student } = req.body;

  const studentDocument = {
    ...student,
    id: students.length + 1,
    createAt: new Date().toISOString()
  };

  students.push(studentDocument);

  res.statusCode = 200;
  res.json(studentDocument);
});

app.put('/students/:id',(req,res)=> {
  const{id} = req.params;
  const{student}=req.body;

  const targetStudent = students.find(s=>s.id===parseInt(id));
  if (!targetStudent){
    res.statusCode=400;
    res.end('Student Not Found');
    return;
  }
const updatedStudent = {
  ...targetStudent,
  ...student,
  updateAt: (new Date().toISOString())
} 

students = student.map(s=>s.id === parseInt(id) ? updatedStudent : s );

res.statusCode=200;
res.json(updatedStudent);
});

app.delete('/student/:id',(req,res)=>{
const {id} = req.params;

const targetStudent=students.find(s=>s.id === parseInt(id));

if (!targetstudent) {
  res.statusCode=400;
  res.end('Student not Found');
  return;
}
student = student.filter(s=>s.id!==parseInt(id));

res.statusCode=200;
res.json(targetStudent);
})


app.listen(3000, () => console.log("App started at 3000"));
