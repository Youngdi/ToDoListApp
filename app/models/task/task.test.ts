import { TaskModel } from "./task"

test("can be created", () => {
  const instance = TaskModel.create({
    id: 1,
    content: 'Test',
    done: false,
  })

  expect(instance).toBeTruthy()
})
