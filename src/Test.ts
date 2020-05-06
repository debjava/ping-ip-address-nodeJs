import now from "performance-now";
import { FileUtil } from "./util/file-util";
import { IPPingUtil } from "./util/ping-ip-util";

export class Test {
    
    public static readonly FILENAMEPATH: string = "testData/ipaddress-3.txt";

    public async pingAllIPs_Type1(): Promise<void> {
        const start = now();
        const fileUtil = new FileUtil();
        const allIPs: string[] = await fileUtil.readFileLineByLineNonBlocking(Test.FILENAMEPATH);

        const pingUtil = new IPPingUtil();
        const map: Map<string, boolean> = await pingUtil.pingManyIPAddress_Type1(allIPs);
        
//        if(allIPs.length !== map.size) throw Error("Unexpected error ...");

        for (const [key, value] of map.entries()) {
            console.log(key + ' : ' + value)
        }

        //        map.forEach(function(value, key) {
        //            console.log(key + ' = ' + value)
        //        });
        
        console.log("Total IPs to Ping: ", allIPs.length);
        console.log("Total IPs Pinged: ", map.size);

        const end = now();
        const timeInSeconds = (end - start)/ 1000;
        console.log("Total time taken : ", timeInSeconds, "seconds");
        
    }
    
 
    public async pingAllIPs_Type2(): Promise<void> {
        const start = now();
        const fileUtil = new FileUtil();
        const allIPs: string[] = await fileUtil.readFileLineByLineNonBlocking(Test.FILENAMEPATH);
        const pingUtil = new IPPingUtil();
        const map: Map<string, boolean> = await pingUtil.pingManyIPAddress_Type2(allIPs);
//        if(allIPs.length !== map.size) throw Error("Unexpected error ...");
        
        let keys: string[] = [];
        for (const [key, value] of map.entries()) {
            console.log(key + ' : ' + value)
            keys.push(key);
        }
        
        console.log("Total IPs to Ping: ", allIPs.length);
        console.log("Total IPs Pinged: ", map.size);

        const differnce = allIPs.filter(x => keys.indexOf(x) === -1);
        console.log("Difference: ", differnce);
        
        const end = now();
        const timeInSeconds = (end - start)/ 1000;
        console.log("Total time taken : ", timeInSeconds, "seconds");
    }

    public async pingAllIPs_Type3(): Promise<void> {
        const start = now();
        const fileUtil = new FileUtil();
        const allIPs: string[] = await fileUtil.readFileLineByLineNonBlocking(Test.FILENAMEPATH);
        const pingUtil = new IPPingUtil();
        const ipRess: any[] = await pingUtil.pingManyIPAddress_Type3(allIPs);

        ipRess.forEach( ipRes => {
            console.log(ipRes.ip, " : ", ipRes.value);
        });

        // const map: Map<string, boolean> = await pingUtil.pingManyIPAddress_Type3(allIPs);
//        if(allIPs.length !== map.size) throw Error("Unexpected error ...");
        
        // let keys: string[] = [];
        // for (const [key, value] of map.entries()) {
        //     console.log(key + ' : ' + value)
        //     keys.push(key);
        // }
        
        console.log("Total IPs to Ping: ", allIPs.length);
        console.log("Total IPs Pinged: ", ipRess.length);
        
        const end = now();
        const timeInSeconds = (end - start)/ 1000;
        console.log("Total time taken : ", timeInSeconds, "seconds");
    }

}

const test = new Test();
// test.pingAllIPs_Type1();
// test.pingAllIPs_Type2();
test.pingAllIPs_Type3();

