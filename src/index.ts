#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

type colorType = 'brown' | 'yellow' | 'green' | 'vanilla' | 'red';

const colorText = (color: colorType, text: string): string => {
    if (color === 'brown') return chalk.rgb(205, 127, 50)(text);
    else if (color === 'yellow') return chalk.rgb(181, 166, 66)(text);
    else if (color === 'green') return chalk.rgb(158, 253, 56)(text);
    else if (color === 'vanilla') return chalk.rgb(160, 82, 45)(text);
    else if (color === 'red') return chalk.rgb(168, 28, 7)(text);
    return text;
};

const sleep = () => new Promise((res) => setTimeout(res, 2000));

const validateNumber = (input: number): string | boolean => {
    if (typeof input !== 'number' || isNaN(input)) return colorText('red', `☠️☠️ Please enter a valid number!`);
    else return true;
};

const welcomePrompt = async () => {
    let calculatorTitle = chalkAnimation.rainbow('Welcome! Lets start Calculation');
    await sleep();
    calculatorTitle.stop();
    console.log(
        colorText(
            'yellow',
            `     _____________________
    |  _________________  |
    | | JO           0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|
    `,
        ),
    );
};

const calculatorQuestions = async () => {
    const questions = [
        {
            type: 'list',
            name: 'operator',
            message: colorText('yellow', '\nWhich operation would you like to perform \n'),
            choices: ['+ Addition', '- Subtraction', '* Multiplication', '/ Division'],
        },
        {
            type: 'number',
            name: 'num1',
            message: colorText('vanilla', 'Enter the first number:'),
            validate: (input: number) => validateNumber(input),
        },
        {
            type: 'number',
            name: 'num2',
            message: colorText('vanilla', 'Enter the second number:'),
            validate: (input: number) => validateNumber(input),
        },
    ];
    await inquirer.prompt(questions).then((ans) => {
        if (ans.operator == '+ Addition') {
            console.log(colorText('green', `${ans.num1} + ${ans.num2} = ${ans.num1 + ans.num2}`));
        } else if (ans.operator == '- Subtraction') {
            console.log(colorText('green', `${ans.num1} - ${ans.num2} = ${ans.num1 - ans.num2}`));
        } else if (ans.operator == '* Multiplication') {
            console.log(colorText('green', `${ans.num1} * ${ans.num2} = ${ans.num1 * ans.num2}`));
        } else if (ans.operator == '/ Division') {
            console.log(colorText('green', `${ans.num1} / ${ans.num2} = ${ans.num1 / ans.num2}`));
        }
    });
};

const calculator = async () => {
    await welcomePrompt();
    try {
        do {
            await calculatorQuestions();
            var again = await inquirer.prompt({
                type: 'input',
                name: 'restart',
                message: colorText('yellow', '\nDo you wish to continue? Press y or n: '),
            });
        } while (again.restart == 'y' || again.restart == 'Y' || again.restart == 'yes' || again.restart == 'YES');
    } catch (err) {
        console.log(colorText('red', err?.message || ''));
    }
};

calculator();

