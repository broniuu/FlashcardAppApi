import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";

const flashcardSchema = new mongoose.Schema({
    frontText: {type: String},
    backText: {type: String},
    image: {type: String},
    description: {type: String}
}, {
    collection: 'flashcard'
});
flashcardSchema.plugin(uniqueValidator);
const flashcardModel = mongoose.model('post', flashcardSchema);

async function query() {
    const result = await flashcardModel.find({});
    {
        if (result) {
            return mongoConverter(result);
        }
    }
}

async function get(id) {
    return flashcardModel.findOne({_id: id}).then(function (result) {
        if (result) {
            return mongoConverter(result);
        }
    });
}

async function createNewOrUpdate(data) {
    return Promise.resolve().then(() => {
        if (!data.id) {
            return new flashcardModel(data).save().then(result => {
                if (result[0]) {
                    return mongoConverter(result[0]);
                }
            });
        } else {
            return flashcardModel.findByIdAndUpdate(data.id, _.omit(data, 'id'), {new: true});
        }
    });
}

export default {
    query: query,
    get: get,
    createNewOrUpdate: createNewOrUpdate,

    model: flashcardModel
};
