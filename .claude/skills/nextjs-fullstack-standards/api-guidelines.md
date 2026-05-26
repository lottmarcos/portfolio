# API Guidelines

## Server Actions (Primary Mutation Pattern)

### When to Use

- Form submissions.
- Data mutations triggered by user interaction.
- Any operation that changes state on the server.

### Structure

```tsx
"use server"

import { z } from "zod"

const schema = z.object({
  // define expected shape
})

export async function actionName(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return { success: false, error: "Invalid input." }
  }

  // perform mutation
  return { success: true, data: result }
}
```

### Rules

1. Always validate input with Zod.
2. Return `{ success, data?, error? }` — never throw errors that reach the client.
3. Never expose internal error details (stack traces, database errors).
4. Colocate route-specific actions with the route. Shared actions go in `src/app/_actions/`.
5. Use `revalidatePath()` or `revalidateTag()` after mutations to update cached data.

## Route Handlers (Secondary Pattern)

### When to Use

- Webhook receivers from external services.
- Endpoints that need specific HTTP headers or status codes.
- File downloads or redirects.
- External API proxies.

### When NOT to Use

- Data fetching for UI (use Server Components).
- Mutations from the UI (use Server Actions).

### Structure

```tsx
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  // validate and process
  return NextResponse.json({ result }, { status: 200 })
}
```

### Rules

1. Always validate the request body.
2. Return appropriate HTTP status codes.
3. For webhooks, verify the request signature before processing.
4. Keep Route Handlers in `src/app/api/` with clear naming.

## Input Validation

- Use Zod for all external input (form data, request bodies, URL params).
- Define schemas colocated with the action or route that uses them.
- Shared schemas go in `src/lib/schemas/`.
- Never trust client-side validation alone — always validate server-side.

## Error Response Format

All errors returned to the client follow this shape:

```tsx
type ActionResult<T = void> = 
  | { success: true; data: T }
  | { success: false; error: string }
```

Keep error messages user-friendly. Log detailed errors server-side.
