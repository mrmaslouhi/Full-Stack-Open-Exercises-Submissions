const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('enter correct arguments')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://bleppelb8:${password}@cluster0.mptn2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(p => {
            console.log(p.name, p.number)
        })
        mongoose.connection.close()
    })
    return
}

const person = new Person({
    name,
    number,
    important: true,
})

person.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`)
})

Person.find({}).then(result => {
    result.forEach(p => {
        console.log(p)
    })
    mongoose.connection.close()
})