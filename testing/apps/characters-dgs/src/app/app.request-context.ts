import { RequestContext } from '@testing/request-context'

export class AppRequestContext extends RequestContext {
  'x-edge-date'?: string
}
