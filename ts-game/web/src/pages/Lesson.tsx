import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Code, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Sample lessons content
const lessons: Record<string, { title: string; content: string }> = {
  'basic-annotations': {
    title: 'Basic Annotations',
    content: `
# Basic Type Annotations

Type annotations in TypeScript allow you to explicitly specify the types of variables, function parameters, and return values.

## Why Use Type Annotations?

TypeScript can often infer types automatically, but annotations help:
- **Document intent** - Make your code self-documenting
- **Catch errors early** - TypeScript will warn you about type mismatches
- **Enable IDE features** - Better autocomplete and refactoring

## Basic Types

TypeScript has several primitive types:

\`\`\`typescript
// String
let name: string = "Alice";

// Number
let age: number = 25;

// Boolean
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
\`\`\`

## Function Annotations

Annotate parameters and return types:

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a: number, b: number): number => {
  return a + b;
};
\`\`\`

## The \`any\` Type

The \`any\` type disables type checking:

\`\`\`typescript
let value: any = "hello";
value = 42;        // No error
value = true;      // No error
value.foo.bar;     // No error (but might crash!)
\`\`\`

**Avoid \`any\` when possible!** It defeats the purpose of TypeScript.

## Type Inference

TypeScript can infer types from context:

\`\`\`typescript
let message = "Hello"; // TypeScript infers: string
let count = 42;        // TypeScript infers: number

function double(n: number) {
  return n * 2;        // Return type inferred as number
}
\`\`\`

## Practice Tips

1. Start by annotating function parameters
2. Let TypeScript infer return types when obvious
3. Use explicit annotations for complex objects
4. Avoid \`any\` - use \`unknown\` if type is truly unknown

---

Ready to practice? Run \`ts-quest start\` to begin exercises!
    `
  },
  'object-literals': {
    title: 'Object Literal Types',
    content: `
# Object Literal Types

Object literal types describe the shape of objects - what properties they have and what types those properties are.

## Defining Object Types

\`\`\`typescript
// Inline object type
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};

// Type alias (recommended for reuse)
type User = {
  name: string;
  age: number;
};

let alice: User = { name: "Alice", age: 25 };
\`\`\`

## Optional Properties

Use \`?\` to mark properties as optional:

\`\`\`typescript
type Config = {
  host: string;
  port: number;
  debug?: boolean;  // Optional
};

const config: Config = {
  host: "localhost",
  port: 3000
  // debug is optional, so we can omit it
};
\`\`\`

## Readonly Properties

Prevent properties from being changed:

\`\`\`typescript
type Point = {
  readonly x: number;
  readonly y: number;
};

const origin: Point = { x: 0, y: 0 };
// origin.x = 5; // Error! Cannot assign to 'x'
\`\`\`

## Nested Objects

Objects can contain other objects:

\`\`\`typescript
type Address = {
  street: string;
  city: string;
};

type Person = {
  name: string;
  address: Address;
};

const person: Person = {
  name: "Bob",
  address: {
    street: "123 Main St",
    city: "Springfield"
  }
};
\`\`\`

---

Continue to the next lesson or practice with exercises!
    `
  },
  'type-aliases': {
    title: 'Type Aliases',
    content: `
# Type Aliases

Type aliases let you create a new name for any type, making your code more readable and maintainable.

## Creating Type Aliases

\`\`\`typescript
type ID = string | number;
type Coordinates = [number, number];
type Callback = (data: string) => void;

let userId: ID = "abc123";
let point: Coordinates = [10, 20];
let handler: Callback = (data) => console.log(data);
\`\`\`

## When to Use Type Aliases

- **Complex types** - When a type definition is long or used multiple times
- **Domain concepts** - Give meaningful names to types in your domain
- **Union types** - Create named unions for clarity

\`\`\`typescript
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

type Status = "pending" | "active" | "completed";
\`\`\`

## Sharing Types Across Files

Export and import type aliases:

\`\`\`typescript
// types.ts
export type User = {
  id: number;
  name: string;
};

// app.ts
import type { User } from './types';
\`\`\`

---

Run \`ts-quest start\` to practice with exercises!
    `
  }
};

const topicOrder = ['basic-annotations', 'object-literals', 'type-aliases', 'arrays-tuples', 'typing-functions'];

export default function Lesson() {
  const { topic } = useParams<{ topic: string }>();
  const lesson = topic ? lessons[topic] : null;

  const currentIndex = topic ? topicOrder.indexOf(topic) : -1;
  const prevTopic = currentIndex > 0 ? topicOrder[currentIndex - 1] : null;
  const nextTopic = currentIndex < topicOrder.length - 1 ? topicOrder[currentIndex + 1] : null;

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-800 rounded-xl p-8 text-center">
          <BookOpen className="mx-auto text-slate-500 mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-2">Lesson Not Found</h1>
          <p className="text-slate-400 mb-4">This lesson is coming soon!</p>
          <Link to="/zones" className="text-ts-blue hover:underline">
            Return to Skill Tree
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/zones"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Skill Tree
        </Link>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <BookOpen size={16} />
          Lesson
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                
                if (isInline) {
                  return (
                    <code className="bg-slate-700 px-1.5 py-0.5 rounded text-ts-blue" {...props}>
                      {children}
                    </code>
                  );
                }
                
                return (
                  <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-slate-200 font-mono text-sm" {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mb-6">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-white mt-6 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 text-slate-300">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 text-slate-300">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="mb-1">{children}</li>
              ),
              hr: () => (
                <hr className="border-slate-700 my-8" />
              ),
              strong: ({ children }) => (
                <strong className="text-white font-bold">{children}</strong>
              ),
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {prevTopic ? (
          <Link
            to={`/learn/${prevTopic}`}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
            Previous Lesson
          </Link>
        ) : (
          <div />
        )}

        <Link
          to={`/quiz/${topic}`}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ts-blue to-quest-purple rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          <CheckCircle size={20} />
          Take Quiz
        </Link>

        {nextTopic ? (
          <Link
            to={`/learn/${nextTopic}`}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Next Lesson
            <ChevronRight size={20} />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* CLI Prompt */}
      <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-ts-blue/20 rounded-xl flex items-center justify-center">
            <Code className="text-ts-blue" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Ready to Practice?</h3>
            <p className="text-slate-400 text-sm">
              Run <code className="bg-slate-700 px-2 py-0.5 rounded text-ts-blue">ts-quest start</code> in your terminal to begin coding exercises!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
