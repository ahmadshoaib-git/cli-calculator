#!/usr/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { sleep, colorText, validateNumber, ColorType } from './utils.js';

const welcomePrompt = async () => {
    let calculatorTitle = chalkAnimation.rainbow('Welcome! Lets start Calculation');
    await sleep();
    calculatorTitle.stop();
    console.log(
        colorText(
            ColorType.YELLOW,
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
            message: colorText(ColorType.YELLOW, '\nWhich operation would you like to perform \n'),
            choices: ['+ Addition', '- Subtraction', '* Multiplication', '/ Division'],
        },
        {
            type: 'number',
            name: 'num1',
            message: colorText(ColorType.ORANGE, 'Enter the first number:'),
            validate: (input: number) => validateNumber(input),
        },
        {
            type: 'number',
            name: 'num2',
            message: colorText(ColorType.ORANGE, 'Enter the second number:'),
            validate: (input: number) => validateNumber(input),
        },
    ];
    await inquirer.prompt(questions).then((ans) => {
        if (ans.operator == '+ Addition') console.log(colorText(ColorType.GREEN, `${ans.num1} + ${ans.num2} = ${ans.num1 + ans.num2}`));
        else if (ans.operator == '- Subtraction') console.log(colorText(ColorType.GREEN, `${ans.num1} - ${ans.num2} = ${ans.num1 - ans.num2}`));
        else if (ans.operator == '* Multiplication') console.log(colorText(ColorType.GREEN, `${ans.num1} * ${ans.num2} = ${ans.num1 * ans.num2}`));
        else if (ans.operator == '/ Division') console.log(colorText(ColorType.GREEN, `${ans.num1} / ${ans.num2} = ${ans.num1 / ans.num2}`));
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
                message: colorText(ColorType.YELLOW, '\nDo you wish to continue? Press y or n: '),
            });
        } while (again.restart == 'y' || again.restart == 'Y' || again.restart == 'yes' || again.restart == 'YES');
    } catch (err) {
        console.log(colorText(ColorType.RED, err?.message || ''));
    }
};

calculator();

