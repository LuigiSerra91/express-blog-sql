const employees = require('../data/data.js')
const connection = require('../data/connection.js')
const fs = require('fs')
function index(req,res) {
  const sql = 'SELECT * FROM posts';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed'});
    res.json(results)
  })
}

function show(req, res) {
  const id = req.params.id

  const sql = 'SELECT * FROM posts WHERE id= ?';
  connection.query(sql, [id], (err, results) =>{
    if (err) return res.status(500).json({ error: 'Database query failed'});
    if (results.length === 0) return res.status(404).json({ error: 'Post not found'});
    res.json(results[0])
  })
}


const store = (req, res) => {
  const employe = {
    id: employees[employees.length - 1].id + 1,
    title: req.body.title,
    author: req.body.author,
    img: req.body.img,
    description: req.body.description


  }
  employees.push(employe)
  fs.writeFileSync('./data/data.js', `module.exports=${JSON.stringify(employees, null, 2)}`)
  res.json({
    data: employees
  })
}

const update = (req, res) => {
  const employe = employees.findIndex(employe => employe.id === Number(req.params.id))

  if (!employe) {
    return res.status(404).json({
      error: '404! not found'
    })
  }
  employees[employe] = {
    ...employees[employe],
    title: req.body.title,
    author: req.body.author,
    img: req.body.img,
    description: req.body.description
  }


  fs.writeFileSync('./data/data.js', `module.exports=${JSON.stringify(employees, null, 2)}`)


  return res.status(200).json({
    status: 200,
    data: employees[employe]
  })


}

const destroy = (req, res) => {
  // find the post by id
  const employe = employees.find(employe => employe.id === parseInt(req.params.id));

  // check if the user is deleting the correct post
  if (!employe) {
    return res.status(404).json({ error: "No post found whit this id" })
  }

  // remove the post from the menu
  const newemploye = employees.filter((employees) => employees.id !== parseInt(req.params.id));

  // update the js file
  fs.writeFileSync('./data/data.js', `module.exports = ${JSON.stringify(newemploye, null, 4)}`)

  // return the updated menu item
  res.status(200).json({
    status: 200,
    data: newemploye,
    counter: newemploye.length
  })

}

module.exports = {
  index,
  store,
  show,
  update,
  destroy
}