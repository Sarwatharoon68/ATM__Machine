#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//  initializing bank balance and pin code..
let myBalance = 30000;
let myPin = 1234;
// print welcome message..
console.log(chalk.blueBright.bgYellowBright("\n\tWelcome to TALHA HAROON, ATM MACHINE!\n\t"));
// prompt pin 
let pinAnswers = await inquirer.prompt([
    {
        name: "pinCode",
        type: "number",
        message: chalk.blueBright(" please Enter your 4 digit pin code:  "),
    },
]);
if (pinAnswers.pinCode != myPin) {
    console.log(chalk.blackBright.bgRedBright("\n\tpin is incorrect, try again!\n\t"));
}
else if (pinAnswers.pinCode === myPin) {
    console.log(chalk.bgGreenBright("\n\tpin is correct, login succesfully!\n\t"));
    // promt operation perform..
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.magentaBright(" please select your operation: "),
            choices: ["Withdraw", "Check Balance"]
        },
    ]);
    if (operationAns.operation === "Withdraw") {
        let withDrawAns = await inquirer.prompt([
            {
                name: "withdrawAmount",
                type: "list",
                message: chalk.cyanBright("please select a withdraw method: "),
                choices: ["Fast cash", "Enter amount"]
            },
        ]);
        if (withDrawAns.withdrawAmount === "Fast cash") {
            let fastCash = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: chalk.greenBright("please select your amount: "),
                    choices: [5000, 10000, 20000, 30000, 40000, 50000]
                },
            ]);
            if (fastCash.fastcash > myBalance) {
                console.log(chalk.blackBright.bgRedBright("your balance is insufficient: "));
            }
            else {
                myBalance -= fastCash.fastcash;
                console.log(chalk.greenBright(`${fastCash.fastcash} $,withdraw successfully: `));
                console.log(chalk.blue(`your  remaining balance is:  ${myBalance} $`));
                console.log(chalk.bgGreenBright("\n\tThanks for avail our atm service!\n\t"));
            }
        }
        else if (withDrawAns.withdrawAmount === "Enter amount") {
            let myAmount = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.greenBright("please select your amount: "),
                },
            ]);
            if (myAmount.amount > myBalance) {
                console.log(chalk.blackBright.bgRedBright("your balance is insufficient: "));
            }
            else {
                myBalance -= myAmount.amount;
                console.log(chalk.greenBright(`${myAmount.amount} $,withdraw successfully: `));
                console.log(chalk.blue(`your  remaining balance is:  ${myBalance} $`));
                console.log(chalk.bgGreenBright("\n\tThanks for avail our atm service!\n\t"));
            }
        }
    }
}
