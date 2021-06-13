import Assamble from "../models/assamble"

exports.newAssamble = async(req,res) => {
    const name = req.body.name

    Assamble.create({
        name: name
    })
    .then(result =>{
        console.log(result)
        res.status(201).json({ new: "newbranch"})
    })
    .catch(err =>{
        console.log("error"+err)
        res.status(400).json({ new: err})
    })
}
