import mongoose from 'mongoose'

mongoose.Schema.Types.String.set('Validate', {
    validator: (valor) => valor !== "",
    message: 'Um campo em branco foi fornecido'
})
