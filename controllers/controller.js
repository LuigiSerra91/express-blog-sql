const employees = require('../data/data.js')
const connection = require('../data/connection.js')
const fs = require('fs');


const index = (req, res) => {

  
  const sql = 'SELECT * FROM posts'
  
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const responseData = {
      data: results,
      counter: results.length
    }

    res.status(200).json(responseData);
  })
}
function show(req, res) {
  const id = req.params.id
  console.log(id);
  

  const sql = 'SELECT * FROM posts WHERE id=?';
  connection.query(sql, [id], (err, results) =>{
    if (err) return res.status(500).json({ error: 'Database query failed'});
    if (results.length === 0) return res.status(404).json({ error: 'Post not found'});
    res.json(results[0])
    console.log(results);
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

  console.log(req.params);


  //1. take the resource id from the request
  const id = req.params.id


  const sql = 'DELETE FROM posts WHERE id=?'

  
  connection.query(sql, [id], (err, results) => {
    console.log(err, results);
    if (err) return res.status(500).json({ error: err })
    
    if (results.affectedRows === 0) return res.status(404).json({ error: `404! No post found with the this id: ${id}` })

    return res.json({ status: 204, affectedRows: results.affectedRows })

  })
}
module.exports = {
  index,
  store,
  show,
  update,
  destroy
}