/* eslint-disable prettier/prettier */
const { TestHelper } = require("uu_appg01_server-test");
const useCase = "cat/update";

beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe(`Testing ${useCase} uuCmd...`, () => {
  test("HDS", async () => {
    let dtoIn = {
      name: "Test Cat Name",
      text: "Happy Life",
      color: "White",
    };
    let cat = await TestHelper.executePostCommand('cat/create', dtoIn);

    dtoIn = {name: "Bob", ...dtoIn};
    const result = await TestHelper.executePostCommand(useCase, {id: cat.data.id, ...dtoIn});

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });

  test("unsupported keys", async () => {
    let dtoIn = {
      name: "Bob",
      rubbish: "wrong",
      text: "Happy Life",
      color: "White",
    };

    const errorCode = "uu-cat-main/cat/update/unsupportedKeys";

    let cat = await TestHelper.executePostCommand('cat/create', dtoIn);

    dtoIn = {name: "Sally", text: "Morning", ...dtoIn};
    
    const result = await TestHelper.executePostCommand(useCase, {id: cat.data.id, ...dtoIn});

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    // expect(result.data.uuAppErrorMap[errorCode]).toBeDefined();
  });

  test("Invalid DtoIn", async () => {
    expect.assertions(2);

    const errorCode = "uu-cat-main/cat/update/invalidDtoIn";

    const dtoIn = {
      id: "60e43bd87222710dac086057",
      name: "Test Cat Name",
      text: "Happy Life",
      color: "White",
    }

    try {
      await TestHelper.executePostCommand(useCase, {...dtoIn});
    } catch (e) {
      expect(e.status).toEqual(400);
      // expect(e.code).toEqual(errorCode);
      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }
  });

  test("Cat does not exist", async () => {
    const dtoIn = {
      id: "60e43bd87222710dac086057",
      name: "Test Cat Name",
      text: "Happy Life",
      color: "White",
    };

    const errorCode = `uu-cat-main/${useCase}/testCaseUpdateDaoFailed`;

    try {
      await TestHelper.executePostCommand(useCase, dtoIn);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(errorCode);
      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }
  });
});
