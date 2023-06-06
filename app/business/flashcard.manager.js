import flashcardDAO from '../DAO/flashcardDAO';

function create(context) {
    async function query() {
        let result = flashcardDAO.query();
        if (result) {
            return result;
        }
    }

    async function get(id) {
        let result = await flashcardDAO.get(id);
        if (result) {
            return result;
        }
    }

    async function createNewOrUpdate(data) {
        let result = await flashcardDAO.createNewOrUpdate(data);
        if (result) {
            return result;
        }
    }

    async function remove(id) {
        let result = await flashcardDAO.remove(id);
        if(result) {
            return result;
        }
    }
    return {
        query: query,
        get: get,
        createNewOrUpdate: createNewOrUpdate,
        remove: remove
    };
}

export default {
    create: create
};
