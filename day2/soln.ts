import * as fs from "fs";
import path from "path";

async function solve() {

    // Read puzzle input
    const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
    const lines = input.split('\n');
    let sum = 0;
    for (let game = 0; game < lines.length; game++) {
        const minAmounts: { [key: string]: number } = {
            "red": 0,
            "green": 0,
            "blue": 0
        };
        const reveals = lines[game].replace(/ *\r*/g, '').split(':')[1].split(';');
        for (const reveal of reveals) {
            const values = reveal.split(',');
            for (const value of values) {
                const color = value.match(/[a-z]+/)![0];
                const count = parseInt(value.match(/\d+/)![0]);
                if (minAmounts[color] < count) {
                    minAmounts[color] = count;
                }
            }
        }
        let product = 1;
        for (const color in minAmounts) {
            product *= minAmounts[color];
        }
        sum += product;
    }

    console.log(sum);
}

solve();