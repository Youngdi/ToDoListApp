// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

const { reloadApp } = require("./reload")
const sleep = (s) => new Promise((resolve) => setTimeout(() => resolve(), s * 1000))

describe("Todo list CRUD flow", () => {

  it("should have welcome screen", async () => {
    await expect(element(by.id("AuthScreen"))).toBeVisible()
  })

  it("should go to next screen after tap ignore auth on e2e", async () => {
    await element(by.id("GoToSettingButtonForTesting")).tap();
    await expect(element(by.id("TaskScreen"))).toBeVisible()
  })

  it("add task", async () => {
    await element(by.text('Enter here')).tap();
    await element(by.type('RCTSinglelineTextInputView')).typeText('Test1')
    await element(by.id("SubmitButton")).tap()
  })

  it("add task2", async () => {
    await element(by.text('Enter here')).tap();
    await element(by.type('RCTSinglelineTextInputView')).typeText('Test2')
    await element(by.id("SubmitButton")).tap()
  })

  it("update task", async () => {
    await element(by.text('Test1')).tap();
    await element(by.type('RCTSinglelineTextInputView')).replaceText('Test2')
    await element(by.id("SubmitButton")).tap()
  })

  it("remove task", async () => {
    await element(by.text('Remove')).atIndex(1).tap()
  })

  it("go back", async () => {
    await element(by.type('RCTImageView')).tap()
    await expect(element(by.id("AuthScreen"))).toBeVisible()
  })

})
