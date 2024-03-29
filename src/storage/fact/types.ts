interface Fact {
    id: number,
    title: string,
    content: string,
    owner_id: number
}

type CreateFact = Omit<Fact, 'id'>;

export {
    Fact,
    CreateFact
};
