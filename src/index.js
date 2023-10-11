import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import categoryRouter from "./routes/categories.js";
import eventRouter from "./routes/events.js";
import userRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import logMiddleware from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// ------------------------------------------------
// ------------------------------------------------
// Rest of our app here
app.use(express.json());
app.use(logMiddleware);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/categories", categoryRouter);
app.use("/events", eventRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);

// ------------------------------------------------
// ------------------------------------------------

// Error handling
// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
