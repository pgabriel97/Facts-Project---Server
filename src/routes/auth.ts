import { Request, Response, Router } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { AccountDAO } from '../storage/account/accountDAO';

const router = Router();

/* Initialize the DAO to be used for Account operations. */
const accountDAO = new AccountDAO();

/**
 * Register operation route.
 */
router.post('/register', async (request: Request, response: Response) => {
    const { username, password } = request.body;

    /* Check that the username is not already taken. */
    const isDuplicatedUsername = await accountDAO.exists({
        filterBy: 'username',
        filterValue: username
    });

    if (isDuplicatedUsername) {
        return response.status(400).send('Duplicated username');
    }

    /* Hash the password before storing it. */
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    /* Something went wrong during the insertion. */
    const newAccountId = await accountDAO.create({ username, password: hashedPassword });
    if (!newAccountId) {
        return response.status(500).send('Account could not be created!');
    }

    /* Return full information to the client after creating the account. */
    const newAccount = await accountDAO.readById(newAccountId);
    return response.status(200).send(newAccount);
});

/**
 * Login operation route.
 */
router.post('/login', async (request: Request, response: Response) => {
    const { username, password } = request.body;

    /* Check that the username corresponds to an existing account. */
    const accountData = await accountDAO.read({
        filterBy: 'username',
        filterValue: username
    });

    if (!accountData) {
        return response.status(401).send('Invalid credentials');
    }

    const isPasswordCorrect = await compare(password, accountData[0].password);
    if (!isPasswordCorrect) {
        return response.status(401).send('Invalid credentials');
    }

    return response.sendStatus(204);
});

export {
    router
};
