'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectValidation = require('./object-validation');

var _objectValidation2 = _interopRequireDefault(_objectValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectValidaton = function () {
    function ObjectValidaton(object) {
        _classCallCheck(this, ObjectValidaton);

        this.object = object;
    }
    /**
     * Validation to not allow null value
     * 
     * @param {string} [message='Object cannot be null'] 
     * @returns {ObjectValidation}
     * @throws {Error} throws an error then value is null
     * 
     * @memberOf ObjectValidaton
     */


    _createClass(ObjectValidaton, [{
        key: 'isNotNull',
        value: function isNotNull() {
            var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Object cannot be null';

            if (this.object === null) {
                throw message;
            }
            return this;
        }

        /**
         * Validation to not allow undefined value
         * 
         * @param {string} [message='Object cannot be undedined'] 
         * @returns {ObjectValidation}
         * @throws {Error} throws an error then value is undefined
         * 
         * @memberOf ObjectValidaton
         */

    }, {
        key: 'isNotUndefined',
        value: function isNotUndefined() {
            var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Object cannot be undedined';

            if (this.object === undefined) {
                throw message;
            }
            return this;
        }

        /**
         * Validation to not allow null OR undefined value
         * 
         * @param {string} [message='Object cannot be null or undefined'] 
         * @returns {ObjectValidation}
         * @throws {Error} throws an error then value is null OR undefined
         * 
         * @memberOf ObjectValidaton
         */

    }, {
        key: 'isNotNullOrUndefined',
        value: function isNotNullOrUndefined() {
            var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Object cannot be null or undedined';

            if (this.object === null || this.object === undefined) {
                throw message;
            }
            return this;
        }

        /**
         * Validation to check if a value is of given type(s)
         * 
         * @param {any|any[]} types 
         * @param {string} [message='Object must be of type {types}'] 
         * @returns {ObjectValidation}
         * @throws {Error} throws an error if the object is not of the supplied type(s)
         * 
         * @memberOf ObjectValidaton
         */

    }, {
        key: 'isTypeOf',
        value: function isTypeOf(types) {
            var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Object must be of type {types}';

            if (types.constructor !== Array) {
                types = [types];
            }
            if (this.object !== null && this.object !== undefined && types.indexOf(this.object.constructor) === -1) {
                var typesStr = types.map(function (x) {
                    return x.name;
                }).join('|');
                throw message.replace('{types}', typesStr);
            }
            return this;
        }

        /**
         * Validation to check if a value is of given base type(s)
         * 
         * @param {any|any[]} baseTypes 
         * @param {string} [message='Object must have a base type of {types}'] 
         * @returns {ObjectValidation}
         * @throws {Error} throws an error if value is not of given base type(s)
         * 
         * @memberOf ObjectValidaton
         */

    }, {
        key: 'isInstanceOf',
        value: function isInstanceOf(baseTypes) {
            var _this = this;

            var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Object must have a base type of {types}';

            if (baseTypes.constructor !== Array) {
                baseTypes = [baseTypes];
            }
            if (this.object !== null && this.object !== undefined) {
                var found = baseTypes.find(function (x) {
                    return _this.object instanceof x;
                });
                if (!found) {
                    var types = baseTypes.map(function (x) {
                        return x.name;
                    }).join('|');
                    throw message.replace('{types}', types);
                }
            }
            return this;
        }

        /**
         * Validation to check if all objects in an array is of the given type(s)
         * 
         * @param {any} types 
         * @param {string} [message='Object must be an array only containing objects of type {types}'] 
         * @returns {ObjectValidation}
         * @throws {Error} throws an error then not all items in the array are of the given type(s)
         * 
         * @memberOf ObjectValidaton
         */

    }, {
        key: 'isArrayOnlyContainingTypesOf',
        value: function isArrayOnlyContainingTypesOf(types) {
            var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Object must be an array only containing objects of type {types}';

            if (this.object && this.isTypeOf(Array) && !this.object.every(function (x) {
                try {
                    new _objectValidation2.default(x).isTypeOf(types);
                } catch (ex) {
                    return false;
                }
                return true;
            })) {
                var typeStr = types.map(function (x) {
                    return x.name;
                }).join('|');
                throw message.replace('{types}', typeStr);
            }

            return this;
        }

        /**
         * Validation to check if all objects in an array is of the given base type(s)
         * 
         * @param {any} types 
         * @param {string} [message='Object must be an array only containing objects that have a base type of {types}'] 
         * @returns {ObjectValidation}
         * @throws {Error} throws an error then not all items in the array are of the given base type(s)
         * 
         * @memberOf ObjectValidaton
         */

    }, {
        key: 'isArrayOnlyContainingInstancesOf',
        value: function isArrayOnlyContainingInstancesOf(types) {
            var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Object must be an array only containing objects that have a base type of {types}';

            if (this.object && this.isTypeOf(Array) && !this.object.every(function (x) {
                try {
                    new _objectValidation2.default(x).isInstanceOf(types);
                } catch (ex) {
                    return false;
                }
                return true;
            })) {
                var typeStr = types.map(function (x) {
                    return x.name;
                }).join('|');
                throw message.replace('{types}', typeStr);
            }

            return this;
        }
    }]);

    return ObjectValidaton;
}();

exports.default = ObjectValidaton;
