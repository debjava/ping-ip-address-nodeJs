import { IPPingUtil } from "./../util/ping-ip-util";

const pingUtil = new IPPingUtil();

test('should ping IP addresses', async () => {
    jest.setTimeout(30000);
    const someIps: string[] = ["108.228.87.38","24.245.32.56","102.107.133.124"];
    let map: Map<string, boolean> = await pingUtil.pingManyIPAddress(someIps);
    expect(map.size).toBe(3);
});

