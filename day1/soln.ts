import * as fs from "fs";
import path from "path";

const textNums = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

async function solve() {

    // Read puzzle input
    const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
    const lines = input.split('\n');

    // Solve puzzle
    let sum = 0;
    for(const line of lines) {
        const first = findInt(line, false);
        const last = findInt(line, true);
        // console.log(`${line}   ${first}${last}`);
        sum += Number.parseInt(`${first}${last}`);
    }
    console.log(sum);
}

function findInt(line: string, reverseCheck: boolean): string {
    for (let i = 0; i < line.length; i++) {
        const index = reverseCheck ? line.length - 1 - i : i;
        // check for simple int
        if (Number.parseInt(line[index])) {
            return line[index];
        }
        // check for string int
        for (let j = 0; j < textNums.length; j++) {
            const textNum = textNums[j];
            for (let k = 0; k < textNum.length && (!reverseCheck || index-k >= 0); k++) {
                const textNumsIndex = reverseCheck ? textNum.length - 1 - k : k;
                const lineIndex = reverseCheck ? index - k : index + k;
                if (textNum[textNumsIndex] != line[lineIndex]) {
                    break;
                }
                else if (k == textNum.length - 1) {
                    return `${j + 1}`;
                } 
            }
        }
    }
    return '0';
}


solve();