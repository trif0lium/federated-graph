import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { ConsoleSpanExporter, SimpleSpanProcessor, Span } from '@opentelemetry/sdk-trace-base'
import { Resource } from '@opentelemetry/resources'
import { ClientRequest, IncomingMessage, ServerResponse } from 'http'

interface ConfigureOpenTelemetryInstrumentationOptions {
  serviceName: string
  isDGS: boolean
}

export function configureOpenTelemetryInstrumentation(options: ConfigureOpenTelemetryInstrumentationOptions) {
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation({
        applyCustomAttributesOnSpan: (span: Span, request: ClientRequest, response: IncomingMessage | ServerResponse) => {
          if (request.hasHeader('x-edge-date')) {
            span.setAttribute('x-edge-date', request.getHeader('x-edge-date'))
          }
        }
      }),
      options.isDGS && new GraphQLInstrumentation()
    ]
  })

  const provider = new NodeTracerProvider({
    resource: Resource.default().merge(new Resource({
      'service.name': options.serviceName
    }))
  })

  const consoleExporter = new ConsoleSpanExporter()
  provider.addSpanProcessor(
    new SimpleSpanProcessor(consoleExporter)
  )

  provider.register()
}
