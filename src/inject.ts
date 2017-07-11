/**
 * Decorates a Class with a PropertyInjection point.
 *
 * @example
 * <pre>
 *     class MyActor {
 *       @inject('firstName')
 *       name : String;
 *     }
 * </pre>
 *
 * @decorator
 * @param {string} injectionKey - Injection key
 * @returns {function(Object, string): void} Factory function to be invoked with an 
 * instance of the decorated Class and the name of the decorated property.
 */
export default function inject(injectionKey: string) {

    // Our decorator provides a factory function which will be invoked with an
    // instance of the decorated Class and the name of the decorated property.
    return function recordInjection(target: Object, decoratedPropertyName: string): void {

        // Get a reference to the Class of the target object which has been
        // decorated.
        const targetType: any = target.constructor;

        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }

        // Associate this property with the injectionKey provided in the
        // decorator call
        targetType.__inject__[decoratedPropertyName] = injectionKey;
    };
}