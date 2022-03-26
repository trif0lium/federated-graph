import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { Resource } from '@opentelemetry/resources'

interface ConfigureOpenTelemetryInstrumentationOptions {
  serviceName: string
  isDGS: boolean
}

export function configureOpenTelemetryInstrumentation(options: ConfigureOpenTelemetryInstrumentationOptions) {
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
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
