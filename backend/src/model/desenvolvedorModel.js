import moongose from 'mongoose';
import paginate from 'mongoose-paginate-v2'

const DesenvolvedorSchema = new moongose.Schema({
    nivel_id: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'nivel',
    },
    nome: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    hobby: {
        type: String,
    },

},
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
    }
);

DesenvolvedorSchema.plugin(paginate);

const DesenvolvedorModel = moongose.model('desenvolvedor', DesenvolvedorSchema);

export default DesenvolvedorModel;
