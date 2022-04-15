const Manager = require("../lib/Manager");

test("creates Manager object", () => {
  const manager = new Manager("Jess", 10, "jess@gmail.com", 303);

  expect(manager.officeNumber).toEqual(expect.any(Number));
});

test("get employee role", () => {
  const manager = new Manager("Jess", 10, "jess@gmail.com");

  expect(manager.getRole()).toEqual("Manager");
});
