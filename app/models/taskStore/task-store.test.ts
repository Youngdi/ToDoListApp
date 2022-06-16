import { TaskStoreModel } from "./task-store"

const instance = TaskStoreModel.create({
  TaskList: [
    {
      id: 1,
      content: "Test",
      done: false,
    },
    {
      id: 2,
      content: "Test2",
      done: false,
    },
    {
      id: 3,
      content: "Test3",
      done: false,
    },
  ],
})

test("can be created", () => {
  expect(instance).toBeTruthy()
})

test("can get task correctly", () => {
  expect(instance.getTaskById(2).content).toBe("Test2")
})

test("can delete task correctly", () => {
  instance.deleteTask(2)
  expect(instance.taskList.length).toBe(2)
})

test("can add task correctly", () => {
  instance.addTask("Test4")
  expect(instance.taskList.length).toBe(3)
  expect(instance.getTaskById(2).content).toBe("Test4")
})

test("can update task correctly", () => {
  instance.updateTask(1, "Test111")
  expect(instance.taskList.length).toBe(3)
  expect(instance.getTaskById(1).content).toBe("Test111")
})
