import inquirer from 'inquirer';

const chosenNumbers: Array<number> = [1, 2, 4];
const randomNumbers: Array<number> = [1, 4, 15];

const randomNewNumber = (): number => {
	return Math.floor(Math.random() * (50 - 1)) + 1;
};

const validateRandomNumber = (number: number): boolean => {
	return !randomNumbers.includes(number) ? true : false;
};

const validateInput = (text: string): boolean => {
	const digitToNumber: number = parseInt(text);
	if (chosenNumbers.includes(digitToNumber)) {
		console.log('każda liczba może być użyta tylko 1 raz');
		return false;
	} else if (isNaN(digitToNumber)) {
		console.log('Podana wartość musi być liczbą!');
		return false;
	} else if (digitToNumber < 0 || digitToNumber > 50) {
		console.log('podaj liczbę z przedziału od 1 do 49');
		return false;
	}
	return true;
};

do {
	const number: number = randomNewNumber();
	if (validateRandomNumber(number)) {
		randomNumbers.push(number);
	}
} while (randomNumbers.length < 6);

const startApp = async (): Promise<void> => {
	do {
		const result = await inquirer.prompt([
			{
				name: 'number',
				type: 'input',
				message: 'Podaj liczbę...',
			},
		]);
		if (validateInput(result.number)) {
			chosenNumbers.push(parseInt(result.number));
		}
	} while (chosenNumbers.length < 6);
	const results = chosenNumbers.filter((element) =>
		randomNumbers.includes(element)
	);
	return console.log(
		`ilość odgadniętych liczb : ${results.length}, pasujące liczby to: ${results}`
	);
};
startApp();
