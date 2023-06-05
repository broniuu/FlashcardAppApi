import userManager from './appUser.manager';
import flashcardManager from './flashcard.manager';

function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
    getUserManager: getter(userManager),
    getFlashcardManager: getter(flashcardManager)
};
