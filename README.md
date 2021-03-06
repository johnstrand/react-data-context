# react-data-context

Super simple Context-like library for sharing state/context between components.

Unlike React's own context, this one has a globally defined shared state, and changes to a context will affect every single component that listens to that particular context

To consume a context, here is a sample class (with TypeScript annotations):

```typescript
import * as React from "react";
import * as ReactDataContext from "react-data-context";

export class ConsumerSample extends React.Component<{}, {}> {
  public render() {
    return (
      <ReactDataContext.Consumer context="foo">
        {(data: string) => <div>{data}</div>}
      </ReactDataContext.Consumer>
    );
  }
}
```

And to produce:
```typescript
import * as React from "react";
import { render } from "react-dom";
import { ConsumerSample } from "./ConsumerSample";
import * as ReactDataContext from "react-data-context";

interface AppState {
  name: string;
}

class ProducerSample extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { name: "" };
  }
  onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ name: e.currentTarget.value });
    ReactDataContext.Producer.update("foo", e.currentTarget.value);
  };
  public render() {
    return (
      <div>
        <ConsumerSample />
        <input value={this.state.name} onChange={this.onChange} />
      </div>
    );
  }
}
```