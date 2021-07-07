const { TestHelper } = require("uu_appg01_server-test");

const useCase = "cat/create";

beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ "uuAppProfileAuthorities": "urn:uu:GGPLUS4U" });
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe(`Testing ${useCase} uuCmd...`, () => {
  test("HDS - SHO TAM", async () => {
  // test.only("HDS - SHO TAM", async () => {
    const dtoIn = {
      name: "CAT name",
      text: "Come text",
      color: "ginger",
    };

    const result = await TestHelper.executePostCommand(useCase, dtoIn);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });

  test("unsupported keys", async () => {
    const dtoIn = {
      name: "33333",
      text: "Come text",
      color: "ginger",
      age: 56
    };

    const errorCode = "uu-cat-main/cat/create/unsupportedKeys";

    const result = await TestHelper.executePostCommand(useCase, dtoIn);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.uuAppErrorMap[errorCode]).toBeDefined();
  });

  test("Invalid DtoIn", async () => {
    expect.assertions(3);

    const errorCode = `uu-cat-main/${useCase}/invalidDtoIn`;

    const dtoIn = {
      name: 3333,
      text: "Come text",
      color: "ginger",
    };

    try {
      await TestHelper.executePostCommand(useCase, dtoIn);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(errorCode);
      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }

  });

  test("Create cat DAO by DAO failed", async () => {
    const dtoIn = {
      name: "CAT name",
      text: "Come text",
      color: "ginger",
    };

    const errorCode = `uu-cat-main/${useCase}/catDaoCreateFailed`;

    try {
      await TestHelper.executePostCommand(useCase, dtoIn);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(errorCode);
      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }
  });
});
