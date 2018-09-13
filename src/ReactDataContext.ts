import * as React from "react";

type Callback = (value: any) => void;

interface IConsumerState {
    value?: any;
}

interface IConsumerProps {
    name: string;
    render: (value: any) => JSX.Element;
}

export const ReactDataContext = (() => {
    const callbacks: { [key: string]: Callback[] } = {};

    const registerCallback = (name: string, callback: Callback) => {
        if (!callbacks[name]) {
            callbacks[name] = [];
        }
        callbacks[name].push(callback);
    }

    const invokeCallback = (name: string, value: any) => {
        if (!callbacks[name]) {
            return;
        }
        callbacks[name].forEach(cb => cb(value));
    }

    return {
        Producer: class {
            update(name: string, value: any) {
                invokeCallback(name, value);
            }
        },
        Service: {
            update: (name: string, value: any) => {
                invokeCallback(name, value);
            },
            register: (name: string, callback: Callback) => {
                registerCallback(name, callback);
            }
        },
        Consumer: class extends React.Component<IConsumerProps, IConsumerState> {
            constructor(props: IConsumerProps) {
                super(props);
                this.state = { value: undefined };
                registerCallback(props.name, value => this.setState({ value }));
            }

            public render() {
                const { value } = this.state;
                return this.props.render(value);
            }
        }
    }
})();