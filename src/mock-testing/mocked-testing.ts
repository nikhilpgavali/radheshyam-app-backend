import { merge } from "lodash";
import { ExecutionContext } from '../interfaces'

export function mockExecutionContext(
    data: Partial<ExecutionContext> = {},
): ExecutionContext {
    return merge(
        {
            userId: 'any-user-id'
        },
        data
    );
}