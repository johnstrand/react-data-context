var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
var ReactDataContext = (function () {
    var callbacks = {};
    var registerCallback = function (context, name, callback) {
        if (!callbacks[context]) {
            callbacks[context] = {};
        }
        callbacks[context][name] = callback;
    };
    var deregisterCallback = function (name) {
        Object.keys(callbacks).forEach(function (context) { return callbacks[context][name] = undefined; });
    };
    var invokeCallback = function (context, value) {
        if (!callbacks[context]) {
            return;
        }
        Object.keys(callbacks[context]).forEach(function (name) {
            var cb = callbacks[context][name];
            if (!cb) {
                return;
            }
            cb(value);
        });
    };
    var generateName = function () { return Math.random().toString(36).substring(7); };
    return {
        Producer: {
            update: function (context, value) {
                invokeCallback(context, value);
            },
            register: function (context, callback) {
                registerCallback(context, "__service", callback);
            }
        },
        Consumer: /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1(props) {
                var _this = _super.call(this, props) || this;
                _this.__consumerName = generateName();
                _this.state = { value: props.initalState };
                registerCallback(props.context, _this.__consumerName, function (value) { return _this.setState({ value: value }); });
                return _this;
            }
            class_1.prototype.render = function () {
                var render = this.props.children;
                if (!render || typeof render !== "function") {
                    throw "Consumer must have single child of type function";
                }
                var value = this.state.value;
                return render(value);
            };
            class_1.prototype.componentWillUnmount = function () {
                deregisterCallback(this.__consumerName);
            };
            return class_1;
        }(React.Component))
    };
})();
export var Consumer = ReactDataContext.Consumer, Producer = ReactDataContext.Producer;
//# sourceMappingURL=ReactDataContext.js.map