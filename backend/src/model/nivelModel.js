import  moongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2'

const NivelSchema = new moongoose.Schema({
    nivel: {
        type: String,
        required: true
    }
},
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
    }
);

NivelSchema.plugin(paginate);

const NivelModel = moongoose.model('nivel', NivelSchema);

export default NivelModel;