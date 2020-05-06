import * as fs from "fs";
import readline from "readline";

/** This is utility class which provides file reading in blocking and non-blocking mode.
  * @author Debadatta Mishra
*/
export class FileUtil {

    /** 
      * Function to read the file in blocking mode
     */
    public readFileLineByLineBlocking(fileNamePath: string): string[] {
        let lines: string[] = [];

        try {
            const data = fs.readFileSync(fileNamePath, 'UTF-8');
            lines = data.split(/\r?\n/);
        } catch (err) {
            console.log("Unexpected error while reading file ...", err)
        }

        return lines;
    }

    /** 
      * Function to read the file in non-blocking mode
     */
    public async readFileLineByLineNonBlocking(fileNamePath: string): Promise<any> {
        let allLines: string[] = [];

        const readLines = readline.createInterface({
            input: fs.createReadStream(fileNamePath),
            output: process.stdout,
            terminal: false
        });

        for await (const line of readLines) {
            allLines.push(line);
        }

        return allLines;
    }
}