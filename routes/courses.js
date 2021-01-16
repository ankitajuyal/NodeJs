const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course2' },
    { id: 3, name: 'Course3' },
]
router.get('/', (rq, res) => {
    res.send([1, 2, 3])// 
});

router.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query)
});

router.get('/:id', (req, res) => {
    res.send(req.query)
});

router.post('/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        //400 bad request
        res.status(400).send('Name is required and min 3 chars')
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        //400 bad request
        res.status(400).send('Thje course doesnot exists!');
    }

    course.name = req.body.name;
    res.send(course);
});

function validate() {

}
router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        //400 bad request
        res.status(400).send('Thje course doesnot exists!');
    }

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});
module.exports = router;