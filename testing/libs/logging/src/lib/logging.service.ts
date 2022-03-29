import { Inject, Injectable, LoggerService, Scope } from '@nestjs/common'
import { INQUIRER } from '@nestjs/core'
import { context, trace } from '@opentelemetry/api'
import pino from 'pino'
import { RequestContext, REQUEST_CONTEXT } from '@testing/request-context'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService implements LoggerService {
  private readonly logger = pino({
    formatters: {
      log(object) {
        const span = trace.getSpan(context.active())
        if (!span) {
          return { ...object }
        }
        const { spanId, traceId } = span?.spanContext()
        return { ...object, spanId, traceId }
      }
    }
  })

  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly source: string | object
  private readonly _requestContext?: typeof RequestContext

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(@Inject(INQUIRER) _source?: string | object, @Inject(REQUEST_CONTEXT) _requestContext?: typeof RequestContext) {
    this.source = typeof _source === 'string' ? _source : _source?.constructor?.name
    this._requestContext = _requestContext
  }

  private get requestContext(): RequestContext | null {
    return this._requestContext?.get()
  }

  private get logFields(): object {
    if (this.requestContext) {
      return { source: this.source, fields: { ...this.requestContext?.logFields } }
    }

    return { source: this.source }
  }

  with(key: string, value: any) {
    if (this.requestContext)
      this.requestContext.logFields[key] = value
  }

  log(message: string, ...optionalParams: any[]) {
    this.logger.info({ ...this.logFields, optionalParams: optionalParams }, message)
  }

  info(message: string, ...optionalParams: any[]) {
    this.logger.info({ ...this.logFields, optionalParams: optionalParams }, message)
  }

  error(message: string, ...optionalParams: any[]) {
    this.logger.error({ ...this.logFields, optionalParams: optionalParams }, message)
  }

  warn(message: string, ...optionalParams: any[]) {
    this.logger.warn({ ...this.logFields, optionalParams: optionalParams }, message)
  }

  debug(message: string, ...optionalParams: any[]) {
    this.logger.debug({ ...this.logFields, optionalParams: optionalParams }, message)
  }
}

