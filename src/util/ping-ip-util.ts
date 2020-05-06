import ping = require("ping");

/** 
 * This is a utility class which pings many IP addresses and provides 
 * the result in the form of Map.
 * @author Debadatta Mishra
 */
export class IPPingUtil {

    /** 
     * Method to ping all IP addresses.
     * @param allIPs as an array of string
     * @returns a Map of IP address as key and ping status as value
     */
    public async pingManyIPAddress_Type1(allIPs: string[]): Promise<Map<string, boolean>> {
        const map: Map<string, boolean> = new Map();

        const cfg = {
            timeout: 20 // Timeout in seconds
        };

        const promises = allIPs.map(ip => {
            return ping.promise.probe(ip, cfg).then((data: any) => {
                const status = data.alive;
                map.set(ip, status);
            });
        });

        await Promise.all(promises);

        return map;
    }

    /**
     * 
     * @param {string[]} allIPs
     * @returns {Promise<Map<string, boolean>>}
     * @memberof IPPingUtil
     */
    public async pingManyIPAddress_Type2(allIPs: string[]): Promise<Map<string, boolean>> {
        const map: Map<string, boolean> = new Map();

        const cfg = {
            timeout: 20 // Timeout in seconds
        };

        const promiseCalls = (host: any) => {
            return new Promise((resolve, reject) => {
                ping.sys.probe(host, (isAlive: any) => {
                    map.set(host, isAlive);
                    resolve(map);
                }, cfg);
            })
        }

        const promises = allIPs.map((host) => {
            return promiseCalls(host);
        });

        await Promise.all(promises);

        return map;
    }

    /**
     *
     *
     * @param {string[]} allIPs
     * @returns {Promise<any[]>}
     * @memberof IPPingUtil
     */
    public async pingManyIPAddress_Type3(allIPs: string[]): Promise<any[]> {
        const map: Map<string, boolean> = new Map();

        const ipResponse = {
            ip: "ip address",
            value: false
        };

        const ipResponses: any[] = [];

        const cfg = {
            timeout: 20 // Timeout in seconds
        };

        const promiseCalls = (host: any) => {
            return new Promise((resolve, reject) => {
                ping.sys.probe(host, (isAlive: any) => {
                    ipResponse.ip = host;
                    ipResponse.value = isAlive;
                    ipResponses.push(ipResponse);
                    resolve(ipResponses);
                }, cfg);
            })
        }

        const promises = allIPs.map((host) => {
            return promiseCalls(host);
        });

        await Promise.all(promises);

        return ipResponses;
    }
}