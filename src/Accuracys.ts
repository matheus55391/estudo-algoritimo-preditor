import { IPerson } from "./interfaces/IPerson";

export function accuracy(personList: IPerson[], predit: (person: IPerson, pesos: { age: number }) => boolean, pesos: { age: number }): number {
    let hits = 0;
    for (const person of personList) {
        if (person.calvo === predit(person, pesos)) hits++;
    }
    return hits / personList.length;
}
