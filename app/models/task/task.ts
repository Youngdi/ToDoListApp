import { Instance, SnapshotOut, types } from "mobx-state-tree"


export const TaskModel = types.model("Task").props({
  id: types.identifierNumber,
  done: types.boolean,
  content: types.string,
})

type TaskType = Instance<typeof TaskModel>
export interface Task extends TaskType {}
type TaskSnapshotType = SnapshotOut<typeof TaskModel>
export interface TaskSnapshot extends TaskSnapshotType {}
export const createTaskDefaultModel = () => types.optional(TaskModel, {})
