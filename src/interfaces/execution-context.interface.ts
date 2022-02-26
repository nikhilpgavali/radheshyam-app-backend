/**
 * @property {string}      userId                - unique identifier for the user
 * @property {boolean}     useReadEntityManager  - indicates the entity manager to be used for the transaction to the database 
 */

export interface ExecutionContext {
    userId?: string;
    userEntityManager?: boolean;
    isInternalSystem?: boolean;
}