import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetTaskListResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class TaskApi {
  // @ts-ignore
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  private fakeAPI() {
    return {
      getTodoList: async () => {
        return {
          ok: true,
          data: [],
          status: 200,
          problem: null,
          originalError: null,
        }
      },
    }
  }

  /**
   * Gets a list of users.
   */
  async getTodoList(): Promise<GetTaskListResult> {
    // make the api call
    const response: ApiResponse<any> = await this.fakeAPI().getTodoList()
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", taskList: response.data }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
