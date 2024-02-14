const fs = require('fs');
const { execSync } = require('child_process');

let inputFileName = "";
let outputFileName = "";

if (process.argv.length === 4) {
    inputFileName = process.argv[2];
    outputFileName = process.argv[3];
} else if (process.argv.length < 3) {
    inputFileName = __dirname + '/logs-insights-results.json'
    outputFileName = inputFileName.replace('.json', '_with_whois.json');
}

// Read input JSON file
fs.readFile(inputFileName, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading input file: ${err}`);
        process.exit(1);
    }

    console.log("working...")
    const keysWeWant = ["Organization", "OrgName", "CIDR", "NetRange"]
    try {
        const jsonArray = JSON.parse(data);
        const updatedArray = jsonArray.map(obj => {
            if (obj.remoteAddress) {
                const whoisInfo = execSync(`whois ${obj.remoteAddress}`).toString();
                let ipDetail = {}

                const arr = whoisInfo.split("\n")

                arr.forEach((item) => {
                    let parts = item.split(':');
                    if (parts.length === 2) {
                        if (keysWeWant.includes(parts[0])) {
                            ipDetail[parts[0]] = parts[1].trimStart().trimEnd();
                        }
                    }
                })
                return { ...obj, ipDetail };
            }
            return obj;
        });

        fs.writeFile(outputFileName, JSON.stringify(updatedArray, null, 2), err => {
            if (err) {
                console.error(`Error writing to output file: ${err}`);
                process.exit(1);
            }
            console.log(`Output written to ${outputFileName}`);
        });
    } catch (error) {
        console.error(`Error parsing JSON: ${error}`);
        process.exit(1);
    }
});
