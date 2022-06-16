import { Instance, SnapshotOut, types, getSnapshot } from "mobx-state-tree"
import { TaskModel, TaskSnapshot } from "../task/task"
import { TaskApi } from "../../services/api/task-api"
import { withEnvironment } from "../extensions/with-environment"
import * as R from "ramda"

/**
 * Example store containing Rick and Morty Tasks
 */
export const TaskStoreModel = types
  .model("TaskStore")
  .props({
    TaskList: types.optional(types.array(TaskModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get taskList() {
      return getSnapshot(self.TaskList)
    },
    getTaskById(id: string | number) {
      return getSnapshot(self.TaskList.find((i) => i.id === id))
    },
  }))
  .actions((self) => ({
    saveTasks: (TaskSnapshots: TaskSnapshot[]) => {
      self.TaskList.replace(TaskSnapshots)
    },
  }))
  .actions((self) => ({
    getTasks: async () => {
      const taskApi = new TaskApi(self.environment.api)
      const result = await taskApi.getTodoList()

      if (result.kind === "ok") {
        self.saveTasks(result.taskList)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    deleteTask: (id: string | number) => {
      const index = self.taskList.findIndex((i) => i.id === id)
      self.saveTasks(R.remove(index, 1, self.taskList))
    },
    updateTask: (id: string | number, content: string) => {
      const index = self.taskList.findIndex((i) => i.id === id)
      self.saveTasks(
        R.update<TaskSnapshot>(index, { ...self.getTaskById(id), content }, self.taskList),
      )
    },
    addTask: (content: string) => {
      self.saveTasks(
        R.append({id: self.taskList.length, content, done:false}, self.taskList)
      )
    },
  }))

type TaskStoreType = Instance<typeof TaskStoreModel>
export interface TaskStore extends TaskStoreType {}
type TaskStoreSnapshotType = SnapshotOut<typeof TaskStoreModel>
export interface TaskStoreSnapshot extends TaskStoreSnapshotType {}
export const createTaskStoreDefaultModel = () => types.optional(TaskStoreModel, {})
