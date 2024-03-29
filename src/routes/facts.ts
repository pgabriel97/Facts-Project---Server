import { Request, Response, Router } from "express";
import { FactDAO } from '../storage/fact/factDAO';

const router = Router();

/* Initialize the DAO to be used for Fact operations. */
const factDAO = new FactDAO();

/**
 * Create operation route.
 */
router.post('/', async (request: Request, response: Response) => {
    const { title, content, owner_id } = request.body;
    const newFactId = await factDAO.create({
        title, content, owner_id
    });

    /* Something went wrong during the insertion. */
    if (!newFactId) {
        return response.status(500).send('Fact could not be created!');
    }

    /* Return full information to the client after creating the fact. */
    const newFact = await factDAO.readById(newFactId);
    return response.status(200).send(newFact);
});

/**
 * Read operation route.
 */
router.get('/', async (request: Request, response: Response) => {
    const facts = await factDAO.read();
    return response.status(200).send(facts);
});

/**
 * Read by ID operation route.
 */
router.get("/:id", async (request: Request, response: Response) => {
  const foundFact = await factDAO.readById(parseInt(request.params.id));

  if (!foundFact) {
      return response.status(404).send('Not found');
  }

  return response.status(200).send(foundFact);
});

/**
 * Delete by ID operation route.
 */
router.delete("/:id", async (request: Request, response: Response) => {
    const isDeleted = await factDAO.deleteById(parseInt(request.params.id));

    if (!isDeleted) {
        return response.sendStatus(500);
    }

    return response.sendStatus(204);
});

export {
    router
};
