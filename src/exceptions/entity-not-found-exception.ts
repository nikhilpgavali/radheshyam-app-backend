/**
 * Thrown when as entity is not found at the repository
 */

export class EntityNotFoundException extends Error {
    constructor(
        readonly entityId: string,
        message: string = `Entity not found ${entityId}`,
    ) {
        super(message);
    }
}