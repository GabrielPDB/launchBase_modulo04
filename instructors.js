const fs = require('fs')
const data = require('./data.json')
const { age } = require('./utils')

// show
exports.show = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send('Instructor not found!')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    return res.render('instructors/show', { instructor })
}

// create
exports.post = function (req, res) {
    // Estratégia de validação de preenchimento de todos os campos
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please fill all fields!')
        }
    }

    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(birth) // Transforma uma data em milissegundos
    const created_at = Date.now() // Pega o tempo atual
    const id = Number(data.instructors.length + 1) // Força que isso retorne um número


    // Adiciona o req.body no array data lá do JSON
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    // Escreve o arquivo, passando o conteúdo de data, com 4 espaços
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/instructors')
    })

    /* return res.send(req.body) */
}

exports.edit = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send('Instructor not found!')

    return res.render('instructors/edit', { instructor: foundInstructor })
}