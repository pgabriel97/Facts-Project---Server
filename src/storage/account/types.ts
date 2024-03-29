interface Account {
    id: number,
    username: string,
    password: string
}

type CreateAccount = Omit<Account, 'id'>;

interface FilterByUsername {
    filterBy: 'username',
    filterValue: string
}

type AccountFilter = FilterByUsername;

export {
    Account,
    CreateAccount,
    AccountFilter
};
