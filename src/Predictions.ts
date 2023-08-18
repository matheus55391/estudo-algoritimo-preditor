import { IPerson } from "./interfaces/IPerson";

export function predictCalva(person: IPerson, pesos: { age: number }): boolean {
    if (person.age >= pesos.age) return true;
    return false;
}
