# Ping multiple IP Addresses using Node with Jest unit testing

This is an example project which performs the followings

* Check whether a particular IP address is reachable to not

# How to run and test

Use the following command to run.

`yarn install && yarn build && yarn start`

Use the following command to test.

`yarn install && yarn build && yarn test`

# Technicalities
* Refer to the class `file-util.ts`. Exported class name is `FileUtil`

* Refer to the class `ping-ip-util.ts`. Exported class name is `IPPingUtil`


# Comments
Since I am using Facebook Jest for test framework, you can refer to the classes inside src/__tests__ folder for various test cases.

# Performance Benchmark

**For 500 IP Addresses, using promise call**

Total Time Taken:  15  seconds

# Author
Debadatta Mishra (deba.java@gmail.com)