const Intern = require("../lib/Intern");

test("create Intern object", () => {
  const intern = new Intern("Jess", 10, "jess@gmail.com", "UNCC");

  expect(intern.school).toEqual(expect.any(String));
});

test("get employee school", () => {
  const intern = new Intern("Jess", 10, "jess@gmail.com", "UNCC");

  expect(intern.getSchool()).toEqual(
    expect.stringContaining(intern.school.toString())
  );
});

test("get employee role", () => {
  const intern = new Intern("Jess", 10, "jess@gmail.com", "UNCC");

  expect(intern.getRole()).toEqual("Intern");
});
