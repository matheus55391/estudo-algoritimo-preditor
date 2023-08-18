import { accuracy } from "./Accuracys";
import { predictCalva } from "./Predictions";
import { IPerson } from "./interfaces/IPerson";
import { randomNumber } from "./utils/randomUtils";

// Constants
const NUM_PERSONS = 1000;
const TARGET_ACCURACY = 1;
const INITIAL_WEIGHT = randomNumber(1, 10000);

// Function to update weights
function updateWeights(personList: IPerson[], predict: (person: IPerson, weights: { age: number }) => boolean, weights: { age: number }) {
    for (const person of personList) {
        const prediction = predict(person, weights);

        if (prediction !== person.calvo) {
            weights.age += person.calvo ? -1 : 1;
        }
    }
}

// Function to find optimal weights
function findOptimalWeights(personList: IPerson[], predict: (person: IPerson, weights: { age: number }) => boolean, initialWeights: { age: number }) {
    let weights = { ...initialWeights };

    for (let i = 0; i < NUM_PERSONS; i++) {
        const accuracyResult = accuracy(personList, predict, weights);

        console.log(`Iteration ${i}: Accuracy: ${accuracyResult.toFixed(4)} - Weight: ${weights.age}`);
        
        if (accuracyResult === TARGET_ACCURACY) {
            console.log(`100% accuracy achieved in ${i} iterations, people are bald from age ${weights.age}`);
            break;
        }

        updateWeights(personList, predict, weights);
    }
}

// Function to generate a list of persons
function generatePersonList(numPersons: number, thresholdAge: number): IPerson[] {
    const personList: IPerson[] = [];

    for (let i = 0; i < numPersons; i++) {
        const age = randomNumber(1, 100);
        personList.push({ age, calvo: age >= thresholdAge });
    }

    return personList;
}

// Main function
function main() {
    // Constants
    const thresholdAge = 21;
    const personList = generatePersonList(NUM_PERSONS, thresholdAge);
    // Start the process
    findOptimalWeights(personList, predictCalva, { age: INITIAL_WEIGHT });
}

// Start the main process
main();

