import { EntityNotFoundException } from "../../exceptions";
import { EntityManager, FindOneOptions, ObjectType } from "typeorm";
import { ExecutionContext } from "../../interfaces"

export abstract class BaseRepository<T> {
    constructor(
        protected readonly entityClass: ObjectType<T>,
        protected readonly readEntityManager: EntityManager,
        protected readonly writeEntityManager: EntityManager,
    ) { }

    async findOne(
        id: string,
        options: FindOneOptions | any = {},
        executionContext: ExecutionContext = {},
    ): Promise<T> {
        const entityManager = this.resolveEntityManager(
            executionContext.userEntityManager
        );
        const entity = await entityManager.findOne(this.entityClass, id, options);
        if (!entity) {
            throw new EntityNotFoundException(id);
        }
        return entity;
    }

    /**
     * Update the entity in the dtabase
     * @param {string}            id              - Unique id for the entity update
     * @param {Partial<object>}   entity          - Partial entity, it is an `<object>` to support advanced TypeORM features
     * @returns {Promise<T>}
     */
    async update(
        id: string,
        entity: Partial<object>,
        executionContext: ExecutionContext,
    ): Promise<T> {
        await this.writeEntityManager
            .createQueryBuilder()
            .update(this.entityClass)
            .set(entity)
            .where('id = :id', { id })
            .execute();

        return await this.writeEntityManager.findOne(this.entityClass, id);
    }

    /**
     * Create a new record
     * @param   {T}               data            - Data to be saved
     * @returns {Promise<boolean>}    retruns true when data is saved
     */
    async create(data: T, executionContext: ExecutionContext): Promise<boolean> {
        let result = await this.writeEntityManager.save(this.entityClass, data);
        if (result) {
            return true;
        }
    }

    protected resolveEntityManager(useReadEntityManager: boolean = true): EntityManager {
        return useReadEntityManager ? this.readEntityManager : this.writeEntityManager;
    }
}