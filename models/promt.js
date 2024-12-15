import {model, models, Schema} from "mongoose";



const PromtSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    promt: {
        type: String, required: [true, 'Promt is required'],
    },
    tag: {
        type: String, required: [true, 'Tag is required'],
    }
})

const Promt = models.Promt ||  model("Promt", PromtSchema);

export default Promt;