/**
 * DIContainer class used to create an instance on one class
 * in another class 
 */

export class DI {
    private static context: DI;
    static destroy() {
        this.context.instances = {};
    }
    private instances: { [key: string]: any }
    constructor() {
        this.instances = {}
    }

    /**
     * 
     * @param className
     * @param params 
     * @returns className instance
     */
    
    static get<T>(className: any, ...params: any): T {
        if (this.context === undefined || this.context === null) {
            this.context = new DI()
        }
        if (this.context.instances[className.name] === undefined || this.context.instances[className.name] === null) {
            this.context.instances[className.name] = new className(...params);
        }
        return this.context.instances[className.name];
    }
}
