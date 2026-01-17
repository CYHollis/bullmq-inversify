import { context } from "./context"
import { ServiceNotBoundError } from "./errors/service-not-bound.error"

export function resolve(constructor: Function) {
  try {
    return context.getContainer().get(constructor) as any
  } catch (error: any) {
    console.error(new ServiceNotBoundError(error.message.split('\n')[0]))
    process.exit(1)
  }
}