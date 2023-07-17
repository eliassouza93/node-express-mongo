import mongoose from 'mongoose'

mongoose.Schema.Types.String.set('Validate', {
    validator: (valor) => valor !== "",
    message: ({ path }) => 'o campo ' + path + 'foi fornecido em branco'
})
