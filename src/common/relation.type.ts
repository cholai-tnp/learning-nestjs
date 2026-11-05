// Wrap single-model relation types to stop emitDecoratorMetadata from referencing
// the class eagerly, which breaks on circular ESM imports between models.
export type Relation<T> = T;
