import * as React from "react";

type Callback = (value: any) => void;
type SubscriberCallback = { [key: string]: Callback; }
type ContextCallback = { [key: string]: SubscriberCallback };
type Render = (value: any) => JSX.Element;

interface IConsumerState {
    value?: any;
}

interface IConsumerProps {
    context: string;
}

export const ReactDataContext = (() => {
    const callbacks: ContextCallback = {};

    const registerCallback = (context: string, name: string, callback: Callback) => {
        if (!callbacks[context]) {
            callbacks[context] = {};
        }
        callbacks[context][name] = callback;
    }

    const deregisterCallback = (name: string) => {
        Object.keys(callbacks).forEach(context => callbacks[context][name] = undefined);
    }

    const invokeCallback = (context: string, value: any) => {
        if (!callbacks[context]) {
            return;
        }
        Object.keys(callbacks[context]).forEach(name => {
            const cb = callbacks[context][name];
            if(!cb) {
                return;
            }
            cb(value);
        });
    }

    const generateName = (): string => Math.random().toString(36).substring(7);

    return {
        Producer: class {
            update(name: string, value: any) {
                invokeCallback(name, value);
            }
        },
        Service: {
            update: (context: string, value: any) => {
                invokeCallback(context, value);
            },
            register: (context: string, callback: Callback) => {
                registerCallback(context, "__service", callback);
            }
        },
        Consumer: class extends React.Component<IConsumerProps, IConsumerState> {
            __consumerName: string;
            constructor(props: IConsumerProps) {
                super(props);
                this.__consumerName = generateName();
                this.state = { value: undefined };
                registerCallback(props.context, this.__consumerName, value => this.setState({ value }));
            }

            public render() {
                const render = this.props.children as Render;
                if (!render || typeof render !== "function") {
                    throw "Consumer must have single child of type function"
                }

                const { value } = this.state;

                return render(value);
            }

            public componentWillUnmount() {
                deregisterCallback(this.__consumerName);
            }
        }
    }
})();