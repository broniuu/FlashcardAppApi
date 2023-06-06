import business from '../business/business.container';
import applicationException from "../service/applicationException";
import auth from "../middleware/auth";
const flashCardEndpoint = (router) => {
    router.get('/api/flashcards', async (request, response, next) => {
        try {
            let result = await business.getFlashcardManager().query();
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
    router.get('/api/flashcards/:id', async (request, response, next) => {
        try {
            let result = await business.getFlashcardManager().get(request.params.id);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
    router.post('/api/flashcards', auth, async (request, response, next) => {
        try {
            let result = await business.getFlashcardManager().createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
    router.put('/api/flashcards', auth, async (request, response, next) => {
        try {
            let result = await business.getFlashcardManager().createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/flashcards/:id', async (request, response, next) => {
        try {
            let result = await business.getFlashcardManager().remove(request.params.id);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
};
export default flashCardEndpoint;

