import { FileUtil } from "./../util/file-util";

jest.mock('fs');
//jest.mock('./../util/file-util');

afterAll(() => {
    jest.restoreAllMocks();
});

describe('FileUtil', () => {

    test('should mock FileReader', () => {
        let fileUtil = new FileUtil();
        let spy = jest.spyOn(fileUtil, 'readFileLineByLineBlocking').mockImplementation(() => 'Some Values');
        expect(fileUtil.readFileLineByLineBlocking("SomePath")).toBe("Some Values");

    });

    test('should mock FileReader 2', () => {
        let fileUtil = new FileUtil();
        const mockGetById = jest.fn();
        FileUtil.prototype.readFileLineByLineBlocking = mockGetById;
        mockGetById.mockReturnValue("some values");
        const result = fileUtil.readFileLineByLineBlocking("SomePath");

        expect(result).toBe("some values"); // It passes!

    });
});