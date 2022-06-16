import { TaskSnapshot } from "../../models/task/task"
import { GeneralApiProblem } from "./api-problem"

export type GetTaskListResult = { kind: "ok"; taskList: TaskSnapshot[] } | GeneralApiProblem
