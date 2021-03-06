import * as React from "react";
declare type TypedCallback<T> = (value: T) => void;
interface IConsumerState {
    value?: any;
}
interface IConsumerProps {
    context: string;
    initalState?: any;
    children: TypedCallback<any>;
}
export declare const Consumer: {
    new (props: IConsumerProps): {
        __consumerName: string;
        render(): JSX.Element;
        componentWillUnmount(): void;
        setState<K extends "value">(state: IConsumerState | ((prevState: Readonly<IConsumerState>, props: Readonly<IConsumerProps>) => IConsumerState | Pick<IConsumerState, K>) | Pick<IConsumerState, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<IConsumerProps>;
        state: Readonly<IConsumerState>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<IConsumerProps>, nextState: Readonly<IConsumerState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<IConsumerProps>, prevState: Readonly<IConsumerState>): any;
        componentDidUpdate?(prevProps: Readonly<IConsumerProps>, prevState: Readonly<IConsumerState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<IConsumerProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<IConsumerProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<IConsumerProps>, nextState: Readonly<IConsumerState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<IConsumerProps>, nextState: Readonly<IConsumerState>, nextContext: any): void;
    };
}, Producer: {
    update: (context: string, value: any) => void;
    register: <T>(context: string, callback: TypedCallback<T>) => void;
};
export {};
