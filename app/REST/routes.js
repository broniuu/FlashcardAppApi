import appUserEndpoint from './appUser.endpoint';
import flashCardEndpoint from "./flashcard.endpoint";

const routes = function (router) {
    appUserEndpoint(router);
    flashCardEndpoint (router);
};

export default routes;
