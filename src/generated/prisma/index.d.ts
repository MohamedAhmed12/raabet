
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ActivationCode
 * 
 */
export type ActivationCode = $Result.DefaultSelection<Prisma.$ActivationCodePayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>
/**
 * Model Link
 * 
 */
export type Link = $Result.DefaultSelection<Prisma.$LinkPayload>
/**
 * Model Block
 * 
 */
export type Block = $Result.DefaultSelection<Prisma.$BlockPayload>
/**
 * Model Social
 * 
 */
export type Social = $Result.DefaultSelection<Prisma.$SocialPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BlockType: {
  text: 'text',
  url: 'url',
  email: 'email',
  file: 'file',
  image: 'image',
  separator: 'separator',
  audio: 'audio',
  video: 'video'
};

export type BlockType = (typeof BlockType)[keyof typeof BlockType]

}

export type BlockType = $Enums.BlockType

export const BlockType: typeof $Enums.BlockType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activationCode`: Exposes CRUD operations for the **ActivationCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivationCodes
    * const activationCodes = await prisma.activationCode.findMany()
    * ```
    */
  get activationCode(): Prisma.ActivationCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.link`: Exposes CRUD operations for the **Link** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Links
    * const links = await prisma.link.findMany()
    * ```
    */
  get link(): Prisma.LinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.block`: Exposes CRUD operations for the **Block** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blocks
    * const blocks = await prisma.block.findMany()
    * ```
    */
  get block(): Prisma.BlockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.social`: Exposes CRUD operations for the **Social** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Socials
    * const socials = await prisma.social.findMany()
    * ```
    */
  get social(): Prisma.SocialDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    ActivationCode: 'ActivationCode',
    PasswordResetToken: 'PasswordResetToken',
    Link: 'Link',
    Block: 'Block',
    Social: 'Social'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "activationCode" | "passwordResetToken" | "link" | "block" | "social"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ActivationCode: {
        payload: Prisma.$ActivationCodePayload<ExtArgs>
        fields: Prisma.ActivationCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivationCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivationCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload>
          }
          findFirst: {
            args: Prisma.ActivationCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivationCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload>
          }
          findMany: {
            args: Prisma.ActivationCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload>[]
          }
          create: {
            args: Prisma.ActivationCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload>
          }
          createMany: {
            args: Prisma.ActivationCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivationCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload>[]
          }
          delete: {
            args: Prisma.ActivationCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload>
          }
          update: {
            args: Prisma.ActivationCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload>
          }
          deleteMany: {
            args: Prisma.ActivationCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivationCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivationCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload>[]
          }
          upsert: {
            args: Prisma.ActivationCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationCodePayload>
          }
          aggregate: {
            args: Prisma.ActivationCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivationCode>
          }
          groupBy: {
            args: Prisma.ActivationCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivationCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivationCodeCountArgs<ExtArgs>
            result: $Utils.Optional<ActivationCodeCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
      Link: {
        payload: Prisma.$LinkPayload<ExtArgs>
        fields: Prisma.LinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          findFirst: {
            args: Prisma.LinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          findMany: {
            args: Prisma.LinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          create: {
            args: Prisma.LinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          createMany: {
            args: Prisma.LinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          delete: {
            args: Prisma.LinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          update: {
            args: Prisma.LinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          deleteMany: {
            args: Prisma.LinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          upsert: {
            args: Prisma.LinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          aggregate: {
            args: Prisma.LinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLink>
          }
          groupBy: {
            args: Prisma.LinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<LinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.LinkCountArgs<ExtArgs>
            result: $Utils.Optional<LinkCountAggregateOutputType> | number
          }
        }
      }
      Block: {
        payload: Prisma.$BlockPayload<ExtArgs>
        fields: Prisma.BlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          findFirst: {
            args: Prisma.BlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          findMany: {
            args: Prisma.BlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          create: {
            args: Prisma.BlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          createMany: {
            args: Prisma.BlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          delete: {
            args: Prisma.BlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          update: {
            args: Prisma.BlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          deleteMany: {
            args: Prisma.BlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          upsert: {
            args: Prisma.BlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          aggregate: {
            args: Prisma.BlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlock>
          }
          groupBy: {
            args: Prisma.BlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlockCountArgs<ExtArgs>
            result: $Utils.Optional<BlockCountAggregateOutputType> | number
          }
        }
      }
      Social: {
        payload: Prisma.$SocialPayload<ExtArgs>
        fields: Prisma.SocialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SocialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SocialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          findFirst: {
            args: Prisma.SocialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SocialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          findMany: {
            args: Prisma.SocialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>[]
          }
          create: {
            args: Prisma.SocialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          createMany: {
            args: Prisma.SocialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SocialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>[]
          }
          delete: {
            args: Prisma.SocialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          update: {
            args: Prisma.SocialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          deleteMany: {
            args: Prisma.SocialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SocialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SocialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>[]
          }
          upsert: {
            args: Prisma.SocialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          aggregate: {
            args: Prisma.SocialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSocial>
          }
          groupBy: {
            args: Prisma.SocialGroupByArgs<ExtArgs>
            result: $Utils.Optional<SocialGroupByOutputType>[]
          }
          count: {
            args: Prisma.SocialCountArgs<ExtArgs>
            result: $Utils.Optional<SocialCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    activationCode?: ActivationCodeOmit
    passwordResetToken?: PasswordResetTokenOmit
    link?: LinkOmit
    block?: BlockOmit
    social?: SocialOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    links: number
    activationCodes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    links?: boolean | UserCountOutputTypeCountLinksArgs
    activationCodes?: boolean | UserCountOutputTypeCountActivationCodesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivationCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivationCodeWhereInput
  }


  /**
   * Count Type LinkCountOutputType
   */

  export type LinkCountOutputType = {
    blocks: number
    socials: number
  }

  export type LinkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blocks?: boolean | LinkCountOutputTypeCountBlocksArgs
    socials?: boolean | LinkCountOutputTypeCountSocialsArgs
  }

  // Custom InputTypes
  /**
   * LinkCountOutputType without action
   */
  export type LinkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkCountOutputType
     */
    select?: LinkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LinkCountOutputType without action
   */
  export type LinkCountOutputTypeCountBlocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockWhereInput
  }

  /**
   * LinkCountOutputType without action
   */
  export type LinkCountOutputTypeCountSocialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    fullname: string | null
    email: string | null
    password: string | null
    avatar: string | null
    createdAt: Date | null
    is_confirmed: boolean | null
    resetToken: string | null
    resetTokenExpires: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    fullname: string | null
    email: string | null
    password: string | null
    avatar: string | null
    createdAt: Date | null
    is_confirmed: boolean | null
    resetToken: string | null
    resetTokenExpires: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullname: number
    email: number
    password: number
    avatar: number
    createdAt: number
    is_confirmed: number
    resetToken: number
    resetTokenExpires: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    fullname?: true
    email?: true
    password?: true
    avatar?: true
    createdAt?: true
    is_confirmed?: true
    resetToken?: true
    resetTokenExpires?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullname?: true
    email?: true
    password?: true
    avatar?: true
    createdAt?: true
    is_confirmed?: true
    resetToken?: true
    resetTokenExpires?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullname?: true
    email?: true
    password?: true
    avatar?: true
    createdAt?: true
    is_confirmed?: true
    resetToken?: true
    resetTokenExpires?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    fullname: string
    email: string
    password: string
    avatar: string
    createdAt: Date
    is_confirmed: boolean
    resetToken: string | null
    resetTokenExpires: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    createdAt?: boolean
    is_confirmed?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
    links?: boolean | User$linksArgs<ExtArgs>
    activationCodes?: boolean | User$activationCodesArgs<ExtArgs>
    passwordResetToken?: boolean | User$passwordResetTokenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    createdAt?: boolean
    is_confirmed?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    createdAt?: boolean
    is_confirmed?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    createdAt?: boolean
    is_confirmed?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullname" | "email" | "password" | "avatar" | "createdAt" | "is_confirmed" | "resetToken" | "resetTokenExpires", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    links?: boolean | User$linksArgs<ExtArgs>
    activationCodes?: boolean | User$activationCodesArgs<ExtArgs>
    passwordResetToken?: boolean | User$passwordResetTokenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      links: Prisma.$LinkPayload<ExtArgs>[]
      activationCodes: Prisma.$ActivationCodePayload<ExtArgs>[]
      passwordResetToken: Prisma.$PasswordResetTokenPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullname: string
      email: string
      password: string
      avatar: string
      createdAt: Date
      is_confirmed: boolean
      resetToken: string | null
      resetTokenExpires: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    links<T extends User$linksArgs<ExtArgs> = {}>(args?: Subset<T, User$linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activationCodes<T extends User$activationCodesArgs<ExtArgs> = {}>(args?: Subset<T, User$activationCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    passwordResetToken<T extends User$passwordResetTokenArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordResetTokenArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly fullname: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly is_confirmed: FieldRef<"User", 'Boolean'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpires: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.links
   */
  export type User$linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    where?: LinkWhereInput
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    cursor?: LinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * User.activationCodes
   */
  export type User$activationCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
    where?: ActivationCodeWhereInput
    orderBy?: ActivationCodeOrderByWithRelationInput | ActivationCodeOrderByWithRelationInput[]
    cursor?: ActivationCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivationCodeScalarFieldEnum | ActivationCodeScalarFieldEnum[]
  }

  /**
   * User.passwordResetToken
   */
  export type User$passwordResetTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    where?: PasswordResetTokenWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ActivationCode
   */

  export type AggregateActivationCode = {
    _count: ActivationCodeCountAggregateOutputType | null
    _min: ActivationCodeMinAggregateOutputType | null
    _max: ActivationCodeMaxAggregateOutputType | null
  }

  export type ActivationCodeMinAggregateOutputType = {
    id: string | null
    code: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
    userId: string | null
  }

  export type ActivationCodeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
    userId: string | null
  }

  export type ActivationCodeCountAggregateOutputType = {
    id: number
    code: number
    expiresAt: number
    used: number
    createdAt: number
    userId: number
    _all: number
  }


  export type ActivationCodeMinAggregateInputType = {
    id?: true
    code?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    userId?: true
  }

  export type ActivationCodeMaxAggregateInputType = {
    id?: true
    code?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    userId?: true
  }

  export type ActivationCodeCountAggregateInputType = {
    id?: true
    code?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type ActivationCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivationCode to aggregate.
     */
    where?: ActivationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivationCodes to fetch.
     */
    orderBy?: ActivationCodeOrderByWithRelationInput | ActivationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivationCodes
    **/
    _count?: true | ActivationCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivationCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivationCodeMaxAggregateInputType
  }

  export type GetActivationCodeAggregateType<T extends ActivationCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateActivationCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivationCode[P]>
      : GetScalarType<T[P], AggregateActivationCode[P]>
  }




  export type ActivationCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivationCodeWhereInput
    orderBy?: ActivationCodeOrderByWithAggregationInput | ActivationCodeOrderByWithAggregationInput[]
    by: ActivationCodeScalarFieldEnum[] | ActivationCodeScalarFieldEnum
    having?: ActivationCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivationCodeCountAggregateInputType | true
    _min?: ActivationCodeMinAggregateInputType
    _max?: ActivationCodeMaxAggregateInputType
  }

  export type ActivationCodeGroupByOutputType = {
    id: string
    code: string
    expiresAt: Date
    used: boolean
    createdAt: Date
    userId: string
    _count: ActivationCodeCountAggregateOutputType | null
    _min: ActivationCodeMinAggregateOutputType | null
    _max: ActivationCodeMaxAggregateOutputType | null
  }

  type GetActivationCodeGroupByPayload<T extends ActivationCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivationCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivationCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivationCodeGroupByOutputType[P]>
            : GetScalarType<T[P], ActivationCodeGroupByOutputType[P]>
        }
      >
    >


  export type ActivationCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activationCode"]>

  export type ActivationCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activationCode"]>

  export type ActivationCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activationCode"]>

  export type ActivationCodeSelectScalar = {
    id?: boolean
    code?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type ActivationCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "expiresAt" | "used" | "createdAt" | "userId", ExtArgs["result"]["activationCode"]>
  export type ActivationCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivationCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivationCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivationCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivationCode"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      expiresAt: Date
      used: boolean
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["activationCode"]>
    composites: {}
  }

  type ActivationCodeGetPayload<S extends boolean | null | undefined | ActivationCodeDefaultArgs> = $Result.GetResult<Prisma.$ActivationCodePayload, S>

  type ActivationCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivationCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivationCodeCountAggregateInputType | true
    }

  export interface ActivationCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivationCode'], meta: { name: 'ActivationCode' } }
    /**
     * Find zero or one ActivationCode that matches the filter.
     * @param {ActivationCodeFindUniqueArgs} args - Arguments to find a ActivationCode
     * @example
     * // Get one ActivationCode
     * const activationCode = await prisma.activationCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivationCodeFindUniqueArgs>(args: SelectSubset<T, ActivationCodeFindUniqueArgs<ExtArgs>>): Prisma__ActivationCodeClient<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivationCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivationCodeFindUniqueOrThrowArgs} args - Arguments to find a ActivationCode
     * @example
     * // Get one ActivationCode
     * const activationCode = await prisma.activationCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivationCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivationCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivationCodeClient<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivationCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationCodeFindFirstArgs} args - Arguments to find a ActivationCode
     * @example
     * // Get one ActivationCode
     * const activationCode = await prisma.activationCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivationCodeFindFirstArgs>(args?: SelectSubset<T, ActivationCodeFindFirstArgs<ExtArgs>>): Prisma__ActivationCodeClient<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivationCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationCodeFindFirstOrThrowArgs} args - Arguments to find a ActivationCode
     * @example
     * // Get one ActivationCode
     * const activationCode = await prisma.activationCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivationCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivationCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivationCodeClient<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivationCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivationCodes
     * const activationCodes = await prisma.activationCode.findMany()
     * 
     * // Get first 10 ActivationCodes
     * const activationCodes = await prisma.activationCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activationCodeWithIdOnly = await prisma.activationCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivationCodeFindManyArgs>(args?: SelectSubset<T, ActivationCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivationCode.
     * @param {ActivationCodeCreateArgs} args - Arguments to create a ActivationCode.
     * @example
     * // Create one ActivationCode
     * const ActivationCode = await prisma.activationCode.create({
     *   data: {
     *     // ... data to create a ActivationCode
     *   }
     * })
     * 
     */
    create<T extends ActivationCodeCreateArgs>(args: SelectSubset<T, ActivationCodeCreateArgs<ExtArgs>>): Prisma__ActivationCodeClient<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivationCodes.
     * @param {ActivationCodeCreateManyArgs} args - Arguments to create many ActivationCodes.
     * @example
     * // Create many ActivationCodes
     * const activationCode = await prisma.activationCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivationCodeCreateManyArgs>(args?: SelectSubset<T, ActivationCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivationCodes and returns the data saved in the database.
     * @param {ActivationCodeCreateManyAndReturnArgs} args - Arguments to create many ActivationCodes.
     * @example
     * // Create many ActivationCodes
     * const activationCode = await prisma.activationCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivationCodes and only return the `id`
     * const activationCodeWithIdOnly = await prisma.activationCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivationCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivationCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivationCode.
     * @param {ActivationCodeDeleteArgs} args - Arguments to delete one ActivationCode.
     * @example
     * // Delete one ActivationCode
     * const ActivationCode = await prisma.activationCode.delete({
     *   where: {
     *     // ... filter to delete one ActivationCode
     *   }
     * })
     * 
     */
    delete<T extends ActivationCodeDeleteArgs>(args: SelectSubset<T, ActivationCodeDeleteArgs<ExtArgs>>): Prisma__ActivationCodeClient<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivationCode.
     * @param {ActivationCodeUpdateArgs} args - Arguments to update one ActivationCode.
     * @example
     * // Update one ActivationCode
     * const activationCode = await prisma.activationCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivationCodeUpdateArgs>(args: SelectSubset<T, ActivationCodeUpdateArgs<ExtArgs>>): Prisma__ActivationCodeClient<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivationCodes.
     * @param {ActivationCodeDeleteManyArgs} args - Arguments to filter ActivationCodes to delete.
     * @example
     * // Delete a few ActivationCodes
     * const { count } = await prisma.activationCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivationCodeDeleteManyArgs>(args?: SelectSubset<T, ActivationCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivationCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivationCodes
     * const activationCode = await prisma.activationCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivationCodeUpdateManyArgs>(args: SelectSubset<T, ActivationCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivationCodes and returns the data updated in the database.
     * @param {ActivationCodeUpdateManyAndReturnArgs} args - Arguments to update many ActivationCodes.
     * @example
     * // Update many ActivationCodes
     * const activationCode = await prisma.activationCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivationCodes and only return the `id`
     * const activationCodeWithIdOnly = await prisma.activationCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivationCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivationCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivationCode.
     * @param {ActivationCodeUpsertArgs} args - Arguments to update or create a ActivationCode.
     * @example
     * // Update or create a ActivationCode
     * const activationCode = await prisma.activationCode.upsert({
     *   create: {
     *     // ... data to create a ActivationCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivationCode we want to update
     *   }
     * })
     */
    upsert<T extends ActivationCodeUpsertArgs>(args: SelectSubset<T, ActivationCodeUpsertArgs<ExtArgs>>): Prisma__ActivationCodeClient<$Result.GetResult<Prisma.$ActivationCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivationCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationCodeCountArgs} args - Arguments to filter ActivationCodes to count.
     * @example
     * // Count the number of ActivationCodes
     * const count = await prisma.activationCode.count({
     *   where: {
     *     // ... the filter for the ActivationCodes we want to count
     *   }
     * })
    **/
    count<T extends ActivationCodeCountArgs>(
      args?: Subset<T, ActivationCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivationCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivationCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivationCodeAggregateArgs>(args: Subset<T, ActivationCodeAggregateArgs>): Prisma.PrismaPromise<GetActivationCodeAggregateType<T>>

    /**
     * Group by ActivationCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivationCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivationCodeGroupByArgs['orderBy'] }
        : { orderBy?: ActivationCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivationCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivationCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivationCode model
   */
  readonly fields: ActivationCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivationCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivationCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivationCode model
   */
  interface ActivationCodeFieldRefs {
    readonly id: FieldRef<"ActivationCode", 'String'>
    readonly code: FieldRef<"ActivationCode", 'String'>
    readonly expiresAt: FieldRef<"ActivationCode", 'DateTime'>
    readonly used: FieldRef<"ActivationCode", 'Boolean'>
    readonly createdAt: FieldRef<"ActivationCode", 'DateTime'>
    readonly userId: FieldRef<"ActivationCode", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ActivationCode findUnique
   */
  export type ActivationCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
    /**
     * Filter, which ActivationCode to fetch.
     */
    where: ActivationCodeWhereUniqueInput
  }

  /**
   * ActivationCode findUniqueOrThrow
   */
  export type ActivationCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
    /**
     * Filter, which ActivationCode to fetch.
     */
    where: ActivationCodeWhereUniqueInput
  }

  /**
   * ActivationCode findFirst
   */
  export type ActivationCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
    /**
     * Filter, which ActivationCode to fetch.
     */
    where?: ActivationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivationCodes to fetch.
     */
    orderBy?: ActivationCodeOrderByWithRelationInput | ActivationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivationCodes.
     */
    cursor?: ActivationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivationCodes.
     */
    distinct?: ActivationCodeScalarFieldEnum | ActivationCodeScalarFieldEnum[]
  }

  /**
   * ActivationCode findFirstOrThrow
   */
  export type ActivationCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
    /**
     * Filter, which ActivationCode to fetch.
     */
    where?: ActivationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivationCodes to fetch.
     */
    orderBy?: ActivationCodeOrderByWithRelationInput | ActivationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivationCodes.
     */
    cursor?: ActivationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivationCodes.
     */
    distinct?: ActivationCodeScalarFieldEnum | ActivationCodeScalarFieldEnum[]
  }

  /**
   * ActivationCode findMany
   */
  export type ActivationCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
    /**
     * Filter, which ActivationCodes to fetch.
     */
    where?: ActivationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivationCodes to fetch.
     */
    orderBy?: ActivationCodeOrderByWithRelationInput | ActivationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivationCodes.
     */
    cursor?: ActivationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivationCodes.
     */
    skip?: number
    distinct?: ActivationCodeScalarFieldEnum | ActivationCodeScalarFieldEnum[]
  }

  /**
   * ActivationCode create
   */
  export type ActivationCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivationCode.
     */
    data: XOR<ActivationCodeCreateInput, ActivationCodeUncheckedCreateInput>
  }

  /**
   * ActivationCode createMany
   */
  export type ActivationCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivationCodes.
     */
    data: ActivationCodeCreateManyInput | ActivationCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivationCode createManyAndReturn
   */
  export type ActivationCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * The data used to create many ActivationCodes.
     */
    data: ActivationCodeCreateManyInput | ActivationCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivationCode update
   */
  export type ActivationCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivationCode.
     */
    data: XOR<ActivationCodeUpdateInput, ActivationCodeUncheckedUpdateInput>
    /**
     * Choose, which ActivationCode to update.
     */
    where: ActivationCodeWhereUniqueInput
  }

  /**
   * ActivationCode updateMany
   */
  export type ActivationCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivationCodes.
     */
    data: XOR<ActivationCodeUpdateManyMutationInput, ActivationCodeUncheckedUpdateManyInput>
    /**
     * Filter which ActivationCodes to update
     */
    where?: ActivationCodeWhereInput
    /**
     * Limit how many ActivationCodes to update.
     */
    limit?: number
  }

  /**
   * ActivationCode updateManyAndReturn
   */
  export type ActivationCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * The data used to update ActivationCodes.
     */
    data: XOR<ActivationCodeUpdateManyMutationInput, ActivationCodeUncheckedUpdateManyInput>
    /**
     * Filter which ActivationCodes to update
     */
    where?: ActivationCodeWhereInput
    /**
     * Limit how many ActivationCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivationCode upsert
   */
  export type ActivationCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivationCode to update in case it exists.
     */
    where: ActivationCodeWhereUniqueInput
    /**
     * In case the ActivationCode found by the `where` argument doesn't exist, create a new ActivationCode with this data.
     */
    create: XOR<ActivationCodeCreateInput, ActivationCodeUncheckedCreateInput>
    /**
     * In case the ActivationCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivationCodeUpdateInput, ActivationCodeUncheckedUpdateInput>
  }

  /**
   * ActivationCode delete
   */
  export type ActivationCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
    /**
     * Filter which ActivationCode to delete.
     */
    where: ActivationCodeWhereUniqueInput
  }

  /**
   * ActivationCode deleteMany
   */
  export type ActivationCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivationCodes to delete
     */
    where?: ActivationCodeWhereInput
    /**
     * Limit how many ActivationCodes to delete.
     */
    limit?: number
  }

  /**
   * ActivationCode without action
   */
  export type ActivationCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationCode
     */
    select?: ActivationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationCode
     */
    omit?: ActivationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivationCodeInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    expiresAt: Date
    createdAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "expiresAt" | "createdAt", ExtArgs["result"]["passwordResetToken"]>
  export type PasswordResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokenCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens and returns the data updated in the database.
     * @param {PasswordResetTokenUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetTokens.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly token: FieldRef<"PasswordResetToken", 'String'>
    readonly userId: FieldRef<"PasswordResetToken", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken createManyAndReturn
   */
  export type PasswordResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken updateManyAndReturn
   */
  export type PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
  }


  /**
   * Model Link
   */

  export type AggregateLink = {
    _count: LinkCountAggregateOutputType | null
    _avg: LinkAvgAggregateOutputType | null
    _sum: LinkSumAggregateOutputType | null
    _min: LinkMinAggregateOutputType | null
    _max: LinkMaxAggregateOutputType | null
  }

  export type LinkAvgAggregateOutputType = {
    header_styles_profile_shadow: number | null
    header_styles_profile_border_width: number | null
    header_styles_social_icons_size: number | null
    card_styles_design: number | null
    card_styles_card_corner: number | null
    card_styles_card_border_width: number | null
    card_styles_card_shadow: number | null
    card_styles_card_spacing: number | null
    profile_views: number | null
  }

  export type LinkSumAggregateOutputType = {
    header_styles_profile_shadow: number | null
    header_styles_profile_border_width: number | null
    header_styles_social_icons_size: number | null
    card_styles_design: number | null
    card_styles_card_corner: number | null
    card_styles_card_border_width: number | null
    card_styles_card_shadow: number | null
    card_styles_card_spacing: number | null
    profile_views: number | null
  }

  export type LinkMinAggregateOutputType = {
    id: string | null
    phone: string | null
    website: string | null
    instagram: string | null
    twitter: string | null
    displayname: string | null
    bio: string | null
    userName: string | null
    userId: string | null
    general_styles_desktop_bgcolor: string | null
    general_styles_primary_text_color: string | null
    general_styles_primary_bgcolor: string | null
    general_styles_is_secondary_bgcolor: boolean | null
    general_styles_is_label_exist: boolean | null
    general_styles_secondary_bgcolor: string | null
    general_styles_soft_shadow: boolean | null
    header_styles_profile_shadow: number | null
    header_styles_profile_border_width: number | null
    header_styles_profile_border_color: string | null
    header_styles_collapse_long_bio: boolean | null
    header_styles_social_icons_size: number | null
    card_styles_design: number | null
    card_styles_card_color: string | null
    card_styles_text_color: string | null
    card_styles_label_color: string | null
    card_styles_label_text_color: string | null
    card_styles_card_corner: number | null
    card_styles_card_border_width: number | null
    card_styles_card_border_color: string | null
    card_styles_card_shadow: number | null
    card_styles_card_spacing: number | null
    title_font: string | null
    text_font: string | null
    social_enable_add_contacts: boolean | null
    social_enable_share_btn: boolean | null
    social_enable_search: boolean | null
    social_enable_qr_code: boolean | null
    profile_views: number | null
  }

  export type LinkMaxAggregateOutputType = {
    id: string | null
    phone: string | null
    website: string | null
    instagram: string | null
    twitter: string | null
    displayname: string | null
    bio: string | null
    userName: string | null
    userId: string | null
    general_styles_desktop_bgcolor: string | null
    general_styles_primary_text_color: string | null
    general_styles_primary_bgcolor: string | null
    general_styles_is_secondary_bgcolor: boolean | null
    general_styles_is_label_exist: boolean | null
    general_styles_secondary_bgcolor: string | null
    general_styles_soft_shadow: boolean | null
    header_styles_profile_shadow: number | null
    header_styles_profile_border_width: number | null
    header_styles_profile_border_color: string | null
    header_styles_collapse_long_bio: boolean | null
    header_styles_social_icons_size: number | null
    card_styles_design: number | null
    card_styles_card_color: string | null
    card_styles_text_color: string | null
    card_styles_label_color: string | null
    card_styles_label_text_color: string | null
    card_styles_card_corner: number | null
    card_styles_card_border_width: number | null
    card_styles_card_border_color: string | null
    card_styles_card_shadow: number | null
    card_styles_card_spacing: number | null
    title_font: string | null
    text_font: string | null
    social_enable_add_contacts: boolean | null
    social_enable_share_btn: boolean | null
    social_enable_search: boolean | null
    social_enable_qr_code: boolean | null
    profile_views: number | null
  }

  export type LinkCountAggregateOutputType = {
    id: number
    phone: number
    website: number
    instagram: number
    twitter: number
    displayname: number
    bio: number
    userName: number
    userId: number
    general_styles_desktop_bgcolor: number
    general_styles_primary_text_color: number
    general_styles_primary_bgcolor: number
    general_styles_is_secondary_bgcolor: number
    general_styles_is_label_exist: number
    general_styles_secondary_bgcolor: number
    general_styles_soft_shadow: number
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: number
    header_styles_collapse_long_bio: number
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: number
    card_styles_text_color: number
    card_styles_label_color: number
    card_styles_label_text_color: number
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: number
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: number
    text_font: number
    social_enable_add_contacts: number
    social_enable_share_btn: number
    social_enable_search: number
    social_enable_qr_code: number
    profile_views: number
    _all: number
  }


  export type LinkAvgAggregateInputType = {
    header_styles_profile_shadow?: true
    header_styles_profile_border_width?: true
    header_styles_social_icons_size?: true
    card_styles_design?: true
    card_styles_card_corner?: true
    card_styles_card_border_width?: true
    card_styles_card_shadow?: true
    card_styles_card_spacing?: true
    profile_views?: true
  }

  export type LinkSumAggregateInputType = {
    header_styles_profile_shadow?: true
    header_styles_profile_border_width?: true
    header_styles_social_icons_size?: true
    card_styles_design?: true
    card_styles_card_corner?: true
    card_styles_card_border_width?: true
    card_styles_card_shadow?: true
    card_styles_card_spacing?: true
    profile_views?: true
  }

  export type LinkMinAggregateInputType = {
    id?: true
    phone?: true
    website?: true
    instagram?: true
    twitter?: true
    displayname?: true
    bio?: true
    userName?: true
    userId?: true
    general_styles_desktop_bgcolor?: true
    general_styles_primary_text_color?: true
    general_styles_primary_bgcolor?: true
    general_styles_is_secondary_bgcolor?: true
    general_styles_is_label_exist?: true
    general_styles_secondary_bgcolor?: true
    general_styles_soft_shadow?: true
    header_styles_profile_shadow?: true
    header_styles_profile_border_width?: true
    header_styles_profile_border_color?: true
    header_styles_collapse_long_bio?: true
    header_styles_social_icons_size?: true
    card_styles_design?: true
    card_styles_card_color?: true
    card_styles_text_color?: true
    card_styles_label_color?: true
    card_styles_label_text_color?: true
    card_styles_card_corner?: true
    card_styles_card_border_width?: true
    card_styles_card_border_color?: true
    card_styles_card_shadow?: true
    card_styles_card_spacing?: true
    title_font?: true
    text_font?: true
    social_enable_add_contacts?: true
    social_enable_share_btn?: true
    social_enable_search?: true
    social_enable_qr_code?: true
    profile_views?: true
  }

  export type LinkMaxAggregateInputType = {
    id?: true
    phone?: true
    website?: true
    instagram?: true
    twitter?: true
    displayname?: true
    bio?: true
    userName?: true
    userId?: true
    general_styles_desktop_bgcolor?: true
    general_styles_primary_text_color?: true
    general_styles_primary_bgcolor?: true
    general_styles_is_secondary_bgcolor?: true
    general_styles_is_label_exist?: true
    general_styles_secondary_bgcolor?: true
    general_styles_soft_shadow?: true
    header_styles_profile_shadow?: true
    header_styles_profile_border_width?: true
    header_styles_profile_border_color?: true
    header_styles_collapse_long_bio?: true
    header_styles_social_icons_size?: true
    card_styles_design?: true
    card_styles_card_color?: true
    card_styles_text_color?: true
    card_styles_label_color?: true
    card_styles_label_text_color?: true
    card_styles_card_corner?: true
    card_styles_card_border_width?: true
    card_styles_card_border_color?: true
    card_styles_card_shadow?: true
    card_styles_card_spacing?: true
    title_font?: true
    text_font?: true
    social_enable_add_contacts?: true
    social_enable_share_btn?: true
    social_enable_search?: true
    social_enable_qr_code?: true
    profile_views?: true
  }

  export type LinkCountAggregateInputType = {
    id?: true
    phone?: true
    website?: true
    instagram?: true
    twitter?: true
    displayname?: true
    bio?: true
    userName?: true
    userId?: true
    general_styles_desktop_bgcolor?: true
    general_styles_primary_text_color?: true
    general_styles_primary_bgcolor?: true
    general_styles_is_secondary_bgcolor?: true
    general_styles_is_label_exist?: true
    general_styles_secondary_bgcolor?: true
    general_styles_soft_shadow?: true
    header_styles_profile_shadow?: true
    header_styles_profile_border_width?: true
    header_styles_profile_border_color?: true
    header_styles_collapse_long_bio?: true
    header_styles_social_icons_size?: true
    card_styles_design?: true
    card_styles_card_color?: true
    card_styles_text_color?: true
    card_styles_label_color?: true
    card_styles_label_text_color?: true
    card_styles_card_corner?: true
    card_styles_card_border_width?: true
    card_styles_card_border_color?: true
    card_styles_card_shadow?: true
    card_styles_card_spacing?: true
    title_font?: true
    text_font?: true
    social_enable_add_contacts?: true
    social_enable_share_btn?: true
    social_enable_search?: true
    social_enable_qr_code?: true
    profile_views?: true
    _all?: true
  }

  export type LinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Link to aggregate.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Links
    **/
    _count?: true | LinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LinkMaxAggregateInputType
  }

  export type GetLinkAggregateType<T extends LinkAggregateArgs> = {
        [P in keyof T & keyof AggregateLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLink[P]>
      : GetScalarType<T[P], AggregateLink[P]>
  }




  export type LinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkWhereInput
    orderBy?: LinkOrderByWithAggregationInput | LinkOrderByWithAggregationInput[]
    by: LinkScalarFieldEnum[] | LinkScalarFieldEnum
    having?: LinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LinkCountAggregateInputType | true
    _avg?: LinkAvgAggregateInputType
    _sum?: LinkSumAggregateInputType
    _min?: LinkMinAggregateInputType
    _max?: LinkMaxAggregateInputType
  }

  export type LinkGroupByOutputType = {
    id: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    userId: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views: number
    _count: LinkCountAggregateOutputType | null
    _avg: LinkAvgAggregateOutputType | null
    _sum: LinkSumAggregateOutputType | null
    _min: LinkMinAggregateOutputType | null
    _max: LinkMaxAggregateOutputType | null
  }

  type GetLinkGroupByPayload<T extends LinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LinkGroupByOutputType[P]>
            : GetScalarType<T[P], LinkGroupByOutputType[P]>
        }
      >
    >


  export type LinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    website?: boolean
    instagram?: boolean
    twitter?: boolean
    displayname?: boolean
    bio?: boolean
    userName?: boolean
    userId?: boolean
    general_styles_desktop_bgcolor?: boolean
    general_styles_primary_text_color?: boolean
    general_styles_primary_bgcolor?: boolean
    general_styles_is_secondary_bgcolor?: boolean
    general_styles_is_label_exist?: boolean
    general_styles_secondary_bgcolor?: boolean
    general_styles_soft_shadow?: boolean
    header_styles_profile_shadow?: boolean
    header_styles_profile_border_width?: boolean
    header_styles_profile_border_color?: boolean
    header_styles_collapse_long_bio?: boolean
    header_styles_social_icons_size?: boolean
    card_styles_design?: boolean
    card_styles_card_color?: boolean
    card_styles_text_color?: boolean
    card_styles_label_color?: boolean
    card_styles_label_text_color?: boolean
    card_styles_card_corner?: boolean
    card_styles_card_border_width?: boolean
    card_styles_card_border_color?: boolean
    card_styles_card_shadow?: boolean
    card_styles_card_spacing?: boolean
    title_font?: boolean
    text_font?: boolean
    social_enable_add_contacts?: boolean
    social_enable_share_btn?: boolean
    social_enable_search?: boolean
    social_enable_qr_code?: boolean
    profile_views?: boolean
    blocks?: boolean | Link$blocksArgs<ExtArgs>
    socials?: boolean | Link$socialsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | LinkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["link"]>

  export type LinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    website?: boolean
    instagram?: boolean
    twitter?: boolean
    displayname?: boolean
    bio?: boolean
    userName?: boolean
    userId?: boolean
    general_styles_desktop_bgcolor?: boolean
    general_styles_primary_text_color?: boolean
    general_styles_primary_bgcolor?: boolean
    general_styles_is_secondary_bgcolor?: boolean
    general_styles_is_label_exist?: boolean
    general_styles_secondary_bgcolor?: boolean
    general_styles_soft_shadow?: boolean
    header_styles_profile_shadow?: boolean
    header_styles_profile_border_width?: boolean
    header_styles_profile_border_color?: boolean
    header_styles_collapse_long_bio?: boolean
    header_styles_social_icons_size?: boolean
    card_styles_design?: boolean
    card_styles_card_color?: boolean
    card_styles_text_color?: boolean
    card_styles_label_color?: boolean
    card_styles_label_text_color?: boolean
    card_styles_card_corner?: boolean
    card_styles_card_border_width?: boolean
    card_styles_card_border_color?: boolean
    card_styles_card_shadow?: boolean
    card_styles_card_spacing?: boolean
    title_font?: boolean
    text_font?: boolean
    social_enable_add_contacts?: boolean
    social_enable_share_btn?: boolean
    social_enable_search?: boolean
    social_enable_qr_code?: boolean
    profile_views?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["link"]>

  export type LinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    website?: boolean
    instagram?: boolean
    twitter?: boolean
    displayname?: boolean
    bio?: boolean
    userName?: boolean
    userId?: boolean
    general_styles_desktop_bgcolor?: boolean
    general_styles_primary_text_color?: boolean
    general_styles_primary_bgcolor?: boolean
    general_styles_is_secondary_bgcolor?: boolean
    general_styles_is_label_exist?: boolean
    general_styles_secondary_bgcolor?: boolean
    general_styles_soft_shadow?: boolean
    header_styles_profile_shadow?: boolean
    header_styles_profile_border_width?: boolean
    header_styles_profile_border_color?: boolean
    header_styles_collapse_long_bio?: boolean
    header_styles_social_icons_size?: boolean
    card_styles_design?: boolean
    card_styles_card_color?: boolean
    card_styles_text_color?: boolean
    card_styles_label_color?: boolean
    card_styles_label_text_color?: boolean
    card_styles_card_corner?: boolean
    card_styles_card_border_width?: boolean
    card_styles_card_border_color?: boolean
    card_styles_card_shadow?: boolean
    card_styles_card_spacing?: boolean
    title_font?: boolean
    text_font?: boolean
    social_enable_add_contacts?: boolean
    social_enable_share_btn?: boolean
    social_enable_search?: boolean
    social_enable_qr_code?: boolean
    profile_views?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["link"]>

  export type LinkSelectScalar = {
    id?: boolean
    phone?: boolean
    website?: boolean
    instagram?: boolean
    twitter?: boolean
    displayname?: boolean
    bio?: boolean
    userName?: boolean
    userId?: boolean
    general_styles_desktop_bgcolor?: boolean
    general_styles_primary_text_color?: boolean
    general_styles_primary_bgcolor?: boolean
    general_styles_is_secondary_bgcolor?: boolean
    general_styles_is_label_exist?: boolean
    general_styles_secondary_bgcolor?: boolean
    general_styles_soft_shadow?: boolean
    header_styles_profile_shadow?: boolean
    header_styles_profile_border_width?: boolean
    header_styles_profile_border_color?: boolean
    header_styles_collapse_long_bio?: boolean
    header_styles_social_icons_size?: boolean
    card_styles_design?: boolean
    card_styles_card_color?: boolean
    card_styles_text_color?: boolean
    card_styles_label_color?: boolean
    card_styles_label_text_color?: boolean
    card_styles_card_corner?: boolean
    card_styles_card_border_width?: boolean
    card_styles_card_border_color?: boolean
    card_styles_card_shadow?: boolean
    card_styles_card_spacing?: boolean
    title_font?: boolean
    text_font?: boolean
    social_enable_add_contacts?: boolean
    social_enable_share_btn?: boolean
    social_enable_search?: boolean
    social_enable_qr_code?: boolean
    profile_views?: boolean
  }

  export type LinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phone" | "website" | "instagram" | "twitter" | "displayname" | "bio" | "userName" | "userId" | "general_styles_desktop_bgcolor" | "general_styles_primary_text_color" | "general_styles_primary_bgcolor" | "general_styles_is_secondary_bgcolor" | "general_styles_is_label_exist" | "general_styles_secondary_bgcolor" | "general_styles_soft_shadow" | "header_styles_profile_shadow" | "header_styles_profile_border_width" | "header_styles_profile_border_color" | "header_styles_collapse_long_bio" | "header_styles_social_icons_size" | "card_styles_design" | "card_styles_card_color" | "card_styles_text_color" | "card_styles_label_color" | "card_styles_label_text_color" | "card_styles_card_corner" | "card_styles_card_border_width" | "card_styles_card_border_color" | "card_styles_card_shadow" | "card_styles_card_spacing" | "title_font" | "text_font" | "social_enable_add_contacts" | "social_enable_share_btn" | "social_enable_search" | "social_enable_qr_code" | "profile_views", ExtArgs["result"]["link"]>
  export type LinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blocks?: boolean | Link$blocksArgs<ExtArgs>
    socials?: boolean | Link$socialsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | LinkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Link"
    objects: {
      blocks: Prisma.$BlockPayload<ExtArgs>[]
      socials: Prisma.$SocialPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phone: string
      website: string
      instagram: string
      twitter: string
      displayname: string
      bio: string
      userName: string
      userId: string
      general_styles_desktop_bgcolor: string
      general_styles_primary_text_color: string
      general_styles_primary_bgcolor: string
      general_styles_is_secondary_bgcolor: boolean
      general_styles_is_label_exist: boolean
      general_styles_secondary_bgcolor: string
      general_styles_soft_shadow: boolean
      header_styles_profile_shadow: number
      header_styles_profile_border_width: number
      header_styles_profile_border_color: string
      header_styles_collapse_long_bio: boolean
      header_styles_social_icons_size: number
      card_styles_design: number
      card_styles_card_color: string
      card_styles_text_color: string
      card_styles_label_color: string
      card_styles_label_text_color: string
      card_styles_card_corner: number
      card_styles_card_border_width: number
      card_styles_card_border_color: string
      card_styles_card_shadow: number
      card_styles_card_spacing: number
      title_font: string
      text_font: string
      social_enable_add_contacts: boolean
      social_enable_share_btn: boolean
      social_enable_search: boolean
      social_enable_qr_code: boolean
      profile_views: number
    }, ExtArgs["result"]["link"]>
    composites: {}
  }

  type LinkGetPayload<S extends boolean | null | undefined | LinkDefaultArgs> = $Result.GetResult<Prisma.$LinkPayload, S>

  type LinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LinkCountAggregateInputType | true
    }

  export interface LinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Link'], meta: { name: 'Link' } }
    /**
     * Find zero or one Link that matches the filter.
     * @param {LinkFindUniqueArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LinkFindUniqueArgs>(args: SelectSubset<T, LinkFindUniqueArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Link that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LinkFindUniqueOrThrowArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LinkFindUniqueOrThrowArgs>(args: SelectSubset<T, LinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Link that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LinkFindFirstArgs>(args?: SelectSubset<T, LinkFindFirstArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Link that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstOrThrowArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LinkFindFirstOrThrowArgs>(args?: SelectSubset<T, LinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Links
     * const links = await prisma.link.findMany()
     * 
     * // Get first 10 Links
     * const links = await prisma.link.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const linkWithIdOnly = await prisma.link.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LinkFindManyArgs>(args?: SelectSubset<T, LinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Link.
     * @param {LinkCreateArgs} args - Arguments to create a Link.
     * @example
     * // Create one Link
     * const Link = await prisma.link.create({
     *   data: {
     *     // ... data to create a Link
     *   }
     * })
     * 
     */
    create<T extends LinkCreateArgs>(args: SelectSubset<T, LinkCreateArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Links.
     * @param {LinkCreateManyArgs} args - Arguments to create many Links.
     * @example
     * // Create many Links
     * const link = await prisma.link.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LinkCreateManyArgs>(args?: SelectSubset<T, LinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Links and returns the data saved in the database.
     * @param {LinkCreateManyAndReturnArgs} args - Arguments to create many Links.
     * @example
     * // Create many Links
     * const link = await prisma.link.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Links and only return the `id`
     * const linkWithIdOnly = await prisma.link.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LinkCreateManyAndReturnArgs>(args?: SelectSubset<T, LinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Link.
     * @param {LinkDeleteArgs} args - Arguments to delete one Link.
     * @example
     * // Delete one Link
     * const Link = await prisma.link.delete({
     *   where: {
     *     // ... filter to delete one Link
     *   }
     * })
     * 
     */
    delete<T extends LinkDeleteArgs>(args: SelectSubset<T, LinkDeleteArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Link.
     * @param {LinkUpdateArgs} args - Arguments to update one Link.
     * @example
     * // Update one Link
     * const link = await prisma.link.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LinkUpdateArgs>(args: SelectSubset<T, LinkUpdateArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Links.
     * @param {LinkDeleteManyArgs} args - Arguments to filter Links to delete.
     * @example
     * // Delete a few Links
     * const { count } = await prisma.link.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LinkDeleteManyArgs>(args?: SelectSubset<T, LinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Links
     * const link = await prisma.link.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LinkUpdateManyArgs>(args: SelectSubset<T, LinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links and returns the data updated in the database.
     * @param {LinkUpdateManyAndReturnArgs} args - Arguments to update many Links.
     * @example
     * // Update many Links
     * const link = await prisma.link.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Links and only return the `id`
     * const linkWithIdOnly = await prisma.link.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LinkUpdateManyAndReturnArgs>(args: SelectSubset<T, LinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Link.
     * @param {LinkUpsertArgs} args - Arguments to update or create a Link.
     * @example
     * // Update or create a Link
     * const link = await prisma.link.upsert({
     *   create: {
     *     // ... data to create a Link
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Link we want to update
     *   }
     * })
     */
    upsert<T extends LinkUpsertArgs>(args: SelectSubset<T, LinkUpsertArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkCountArgs} args - Arguments to filter Links to count.
     * @example
     * // Count the number of Links
     * const count = await prisma.link.count({
     *   where: {
     *     // ... the filter for the Links we want to count
     *   }
     * })
    **/
    count<T extends LinkCountArgs>(
      args?: Subset<T, LinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LinkAggregateArgs>(args: Subset<T, LinkAggregateArgs>): Prisma.PrismaPromise<GetLinkAggregateType<T>>

    /**
     * Group by Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LinkGroupByArgs['orderBy'] }
        : { orderBy?: LinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Link model
   */
  readonly fields: LinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Link.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blocks<T extends Link$blocksArgs<ExtArgs> = {}>(args?: Subset<T, Link$blocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    socials<T extends Link$socialsArgs<ExtArgs> = {}>(args?: Subset<T, Link$socialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Link model
   */
  interface LinkFieldRefs {
    readonly id: FieldRef<"Link", 'String'>
    readonly phone: FieldRef<"Link", 'String'>
    readonly website: FieldRef<"Link", 'String'>
    readonly instagram: FieldRef<"Link", 'String'>
    readonly twitter: FieldRef<"Link", 'String'>
    readonly displayname: FieldRef<"Link", 'String'>
    readonly bio: FieldRef<"Link", 'String'>
    readonly userName: FieldRef<"Link", 'String'>
    readonly userId: FieldRef<"Link", 'String'>
    readonly general_styles_desktop_bgcolor: FieldRef<"Link", 'String'>
    readonly general_styles_primary_text_color: FieldRef<"Link", 'String'>
    readonly general_styles_primary_bgcolor: FieldRef<"Link", 'String'>
    readonly general_styles_is_secondary_bgcolor: FieldRef<"Link", 'Boolean'>
    readonly general_styles_is_label_exist: FieldRef<"Link", 'Boolean'>
    readonly general_styles_secondary_bgcolor: FieldRef<"Link", 'String'>
    readonly general_styles_soft_shadow: FieldRef<"Link", 'Boolean'>
    readonly header_styles_profile_shadow: FieldRef<"Link", 'Float'>
    readonly header_styles_profile_border_width: FieldRef<"Link", 'Float'>
    readonly header_styles_profile_border_color: FieldRef<"Link", 'String'>
    readonly header_styles_collapse_long_bio: FieldRef<"Link", 'Boolean'>
    readonly header_styles_social_icons_size: FieldRef<"Link", 'Float'>
    readonly card_styles_design: FieldRef<"Link", 'Int'>
    readonly card_styles_card_color: FieldRef<"Link", 'String'>
    readonly card_styles_text_color: FieldRef<"Link", 'String'>
    readonly card_styles_label_color: FieldRef<"Link", 'String'>
    readonly card_styles_label_text_color: FieldRef<"Link", 'String'>
    readonly card_styles_card_corner: FieldRef<"Link", 'Float'>
    readonly card_styles_card_border_width: FieldRef<"Link", 'Float'>
    readonly card_styles_card_border_color: FieldRef<"Link", 'String'>
    readonly card_styles_card_shadow: FieldRef<"Link", 'Float'>
    readonly card_styles_card_spacing: FieldRef<"Link", 'Float'>
    readonly title_font: FieldRef<"Link", 'String'>
    readonly text_font: FieldRef<"Link", 'String'>
    readonly social_enable_add_contacts: FieldRef<"Link", 'Boolean'>
    readonly social_enable_share_btn: FieldRef<"Link", 'Boolean'>
    readonly social_enable_search: FieldRef<"Link", 'Boolean'>
    readonly social_enable_qr_code: FieldRef<"Link", 'Boolean'>
    readonly profile_views: FieldRef<"Link", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Link findUnique
   */
  export type LinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link findUniqueOrThrow
   */
  export type LinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link findFirst
   */
  export type LinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
     */
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link findFirstOrThrow
   */
  export type LinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
     */
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link findMany
   */
  export type LinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Links to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link create
   */
  export type LinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * The data needed to create a Link.
     */
    data: XOR<LinkCreateInput, LinkUncheckedCreateInput>
  }

  /**
   * Link createMany
   */
  export type LinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Links.
     */
    data: LinkCreateManyInput | LinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Link createManyAndReturn
   */
  export type LinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The data used to create many Links.
     */
    data: LinkCreateManyInput | LinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Link update
   */
  export type LinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * The data needed to update a Link.
     */
    data: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
    /**
     * Choose, which Link to update.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link updateMany
   */
  export type LinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Links.
     */
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyInput>
    /**
     * Filter which Links to update
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to update.
     */
    limit?: number
  }

  /**
   * Link updateManyAndReturn
   */
  export type LinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The data used to update Links.
     */
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyInput>
    /**
     * Filter which Links to update
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Link upsert
   */
  export type LinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * The filter to search for the Link to update in case it exists.
     */
    where: LinkWhereUniqueInput
    /**
     * In case the Link found by the `where` argument doesn't exist, create a new Link with this data.
     */
    create: XOR<LinkCreateInput, LinkUncheckedCreateInput>
    /**
     * In case the Link was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
  }

  /**
   * Link delete
   */
  export type LinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter which Link to delete.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link deleteMany
   */
  export type LinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Links to delete
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to delete.
     */
    limit?: number
  }

  /**
   * Link.blocks
   */
  export type Link$blocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    where?: BlockWhereInput
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    cursor?: BlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Link.socials
   */
  export type Link$socialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    where?: SocialWhereInput
    orderBy?: SocialOrderByWithRelationInput | SocialOrderByWithRelationInput[]
    cursor?: SocialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SocialScalarFieldEnum | SocialScalarFieldEnum[]
  }

  /**
   * Link without action
   */
  export type LinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
  }


  /**
   * Model Block
   */

  export type AggregateBlock = {
    _count: BlockCountAggregateOutputType | null
    _avg: BlockAvgAggregateOutputType | null
    _sum: BlockSumAggregateOutputType | null
    _min: BlockMinAggregateOutputType | null
    _max: BlockMaxAggregateOutputType | null
  }

  export type BlockAvgAggregateOutputType = {
    style: number | null
    order: number | null
    corner: number | null
    clicks: number | null
    views: number | null
  }

  export type BlockSumAggregateOutputType = {
    style: number | null
    order: number | null
    corner: number | null
    clicks: number | null
    views: number | null
  }

  export type BlockMinAggregateOutputType = {
    id: string | null
    style: number | null
    type: $Enums.BlockType | null
    title: string | null
    description: string | null
    text: string | null
    text_align: string | null
    text_color: string | null
    animation: string | null
    bg_image: string | null
    custom_text_color: string | null
    url: string | null
    order: number | null
    corner: number | null
    layout: string | null
    clicks: number | null
    views: number | null
    linkId: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BlockMaxAggregateOutputType = {
    id: string | null
    style: number | null
    type: $Enums.BlockType | null
    title: string | null
    description: string | null
    text: string | null
    text_align: string | null
    text_color: string | null
    animation: string | null
    bg_image: string | null
    custom_text_color: string | null
    url: string | null
    order: number | null
    corner: number | null
    layout: string | null
    clicks: number | null
    views: number | null
    linkId: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BlockCountAggregateOutputType = {
    id: number
    style: number
    type: number
    title: number
    description: number
    text: number
    text_align: number
    text_color: number
    animation: number
    bg_image: number
    custom_text_color: number
    url: number
    order: number
    corner: number
    layout: number
    clicks: number
    views: number
    linkId: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BlockAvgAggregateInputType = {
    style?: true
    order?: true
    corner?: true
    clicks?: true
    views?: true
  }

  export type BlockSumAggregateInputType = {
    style?: true
    order?: true
    corner?: true
    clicks?: true
    views?: true
  }

  export type BlockMinAggregateInputType = {
    id?: true
    style?: true
    type?: true
    title?: true
    description?: true
    text?: true
    text_align?: true
    text_color?: true
    animation?: true
    bg_image?: true
    custom_text_color?: true
    url?: true
    order?: true
    corner?: true
    layout?: true
    clicks?: true
    views?: true
    linkId?: true
    created_at?: true
    updated_at?: true
  }

  export type BlockMaxAggregateInputType = {
    id?: true
    style?: true
    type?: true
    title?: true
    description?: true
    text?: true
    text_align?: true
    text_color?: true
    animation?: true
    bg_image?: true
    custom_text_color?: true
    url?: true
    order?: true
    corner?: true
    layout?: true
    clicks?: true
    views?: true
    linkId?: true
    created_at?: true
    updated_at?: true
  }

  export type BlockCountAggregateInputType = {
    id?: true
    style?: true
    type?: true
    title?: true
    description?: true
    text?: true
    text_align?: true
    text_color?: true
    animation?: true
    bg_image?: true
    custom_text_color?: true
    url?: true
    order?: true
    corner?: true
    layout?: true
    clicks?: true
    views?: true
    linkId?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Block to aggregate.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Blocks
    **/
    _count?: true | BlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlockMaxAggregateInputType
  }

  export type GetBlockAggregateType<T extends BlockAggregateArgs> = {
        [P in keyof T & keyof AggregateBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlock[P]>
      : GetScalarType<T[P], AggregateBlock[P]>
  }




  export type BlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockWhereInput
    orderBy?: BlockOrderByWithAggregationInput | BlockOrderByWithAggregationInput[]
    by: BlockScalarFieldEnum[] | BlockScalarFieldEnum
    having?: BlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlockCountAggregateInputType | true
    _avg?: BlockAvgAggregateInputType
    _sum?: BlockSumAggregateInputType
    _min?: BlockMinAggregateInputType
    _max?: BlockMaxAggregateInputType
  }

  export type BlockGroupByOutputType = {
    id: string
    style: number
    type: $Enums.BlockType
    title: string
    description: string
    text: string
    text_align: string
    text_color: string
    animation: string
    bg_image: string
    custom_text_color: string
    url: string
    order: number
    corner: number
    layout: string
    clicks: number
    views: number
    linkId: string
    created_at: Date
    updated_at: Date
    _count: BlockCountAggregateOutputType | null
    _avg: BlockAvgAggregateOutputType | null
    _sum: BlockSumAggregateOutputType | null
    _min: BlockMinAggregateOutputType | null
    _max: BlockMaxAggregateOutputType | null
  }

  type GetBlockGroupByPayload<T extends BlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlockGroupByOutputType[P]>
            : GetScalarType<T[P], BlockGroupByOutputType[P]>
        }
      >
    >


  export type BlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    style?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    text?: boolean
    text_align?: boolean
    text_color?: boolean
    animation?: boolean
    bg_image?: boolean
    custom_text_color?: boolean
    url?: boolean
    order?: boolean
    corner?: boolean
    layout?: boolean
    clicks?: boolean
    views?: boolean
    linkId?: boolean
    created_at?: boolean
    updated_at?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    style?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    text?: boolean
    text_align?: boolean
    text_color?: boolean
    animation?: boolean
    bg_image?: boolean
    custom_text_color?: boolean
    url?: boolean
    order?: boolean
    corner?: boolean
    layout?: boolean
    clicks?: boolean
    views?: boolean
    linkId?: boolean
    created_at?: boolean
    updated_at?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    style?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    text?: boolean
    text_align?: boolean
    text_color?: boolean
    animation?: boolean
    bg_image?: boolean
    custom_text_color?: boolean
    url?: boolean
    order?: boolean
    corner?: boolean
    layout?: boolean
    clicks?: boolean
    views?: boolean
    linkId?: boolean
    created_at?: boolean
    updated_at?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectScalar = {
    id?: boolean
    style?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    text?: boolean
    text_align?: boolean
    text_color?: boolean
    animation?: boolean
    bg_image?: boolean
    custom_text_color?: boolean
    url?: boolean
    order?: boolean
    corner?: boolean
    layout?: boolean
    clicks?: boolean
    views?: boolean
    linkId?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BlockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "style" | "type" | "title" | "description" | "text" | "text_align" | "text_color" | "animation" | "bg_image" | "custom_text_color" | "url" | "order" | "corner" | "layout" | "clicks" | "views" | "linkId" | "created_at" | "updated_at", ExtArgs["result"]["block"]>
  export type BlockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }
  export type BlockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }
  export type BlockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }

  export type $BlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Block"
    objects: {
      link: Prisma.$LinkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      style: number
      type: $Enums.BlockType
      title: string
      description: string
      text: string
      text_align: string
      text_color: string
      animation: string
      bg_image: string
      custom_text_color: string
      url: string
      order: number
      corner: number
      layout: string
      clicks: number
      views: number
      linkId: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["block"]>
    composites: {}
  }

  type BlockGetPayload<S extends boolean | null | undefined | BlockDefaultArgs> = $Result.GetResult<Prisma.$BlockPayload, S>

  type BlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlockCountAggregateInputType | true
    }

  export interface BlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Block'], meta: { name: 'Block' } }
    /**
     * Find zero or one Block that matches the filter.
     * @param {BlockFindUniqueArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlockFindUniqueArgs>(args: SelectSubset<T, BlockFindUniqueArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Block that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlockFindUniqueOrThrowArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlockFindUniqueOrThrowArgs>(args: SelectSubset<T, BlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Block that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindFirstArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlockFindFirstArgs>(args?: SelectSubset<T, BlockFindFirstArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Block that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindFirstOrThrowArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlockFindFirstOrThrowArgs>(args?: SelectSubset<T, BlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Blocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blocks
     * const blocks = await prisma.block.findMany()
     * 
     * // Get first 10 Blocks
     * const blocks = await prisma.block.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blockWithIdOnly = await prisma.block.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlockFindManyArgs>(args?: SelectSubset<T, BlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Block.
     * @param {BlockCreateArgs} args - Arguments to create a Block.
     * @example
     * // Create one Block
     * const Block = await prisma.block.create({
     *   data: {
     *     // ... data to create a Block
     *   }
     * })
     * 
     */
    create<T extends BlockCreateArgs>(args: SelectSubset<T, BlockCreateArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Blocks.
     * @param {BlockCreateManyArgs} args - Arguments to create many Blocks.
     * @example
     * // Create many Blocks
     * const block = await prisma.block.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlockCreateManyArgs>(args?: SelectSubset<T, BlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Blocks and returns the data saved in the database.
     * @param {BlockCreateManyAndReturnArgs} args - Arguments to create many Blocks.
     * @example
     * // Create many Blocks
     * const block = await prisma.block.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Blocks and only return the `id`
     * const blockWithIdOnly = await prisma.block.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlockCreateManyAndReturnArgs>(args?: SelectSubset<T, BlockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Block.
     * @param {BlockDeleteArgs} args - Arguments to delete one Block.
     * @example
     * // Delete one Block
     * const Block = await prisma.block.delete({
     *   where: {
     *     // ... filter to delete one Block
     *   }
     * })
     * 
     */
    delete<T extends BlockDeleteArgs>(args: SelectSubset<T, BlockDeleteArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Block.
     * @param {BlockUpdateArgs} args - Arguments to update one Block.
     * @example
     * // Update one Block
     * const block = await prisma.block.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlockUpdateArgs>(args: SelectSubset<T, BlockUpdateArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Blocks.
     * @param {BlockDeleteManyArgs} args - Arguments to filter Blocks to delete.
     * @example
     * // Delete a few Blocks
     * const { count } = await prisma.block.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlockDeleteManyArgs>(args?: SelectSubset<T, BlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blocks
     * const block = await prisma.block.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlockUpdateManyArgs>(args: SelectSubset<T, BlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blocks and returns the data updated in the database.
     * @param {BlockUpdateManyAndReturnArgs} args - Arguments to update many Blocks.
     * @example
     * // Update many Blocks
     * const block = await prisma.block.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Blocks and only return the `id`
     * const blockWithIdOnly = await prisma.block.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlockUpdateManyAndReturnArgs>(args: SelectSubset<T, BlockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Block.
     * @param {BlockUpsertArgs} args - Arguments to update or create a Block.
     * @example
     * // Update or create a Block
     * const block = await prisma.block.upsert({
     *   create: {
     *     // ... data to create a Block
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Block we want to update
     *   }
     * })
     */
    upsert<T extends BlockUpsertArgs>(args: SelectSubset<T, BlockUpsertArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Blocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockCountArgs} args - Arguments to filter Blocks to count.
     * @example
     * // Count the number of Blocks
     * const count = await prisma.block.count({
     *   where: {
     *     // ... the filter for the Blocks we want to count
     *   }
     * })
    **/
    count<T extends BlockCountArgs>(
      args?: Subset<T, BlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Block.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlockAggregateArgs>(args: Subset<T, BlockAggregateArgs>): Prisma.PrismaPromise<GetBlockAggregateType<T>>

    /**
     * Group by Block.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlockGroupByArgs['orderBy'] }
        : { orderBy?: BlockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Block model
   */
  readonly fields: BlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Block.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    link<T extends LinkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LinkDefaultArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Block model
   */
  interface BlockFieldRefs {
    readonly id: FieldRef<"Block", 'String'>
    readonly style: FieldRef<"Block", 'Int'>
    readonly type: FieldRef<"Block", 'BlockType'>
    readonly title: FieldRef<"Block", 'String'>
    readonly description: FieldRef<"Block", 'String'>
    readonly text: FieldRef<"Block", 'String'>
    readonly text_align: FieldRef<"Block", 'String'>
    readonly text_color: FieldRef<"Block", 'String'>
    readonly animation: FieldRef<"Block", 'String'>
    readonly bg_image: FieldRef<"Block", 'String'>
    readonly custom_text_color: FieldRef<"Block", 'String'>
    readonly url: FieldRef<"Block", 'String'>
    readonly order: FieldRef<"Block", 'Int'>
    readonly corner: FieldRef<"Block", 'Int'>
    readonly layout: FieldRef<"Block", 'String'>
    readonly clicks: FieldRef<"Block", 'Int'>
    readonly views: FieldRef<"Block", 'Int'>
    readonly linkId: FieldRef<"Block", 'String'>
    readonly created_at: FieldRef<"Block", 'DateTime'>
    readonly updated_at: FieldRef<"Block", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Block findUnique
   */
  export type BlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block findUniqueOrThrow
   */
  export type BlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block findFirst
   */
  export type BlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blocks.
     */
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block findFirstOrThrow
   */
  export type BlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blocks.
     */
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block findMany
   */
  export type BlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Blocks to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block create
   */
  export type BlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The data needed to create a Block.
     */
    data: XOR<BlockCreateInput, BlockUncheckedCreateInput>
  }

  /**
   * Block createMany
   */
  export type BlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Blocks.
     */
    data: BlockCreateManyInput | BlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Block createManyAndReturn
   */
  export type BlockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * The data used to create many Blocks.
     */
    data: BlockCreateManyInput | BlockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Block update
   */
  export type BlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The data needed to update a Block.
     */
    data: XOR<BlockUpdateInput, BlockUncheckedUpdateInput>
    /**
     * Choose, which Block to update.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block updateMany
   */
  export type BlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Blocks.
     */
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyInput>
    /**
     * Filter which Blocks to update
     */
    where?: BlockWhereInput
    /**
     * Limit how many Blocks to update.
     */
    limit?: number
  }

  /**
   * Block updateManyAndReturn
   */
  export type BlockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * The data used to update Blocks.
     */
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyInput>
    /**
     * Filter which Blocks to update
     */
    where?: BlockWhereInput
    /**
     * Limit how many Blocks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Block upsert
   */
  export type BlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The filter to search for the Block to update in case it exists.
     */
    where: BlockWhereUniqueInput
    /**
     * In case the Block found by the `where` argument doesn't exist, create a new Block with this data.
     */
    create: XOR<BlockCreateInput, BlockUncheckedCreateInput>
    /**
     * In case the Block was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlockUpdateInput, BlockUncheckedUpdateInput>
  }

  /**
   * Block delete
   */
  export type BlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter which Block to delete.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block deleteMany
   */
  export type BlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blocks to delete
     */
    where?: BlockWhereInput
    /**
     * Limit how many Blocks to delete.
     */
    limit?: number
  }

  /**
   * Block without action
   */
  export type BlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
  }


  /**
   * Model Social
   */

  export type AggregateSocial = {
    _count: SocialCountAggregateOutputType | null
    _avg: SocialAvgAggregateOutputType | null
    _sum: SocialSumAggregateOutputType | null
    _min: SocialMinAggregateOutputType | null
    _max: SocialMaxAggregateOutputType | null
  }

  export type SocialAvgAggregateOutputType = {
    order: number | null
    clicks: number | null
  }

  export type SocialSumAggregateOutputType = {
    order: number | null
    clicks: number | null
  }

  export type SocialMinAggregateOutputType = {
    id: string | null
    icon: string | null
    url: string | null
    order: number | null
    label: string | null
    clicks: number | null
    linkId: string | null
  }

  export type SocialMaxAggregateOutputType = {
    id: string | null
    icon: string | null
    url: string | null
    order: number | null
    label: string | null
    clicks: number | null
    linkId: string | null
  }

  export type SocialCountAggregateOutputType = {
    id: number
    icon: number
    url: number
    order: number
    label: number
    clicks: number
    linkId: number
    _all: number
  }


  export type SocialAvgAggregateInputType = {
    order?: true
    clicks?: true
  }

  export type SocialSumAggregateInputType = {
    order?: true
    clicks?: true
  }

  export type SocialMinAggregateInputType = {
    id?: true
    icon?: true
    url?: true
    order?: true
    label?: true
    clicks?: true
    linkId?: true
  }

  export type SocialMaxAggregateInputType = {
    id?: true
    icon?: true
    url?: true
    order?: true
    label?: true
    clicks?: true
    linkId?: true
  }

  export type SocialCountAggregateInputType = {
    id?: true
    icon?: true
    url?: true
    order?: true
    label?: true
    clicks?: true
    linkId?: true
    _all?: true
  }

  export type SocialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Social to aggregate.
     */
    where?: SocialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Socials to fetch.
     */
    orderBy?: SocialOrderByWithRelationInput | SocialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SocialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Socials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Socials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Socials
    **/
    _count?: true | SocialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SocialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SocialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SocialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SocialMaxAggregateInputType
  }

  export type GetSocialAggregateType<T extends SocialAggregateArgs> = {
        [P in keyof T & keyof AggregateSocial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSocial[P]>
      : GetScalarType<T[P], AggregateSocial[P]>
  }




  export type SocialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialWhereInput
    orderBy?: SocialOrderByWithAggregationInput | SocialOrderByWithAggregationInput[]
    by: SocialScalarFieldEnum[] | SocialScalarFieldEnum
    having?: SocialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SocialCountAggregateInputType | true
    _avg?: SocialAvgAggregateInputType
    _sum?: SocialSumAggregateInputType
    _min?: SocialMinAggregateInputType
    _max?: SocialMaxAggregateInputType
  }

  export type SocialGroupByOutputType = {
    id: string
    icon: string
    url: string
    order: number
    label: string | null
    clicks: number
    linkId: string
    _count: SocialCountAggregateOutputType | null
    _avg: SocialAvgAggregateOutputType | null
    _sum: SocialSumAggregateOutputType | null
    _min: SocialMinAggregateOutputType | null
    _max: SocialMaxAggregateOutputType | null
  }

  type GetSocialGroupByPayload<T extends SocialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SocialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SocialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SocialGroupByOutputType[P]>
            : GetScalarType<T[P], SocialGroupByOutputType[P]>
        }
      >
    >


  export type SocialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    icon?: boolean
    url?: boolean
    order?: boolean
    label?: boolean
    clicks?: boolean
    linkId?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["social"]>

  export type SocialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    icon?: boolean
    url?: boolean
    order?: boolean
    label?: boolean
    clicks?: boolean
    linkId?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["social"]>

  export type SocialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    icon?: boolean
    url?: boolean
    order?: boolean
    label?: boolean
    clicks?: boolean
    linkId?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["social"]>

  export type SocialSelectScalar = {
    id?: boolean
    icon?: boolean
    url?: boolean
    order?: boolean
    label?: boolean
    clicks?: boolean
    linkId?: boolean
  }

  export type SocialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "icon" | "url" | "order" | "label" | "clicks" | "linkId", ExtArgs["result"]["social"]>
  export type SocialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }
  export type SocialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }
  export type SocialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }

  export type $SocialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Social"
    objects: {
      link: Prisma.$LinkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      icon: string
      url: string
      order: number
      label: string | null
      clicks: number
      linkId: string
    }, ExtArgs["result"]["social"]>
    composites: {}
  }

  type SocialGetPayload<S extends boolean | null | undefined | SocialDefaultArgs> = $Result.GetResult<Prisma.$SocialPayload, S>

  type SocialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SocialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SocialCountAggregateInputType | true
    }

  export interface SocialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Social'], meta: { name: 'Social' } }
    /**
     * Find zero or one Social that matches the filter.
     * @param {SocialFindUniqueArgs} args - Arguments to find a Social
     * @example
     * // Get one Social
     * const social = await prisma.social.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SocialFindUniqueArgs>(args: SelectSubset<T, SocialFindUniqueArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Social that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SocialFindUniqueOrThrowArgs} args - Arguments to find a Social
     * @example
     * // Get one Social
     * const social = await prisma.social.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SocialFindUniqueOrThrowArgs>(args: SelectSubset<T, SocialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Social that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialFindFirstArgs} args - Arguments to find a Social
     * @example
     * // Get one Social
     * const social = await prisma.social.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SocialFindFirstArgs>(args?: SelectSubset<T, SocialFindFirstArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Social that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialFindFirstOrThrowArgs} args - Arguments to find a Social
     * @example
     * // Get one Social
     * const social = await prisma.social.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SocialFindFirstOrThrowArgs>(args?: SelectSubset<T, SocialFindFirstOrThrowArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Socials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Socials
     * const socials = await prisma.social.findMany()
     * 
     * // Get first 10 Socials
     * const socials = await prisma.social.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const socialWithIdOnly = await prisma.social.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SocialFindManyArgs>(args?: SelectSubset<T, SocialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Social.
     * @param {SocialCreateArgs} args - Arguments to create a Social.
     * @example
     * // Create one Social
     * const Social = await prisma.social.create({
     *   data: {
     *     // ... data to create a Social
     *   }
     * })
     * 
     */
    create<T extends SocialCreateArgs>(args: SelectSubset<T, SocialCreateArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Socials.
     * @param {SocialCreateManyArgs} args - Arguments to create many Socials.
     * @example
     * // Create many Socials
     * const social = await prisma.social.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SocialCreateManyArgs>(args?: SelectSubset<T, SocialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Socials and returns the data saved in the database.
     * @param {SocialCreateManyAndReturnArgs} args - Arguments to create many Socials.
     * @example
     * // Create many Socials
     * const social = await prisma.social.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Socials and only return the `id`
     * const socialWithIdOnly = await prisma.social.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SocialCreateManyAndReturnArgs>(args?: SelectSubset<T, SocialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Social.
     * @param {SocialDeleteArgs} args - Arguments to delete one Social.
     * @example
     * // Delete one Social
     * const Social = await prisma.social.delete({
     *   where: {
     *     // ... filter to delete one Social
     *   }
     * })
     * 
     */
    delete<T extends SocialDeleteArgs>(args: SelectSubset<T, SocialDeleteArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Social.
     * @param {SocialUpdateArgs} args - Arguments to update one Social.
     * @example
     * // Update one Social
     * const social = await prisma.social.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SocialUpdateArgs>(args: SelectSubset<T, SocialUpdateArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Socials.
     * @param {SocialDeleteManyArgs} args - Arguments to filter Socials to delete.
     * @example
     * // Delete a few Socials
     * const { count } = await prisma.social.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SocialDeleteManyArgs>(args?: SelectSubset<T, SocialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Socials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Socials
     * const social = await prisma.social.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SocialUpdateManyArgs>(args: SelectSubset<T, SocialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Socials and returns the data updated in the database.
     * @param {SocialUpdateManyAndReturnArgs} args - Arguments to update many Socials.
     * @example
     * // Update many Socials
     * const social = await prisma.social.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Socials and only return the `id`
     * const socialWithIdOnly = await prisma.social.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SocialUpdateManyAndReturnArgs>(args: SelectSubset<T, SocialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Social.
     * @param {SocialUpsertArgs} args - Arguments to update or create a Social.
     * @example
     * // Update or create a Social
     * const social = await prisma.social.upsert({
     *   create: {
     *     // ... data to create a Social
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Social we want to update
     *   }
     * })
     */
    upsert<T extends SocialUpsertArgs>(args: SelectSubset<T, SocialUpsertArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Socials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialCountArgs} args - Arguments to filter Socials to count.
     * @example
     * // Count the number of Socials
     * const count = await prisma.social.count({
     *   where: {
     *     // ... the filter for the Socials we want to count
     *   }
     * })
    **/
    count<T extends SocialCountArgs>(
      args?: Subset<T, SocialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SocialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Social.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SocialAggregateArgs>(args: Subset<T, SocialAggregateArgs>): Prisma.PrismaPromise<GetSocialAggregateType<T>>

    /**
     * Group by Social.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SocialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SocialGroupByArgs['orderBy'] }
        : { orderBy?: SocialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SocialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Social model
   */
  readonly fields: SocialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Social.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SocialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    link<T extends LinkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LinkDefaultArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Social model
   */
  interface SocialFieldRefs {
    readonly id: FieldRef<"Social", 'String'>
    readonly icon: FieldRef<"Social", 'String'>
    readonly url: FieldRef<"Social", 'String'>
    readonly order: FieldRef<"Social", 'Int'>
    readonly label: FieldRef<"Social", 'String'>
    readonly clicks: FieldRef<"Social", 'Int'>
    readonly linkId: FieldRef<"Social", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Social findUnique
   */
  export type SocialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter, which Social to fetch.
     */
    where: SocialWhereUniqueInput
  }

  /**
   * Social findUniqueOrThrow
   */
  export type SocialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter, which Social to fetch.
     */
    where: SocialWhereUniqueInput
  }

  /**
   * Social findFirst
   */
  export type SocialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter, which Social to fetch.
     */
    where?: SocialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Socials to fetch.
     */
    orderBy?: SocialOrderByWithRelationInput | SocialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Socials.
     */
    cursor?: SocialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Socials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Socials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Socials.
     */
    distinct?: SocialScalarFieldEnum | SocialScalarFieldEnum[]
  }

  /**
   * Social findFirstOrThrow
   */
  export type SocialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter, which Social to fetch.
     */
    where?: SocialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Socials to fetch.
     */
    orderBy?: SocialOrderByWithRelationInput | SocialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Socials.
     */
    cursor?: SocialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Socials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Socials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Socials.
     */
    distinct?: SocialScalarFieldEnum | SocialScalarFieldEnum[]
  }

  /**
   * Social findMany
   */
  export type SocialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter, which Socials to fetch.
     */
    where?: SocialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Socials to fetch.
     */
    orderBy?: SocialOrderByWithRelationInput | SocialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Socials.
     */
    cursor?: SocialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Socials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Socials.
     */
    skip?: number
    distinct?: SocialScalarFieldEnum | SocialScalarFieldEnum[]
  }

  /**
   * Social create
   */
  export type SocialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * The data needed to create a Social.
     */
    data: XOR<SocialCreateInput, SocialUncheckedCreateInput>
  }

  /**
   * Social createMany
   */
  export type SocialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Socials.
     */
    data: SocialCreateManyInput | SocialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Social createManyAndReturn
   */
  export type SocialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * The data used to create many Socials.
     */
    data: SocialCreateManyInput | SocialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Social update
   */
  export type SocialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * The data needed to update a Social.
     */
    data: XOR<SocialUpdateInput, SocialUncheckedUpdateInput>
    /**
     * Choose, which Social to update.
     */
    where: SocialWhereUniqueInput
  }

  /**
   * Social updateMany
   */
  export type SocialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Socials.
     */
    data: XOR<SocialUpdateManyMutationInput, SocialUncheckedUpdateManyInput>
    /**
     * Filter which Socials to update
     */
    where?: SocialWhereInput
    /**
     * Limit how many Socials to update.
     */
    limit?: number
  }

  /**
   * Social updateManyAndReturn
   */
  export type SocialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * The data used to update Socials.
     */
    data: XOR<SocialUpdateManyMutationInput, SocialUncheckedUpdateManyInput>
    /**
     * Filter which Socials to update
     */
    where?: SocialWhereInput
    /**
     * Limit how many Socials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Social upsert
   */
  export type SocialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * The filter to search for the Social to update in case it exists.
     */
    where: SocialWhereUniqueInput
    /**
     * In case the Social found by the `where` argument doesn't exist, create a new Social with this data.
     */
    create: XOR<SocialCreateInput, SocialUncheckedCreateInput>
    /**
     * In case the Social was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SocialUpdateInput, SocialUncheckedUpdateInput>
  }

  /**
   * Social delete
   */
  export type SocialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter which Social to delete.
     */
    where: SocialWhereUniqueInput
  }

  /**
   * Social deleteMany
   */
  export type SocialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Socials to delete
     */
    where?: SocialWhereInput
    /**
     * Limit how many Socials to delete.
     */
    limit?: number
  }

  /**
   * Social without action
   */
  export type SocialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullname: 'fullname',
    email: 'email',
    password: 'password',
    avatar: 'avatar',
    createdAt: 'createdAt',
    is_confirmed: 'is_confirmed',
    resetToken: 'resetToken',
    resetTokenExpires: 'resetTokenExpires'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ActivationCodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    expiresAt: 'expiresAt',
    used: 'used',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type ActivationCodeScalarFieldEnum = (typeof ActivationCodeScalarFieldEnum)[keyof typeof ActivationCodeScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const LinkScalarFieldEnum: {
    id: 'id',
    phone: 'phone',
    website: 'website',
    instagram: 'instagram',
    twitter: 'twitter',
    displayname: 'displayname',
    bio: 'bio',
    userName: 'userName',
    userId: 'userId',
    general_styles_desktop_bgcolor: 'general_styles_desktop_bgcolor',
    general_styles_primary_text_color: 'general_styles_primary_text_color',
    general_styles_primary_bgcolor: 'general_styles_primary_bgcolor',
    general_styles_is_secondary_bgcolor: 'general_styles_is_secondary_bgcolor',
    general_styles_is_label_exist: 'general_styles_is_label_exist',
    general_styles_secondary_bgcolor: 'general_styles_secondary_bgcolor',
    general_styles_soft_shadow: 'general_styles_soft_shadow',
    header_styles_profile_shadow: 'header_styles_profile_shadow',
    header_styles_profile_border_width: 'header_styles_profile_border_width',
    header_styles_profile_border_color: 'header_styles_profile_border_color',
    header_styles_collapse_long_bio: 'header_styles_collapse_long_bio',
    header_styles_social_icons_size: 'header_styles_social_icons_size',
    card_styles_design: 'card_styles_design',
    card_styles_card_color: 'card_styles_card_color',
    card_styles_text_color: 'card_styles_text_color',
    card_styles_label_color: 'card_styles_label_color',
    card_styles_label_text_color: 'card_styles_label_text_color',
    card_styles_card_corner: 'card_styles_card_corner',
    card_styles_card_border_width: 'card_styles_card_border_width',
    card_styles_card_border_color: 'card_styles_card_border_color',
    card_styles_card_shadow: 'card_styles_card_shadow',
    card_styles_card_spacing: 'card_styles_card_spacing',
    title_font: 'title_font',
    text_font: 'text_font',
    social_enable_add_contacts: 'social_enable_add_contacts',
    social_enable_share_btn: 'social_enable_share_btn',
    social_enable_search: 'social_enable_search',
    social_enable_qr_code: 'social_enable_qr_code',
    profile_views: 'profile_views'
  };

  export type LinkScalarFieldEnum = (typeof LinkScalarFieldEnum)[keyof typeof LinkScalarFieldEnum]


  export const BlockScalarFieldEnum: {
    id: 'id',
    style: 'style',
    type: 'type',
    title: 'title',
    description: 'description',
    text: 'text',
    text_align: 'text_align',
    text_color: 'text_color',
    animation: 'animation',
    bg_image: 'bg_image',
    custom_text_color: 'custom_text_color',
    url: 'url',
    order: 'order',
    corner: 'corner',
    layout: 'layout',
    clicks: 'clicks',
    views: 'views',
    linkId: 'linkId',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BlockScalarFieldEnum = (typeof BlockScalarFieldEnum)[keyof typeof BlockScalarFieldEnum]


  export const SocialScalarFieldEnum: {
    id: 'id',
    icon: 'icon',
    url: 'url',
    order: 'order',
    label: 'label',
    clicks: 'clicks',
    linkId: 'linkId'
  };

  export type SocialScalarFieldEnum = (typeof SocialScalarFieldEnum)[keyof typeof SocialScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BlockType'
   */
  export type EnumBlockTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlockType'>
    


  /**
   * Reference to a field of type 'BlockType[]'
   */
  export type ListEnumBlockTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlockType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    fullname?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    is_confirmed?: BoolFilter<"User"> | boolean
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    links?: LinkListRelationFilter
    activationCodes?: ActivationCodeListRelationFilter
    passwordResetToken?: XOR<PasswordResetTokenNullableScalarRelationFilter, PasswordResetTokenWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    is_confirmed?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpires?: SortOrderInput | SortOrder
    links?: LinkOrderByRelationAggregateInput
    activationCodes?: ActivationCodeOrderByRelationAggregateInput
    passwordResetToken?: PasswordResetTokenOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fullname?: string
    email?: string
    resetToken?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    avatar?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    is_confirmed?: BoolFilter<"User"> | boolean
    resetTokenExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    links?: LinkListRelationFilter
    activationCodes?: ActivationCodeListRelationFilter
    passwordResetToken?: XOR<PasswordResetTokenNullableScalarRelationFilter, PasswordResetTokenWhereInput> | null
  }, "id" | "fullname" | "email" | "resetToken">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    is_confirmed?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpires?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    fullname?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    is_confirmed?: BoolWithAggregatesFilter<"User"> | boolean
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type ActivationCodeWhereInput = {
    AND?: ActivationCodeWhereInput | ActivationCodeWhereInput[]
    OR?: ActivationCodeWhereInput[]
    NOT?: ActivationCodeWhereInput | ActivationCodeWhereInput[]
    id?: StringFilter<"ActivationCode"> | string
    code?: StringFilter<"ActivationCode"> | string
    expiresAt?: DateTimeFilter<"ActivationCode"> | Date | string
    used?: BoolFilter<"ActivationCode"> | boolean
    createdAt?: DateTimeFilter<"ActivationCode"> | Date | string
    userId?: StringFilter<"ActivationCode"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ActivationCodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActivationCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: ActivationCodeWhereInput | ActivationCodeWhereInput[]
    OR?: ActivationCodeWhereInput[]
    NOT?: ActivationCodeWhereInput | ActivationCodeWhereInput[]
    expiresAt?: DateTimeFilter<"ActivationCode"> | Date | string
    used?: BoolFilter<"ActivationCode"> | boolean
    createdAt?: DateTimeFilter<"ActivationCode"> | Date | string
    userId?: StringFilter<"ActivationCode"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "code">

  export type ActivationCodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: ActivationCodeCountOrderByAggregateInput
    _max?: ActivationCodeMaxOrderByAggregateInput
    _min?: ActivationCodeMinOrderByAggregateInput
  }

  export type ActivationCodeScalarWhereWithAggregatesInput = {
    AND?: ActivationCodeScalarWhereWithAggregatesInput | ActivationCodeScalarWhereWithAggregatesInput[]
    OR?: ActivationCodeScalarWhereWithAggregatesInput[]
    NOT?: ActivationCodeScalarWhereWithAggregatesInput | ActivationCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivationCode"> | string
    code?: StringWithAggregatesFilter<"ActivationCode"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"ActivationCode"> | Date | string
    used?: BoolWithAggregatesFilter<"ActivationCode"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ActivationCode"> | Date | string
    userId?: StringWithAggregatesFilter<"ActivationCode"> | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    userId?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token" | "userId">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    userId?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type LinkWhereInput = {
    AND?: LinkWhereInput | LinkWhereInput[]
    OR?: LinkWhereInput[]
    NOT?: LinkWhereInput | LinkWhereInput[]
    id?: StringFilter<"Link"> | string
    phone?: StringFilter<"Link"> | string
    website?: StringFilter<"Link"> | string
    instagram?: StringFilter<"Link"> | string
    twitter?: StringFilter<"Link"> | string
    displayname?: StringFilter<"Link"> | string
    bio?: StringFilter<"Link"> | string
    userName?: StringFilter<"Link"> | string
    userId?: StringFilter<"Link"> | string
    general_styles_desktop_bgcolor?: StringFilter<"Link"> | string
    general_styles_primary_text_color?: StringFilter<"Link"> | string
    general_styles_primary_bgcolor?: StringFilter<"Link"> | string
    general_styles_is_secondary_bgcolor?: BoolFilter<"Link"> | boolean
    general_styles_is_label_exist?: BoolFilter<"Link"> | boolean
    general_styles_secondary_bgcolor?: StringFilter<"Link"> | string
    general_styles_soft_shadow?: BoolFilter<"Link"> | boolean
    header_styles_profile_shadow?: FloatFilter<"Link"> | number
    header_styles_profile_border_width?: FloatFilter<"Link"> | number
    header_styles_profile_border_color?: StringFilter<"Link"> | string
    header_styles_collapse_long_bio?: BoolFilter<"Link"> | boolean
    header_styles_social_icons_size?: FloatFilter<"Link"> | number
    card_styles_design?: IntFilter<"Link"> | number
    card_styles_card_color?: StringFilter<"Link"> | string
    card_styles_text_color?: StringFilter<"Link"> | string
    card_styles_label_color?: StringFilter<"Link"> | string
    card_styles_label_text_color?: StringFilter<"Link"> | string
    card_styles_card_corner?: FloatFilter<"Link"> | number
    card_styles_card_border_width?: FloatFilter<"Link"> | number
    card_styles_card_border_color?: StringFilter<"Link"> | string
    card_styles_card_shadow?: FloatFilter<"Link"> | number
    card_styles_card_spacing?: FloatFilter<"Link"> | number
    title_font?: StringFilter<"Link"> | string
    text_font?: StringFilter<"Link"> | string
    social_enable_add_contacts?: BoolFilter<"Link"> | boolean
    social_enable_share_btn?: BoolFilter<"Link"> | boolean
    social_enable_search?: BoolFilter<"Link"> | boolean
    social_enable_qr_code?: BoolFilter<"Link"> | boolean
    profile_views?: IntFilter<"Link"> | number
    blocks?: BlockListRelationFilter
    socials?: SocialListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LinkOrderByWithRelationInput = {
    id?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    instagram?: SortOrder
    twitter?: SortOrder
    displayname?: SortOrder
    bio?: SortOrder
    userName?: SortOrder
    userId?: SortOrder
    general_styles_desktop_bgcolor?: SortOrder
    general_styles_primary_text_color?: SortOrder
    general_styles_primary_bgcolor?: SortOrder
    general_styles_is_secondary_bgcolor?: SortOrder
    general_styles_is_label_exist?: SortOrder
    general_styles_secondary_bgcolor?: SortOrder
    general_styles_soft_shadow?: SortOrder
    header_styles_profile_shadow?: SortOrder
    header_styles_profile_border_width?: SortOrder
    header_styles_profile_border_color?: SortOrder
    header_styles_collapse_long_bio?: SortOrder
    header_styles_social_icons_size?: SortOrder
    card_styles_design?: SortOrder
    card_styles_card_color?: SortOrder
    card_styles_text_color?: SortOrder
    card_styles_label_color?: SortOrder
    card_styles_label_text_color?: SortOrder
    card_styles_card_corner?: SortOrder
    card_styles_card_border_width?: SortOrder
    card_styles_card_border_color?: SortOrder
    card_styles_card_shadow?: SortOrder
    card_styles_card_spacing?: SortOrder
    title_font?: SortOrder
    text_font?: SortOrder
    social_enable_add_contacts?: SortOrder
    social_enable_share_btn?: SortOrder
    social_enable_search?: SortOrder
    social_enable_qr_code?: SortOrder
    profile_views?: SortOrder
    blocks?: BlockOrderByRelationAggregateInput
    socials?: SocialOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type LinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LinkWhereInput | LinkWhereInput[]
    OR?: LinkWhereInput[]
    NOT?: LinkWhereInput | LinkWhereInput[]
    phone?: StringFilter<"Link"> | string
    website?: StringFilter<"Link"> | string
    instagram?: StringFilter<"Link"> | string
    twitter?: StringFilter<"Link"> | string
    displayname?: StringFilter<"Link"> | string
    bio?: StringFilter<"Link"> | string
    userName?: StringFilter<"Link"> | string
    userId?: StringFilter<"Link"> | string
    general_styles_desktop_bgcolor?: StringFilter<"Link"> | string
    general_styles_primary_text_color?: StringFilter<"Link"> | string
    general_styles_primary_bgcolor?: StringFilter<"Link"> | string
    general_styles_is_secondary_bgcolor?: BoolFilter<"Link"> | boolean
    general_styles_is_label_exist?: BoolFilter<"Link"> | boolean
    general_styles_secondary_bgcolor?: StringFilter<"Link"> | string
    general_styles_soft_shadow?: BoolFilter<"Link"> | boolean
    header_styles_profile_shadow?: FloatFilter<"Link"> | number
    header_styles_profile_border_width?: FloatFilter<"Link"> | number
    header_styles_profile_border_color?: StringFilter<"Link"> | string
    header_styles_collapse_long_bio?: BoolFilter<"Link"> | boolean
    header_styles_social_icons_size?: FloatFilter<"Link"> | number
    card_styles_design?: IntFilter<"Link"> | number
    card_styles_card_color?: StringFilter<"Link"> | string
    card_styles_text_color?: StringFilter<"Link"> | string
    card_styles_label_color?: StringFilter<"Link"> | string
    card_styles_label_text_color?: StringFilter<"Link"> | string
    card_styles_card_corner?: FloatFilter<"Link"> | number
    card_styles_card_border_width?: FloatFilter<"Link"> | number
    card_styles_card_border_color?: StringFilter<"Link"> | string
    card_styles_card_shadow?: FloatFilter<"Link"> | number
    card_styles_card_spacing?: FloatFilter<"Link"> | number
    title_font?: StringFilter<"Link"> | string
    text_font?: StringFilter<"Link"> | string
    social_enable_add_contacts?: BoolFilter<"Link"> | boolean
    social_enable_share_btn?: BoolFilter<"Link"> | boolean
    social_enable_search?: BoolFilter<"Link"> | boolean
    social_enable_qr_code?: BoolFilter<"Link"> | boolean
    profile_views?: IntFilter<"Link"> | number
    blocks?: BlockListRelationFilter
    socials?: SocialListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type LinkOrderByWithAggregationInput = {
    id?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    instagram?: SortOrder
    twitter?: SortOrder
    displayname?: SortOrder
    bio?: SortOrder
    userName?: SortOrder
    userId?: SortOrder
    general_styles_desktop_bgcolor?: SortOrder
    general_styles_primary_text_color?: SortOrder
    general_styles_primary_bgcolor?: SortOrder
    general_styles_is_secondary_bgcolor?: SortOrder
    general_styles_is_label_exist?: SortOrder
    general_styles_secondary_bgcolor?: SortOrder
    general_styles_soft_shadow?: SortOrder
    header_styles_profile_shadow?: SortOrder
    header_styles_profile_border_width?: SortOrder
    header_styles_profile_border_color?: SortOrder
    header_styles_collapse_long_bio?: SortOrder
    header_styles_social_icons_size?: SortOrder
    card_styles_design?: SortOrder
    card_styles_card_color?: SortOrder
    card_styles_text_color?: SortOrder
    card_styles_label_color?: SortOrder
    card_styles_label_text_color?: SortOrder
    card_styles_card_corner?: SortOrder
    card_styles_card_border_width?: SortOrder
    card_styles_card_border_color?: SortOrder
    card_styles_card_shadow?: SortOrder
    card_styles_card_spacing?: SortOrder
    title_font?: SortOrder
    text_font?: SortOrder
    social_enable_add_contacts?: SortOrder
    social_enable_share_btn?: SortOrder
    social_enable_search?: SortOrder
    social_enable_qr_code?: SortOrder
    profile_views?: SortOrder
    _count?: LinkCountOrderByAggregateInput
    _avg?: LinkAvgOrderByAggregateInput
    _max?: LinkMaxOrderByAggregateInput
    _min?: LinkMinOrderByAggregateInput
    _sum?: LinkSumOrderByAggregateInput
  }

  export type LinkScalarWhereWithAggregatesInput = {
    AND?: LinkScalarWhereWithAggregatesInput | LinkScalarWhereWithAggregatesInput[]
    OR?: LinkScalarWhereWithAggregatesInput[]
    NOT?: LinkScalarWhereWithAggregatesInput | LinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Link"> | string
    phone?: StringWithAggregatesFilter<"Link"> | string
    website?: StringWithAggregatesFilter<"Link"> | string
    instagram?: StringWithAggregatesFilter<"Link"> | string
    twitter?: StringWithAggregatesFilter<"Link"> | string
    displayname?: StringWithAggregatesFilter<"Link"> | string
    bio?: StringWithAggregatesFilter<"Link"> | string
    userName?: StringWithAggregatesFilter<"Link"> | string
    userId?: StringWithAggregatesFilter<"Link"> | string
    general_styles_desktop_bgcolor?: StringWithAggregatesFilter<"Link"> | string
    general_styles_primary_text_color?: StringWithAggregatesFilter<"Link"> | string
    general_styles_primary_bgcolor?: StringWithAggregatesFilter<"Link"> | string
    general_styles_is_secondary_bgcolor?: BoolWithAggregatesFilter<"Link"> | boolean
    general_styles_is_label_exist?: BoolWithAggregatesFilter<"Link"> | boolean
    general_styles_secondary_bgcolor?: StringWithAggregatesFilter<"Link"> | string
    general_styles_soft_shadow?: BoolWithAggregatesFilter<"Link"> | boolean
    header_styles_profile_shadow?: FloatWithAggregatesFilter<"Link"> | number
    header_styles_profile_border_width?: FloatWithAggregatesFilter<"Link"> | number
    header_styles_profile_border_color?: StringWithAggregatesFilter<"Link"> | string
    header_styles_collapse_long_bio?: BoolWithAggregatesFilter<"Link"> | boolean
    header_styles_social_icons_size?: FloatWithAggregatesFilter<"Link"> | number
    card_styles_design?: IntWithAggregatesFilter<"Link"> | number
    card_styles_card_color?: StringWithAggregatesFilter<"Link"> | string
    card_styles_text_color?: StringWithAggregatesFilter<"Link"> | string
    card_styles_label_color?: StringWithAggregatesFilter<"Link"> | string
    card_styles_label_text_color?: StringWithAggregatesFilter<"Link"> | string
    card_styles_card_corner?: FloatWithAggregatesFilter<"Link"> | number
    card_styles_card_border_width?: FloatWithAggregatesFilter<"Link"> | number
    card_styles_card_border_color?: StringWithAggregatesFilter<"Link"> | string
    card_styles_card_shadow?: FloatWithAggregatesFilter<"Link"> | number
    card_styles_card_spacing?: FloatWithAggregatesFilter<"Link"> | number
    title_font?: StringWithAggregatesFilter<"Link"> | string
    text_font?: StringWithAggregatesFilter<"Link"> | string
    social_enable_add_contacts?: BoolWithAggregatesFilter<"Link"> | boolean
    social_enable_share_btn?: BoolWithAggregatesFilter<"Link"> | boolean
    social_enable_search?: BoolWithAggregatesFilter<"Link"> | boolean
    social_enable_qr_code?: BoolWithAggregatesFilter<"Link"> | boolean
    profile_views?: IntWithAggregatesFilter<"Link"> | number
  }

  export type BlockWhereInput = {
    AND?: BlockWhereInput | BlockWhereInput[]
    OR?: BlockWhereInput[]
    NOT?: BlockWhereInput | BlockWhereInput[]
    id?: StringFilter<"Block"> | string
    style?: IntFilter<"Block"> | number
    type?: EnumBlockTypeFilter<"Block"> | $Enums.BlockType
    title?: StringFilter<"Block"> | string
    description?: StringFilter<"Block"> | string
    text?: StringFilter<"Block"> | string
    text_align?: StringFilter<"Block"> | string
    text_color?: StringFilter<"Block"> | string
    animation?: StringFilter<"Block"> | string
    bg_image?: StringFilter<"Block"> | string
    custom_text_color?: StringFilter<"Block"> | string
    url?: StringFilter<"Block"> | string
    order?: IntFilter<"Block"> | number
    corner?: IntFilter<"Block"> | number
    layout?: StringFilter<"Block"> | string
    clicks?: IntFilter<"Block"> | number
    views?: IntFilter<"Block"> | number
    linkId?: StringFilter<"Block"> | string
    created_at?: DateTimeFilter<"Block"> | Date | string
    updated_at?: DateTimeFilter<"Block"> | Date | string
    link?: XOR<LinkScalarRelationFilter, LinkWhereInput>
  }

  export type BlockOrderByWithRelationInput = {
    id?: SortOrder
    style?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    text?: SortOrder
    text_align?: SortOrder
    text_color?: SortOrder
    animation?: SortOrder
    bg_image?: SortOrder
    custom_text_color?: SortOrder
    url?: SortOrder
    order?: SortOrder
    corner?: SortOrder
    layout?: SortOrder
    clicks?: SortOrder
    views?: SortOrder
    linkId?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    link?: LinkOrderByWithRelationInput
  }

  export type BlockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BlockWhereInput | BlockWhereInput[]
    OR?: BlockWhereInput[]
    NOT?: BlockWhereInput | BlockWhereInput[]
    style?: IntFilter<"Block"> | number
    type?: EnumBlockTypeFilter<"Block"> | $Enums.BlockType
    title?: StringFilter<"Block"> | string
    description?: StringFilter<"Block"> | string
    text?: StringFilter<"Block"> | string
    text_align?: StringFilter<"Block"> | string
    text_color?: StringFilter<"Block"> | string
    animation?: StringFilter<"Block"> | string
    bg_image?: StringFilter<"Block"> | string
    custom_text_color?: StringFilter<"Block"> | string
    url?: StringFilter<"Block"> | string
    order?: IntFilter<"Block"> | number
    corner?: IntFilter<"Block"> | number
    layout?: StringFilter<"Block"> | string
    clicks?: IntFilter<"Block"> | number
    views?: IntFilter<"Block"> | number
    linkId?: StringFilter<"Block"> | string
    created_at?: DateTimeFilter<"Block"> | Date | string
    updated_at?: DateTimeFilter<"Block"> | Date | string
    link?: XOR<LinkScalarRelationFilter, LinkWhereInput>
  }, "id">

  export type BlockOrderByWithAggregationInput = {
    id?: SortOrder
    style?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    text?: SortOrder
    text_align?: SortOrder
    text_color?: SortOrder
    animation?: SortOrder
    bg_image?: SortOrder
    custom_text_color?: SortOrder
    url?: SortOrder
    order?: SortOrder
    corner?: SortOrder
    layout?: SortOrder
    clicks?: SortOrder
    views?: SortOrder
    linkId?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BlockCountOrderByAggregateInput
    _avg?: BlockAvgOrderByAggregateInput
    _max?: BlockMaxOrderByAggregateInput
    _min?: BlockMinOrderByAggregateInput
    _sum?: BlockSumOrderByAggregateInput
  }

  export type BlockScalarWhereWithAggregatesInput = {
    AND?: BlockScalarWhereWithAggregatesInput | BlockScalarWhereWithAggregatesInput[]
    OR?: BlockScalarWhereWithAggregatesInput[]
    NOT?: BlockScalarWhereWithAggregatesInput | BlockScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Block"> | string
    style?: IntWithAggregatesFilter<"Block"> | number
    type?: EnumBlockTypeWithAggregatesFilter<"Block"> | $Enums.BlockType
    title?: StringWithAggregatesFilter<"Block"> | string
    description?: StringWithAggregatesFilter<"Block"> | string
    text?: StringWithAggregatesFilter<"Block"> | string
    text_align?: StringWithAggregatesFilter<"Block"> | string
    text_color?: StringWithAggregatesFilter<"Block"> | string
    animation?: StringWithAggregatesFilter<"Block"> | string
    bg_image?: StringWithAggregatesFilter<"Block"> | string
    custom_text_color?: StringWithAggregatesFilter<"Block"> | string
    url?: StringWithAggregatesFilter<"Block"> | string
    order?: IntWithAggregatesFilter<"Block"> | number
    corner?: IntWithAggregatesFilter<"Block"> | number
    layout?: StringWithAggregatesFilter<"Block"> | string
    clicks?: IntWithAggregatesFilter<"Block"> | number
    views?: IntWithAggregatesFilter<"Block"> | number
    linkId?: StringWithAggregatesFilter<"Block"> | string
    created_at?: DateTimeWithAggregatesFilter<"Block"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Block"> | Date | string
  }

  export type SocialWhereInput = {
    AND?: SocialWhereInput | SocialWhereInput[]
    OR?: SocialWhereInput[]
    NOT?: SocialWhereInput | SocialWhereInput[]
    id?: StringFilter<"Social"> | string
    icon?: StringFilter<"Social"> | string
    url?: StringFilter<"Social"> | string
    order?: IntFilter<"Social"> | number
    label?: StringNullableFilter<"Social"> | string | null
    clicks?: IntFilter<"Social"> | number
    linkId?: StringFilter<"Social"> | string
    link?: XOR<LinkScalarRelationFilter, LinkWhereInput>
  }

  export type SocialOrderByWithRelationInput = {
    id?: SortOrder
    icon?: SortOrder
    url?: SortOrder
    order?: SortOrder
    label?: SortOrderInput | SortOrder
    clicks?: SortOrder
    linkId?: SortOrder
    link?: LinkOrderByWithRelationInput
  }

  export type SocialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SocialWhereInput | SocialWhereInput[]
    OR?: SocialWhereInput[]
    NOT?: SocialWhereInput | SocialWhereInput[]
    icon?: StringFilter<"Social"> | string
    url?: StringFilter<"Social"> | string
    order?: IntFilter<"Social"> | number
    label?: StringNullableFilter<"Social"> | string | null
    clicks?: IntFilter<"Social"> | number
    linkId?: StringFilter<"Social"> | string
    link?: XOR<LinkScalarRelationFilter, LinkWhereInput>
  }, "id">

  export type SocialOrderByWithAggregationInput = {
    id?: SortOrder
    icon?: SortOrder
    url?: SortOrder
    order?: SortOrder
    label?: SortOrderInput | SortOrder
    clicks?: SortOrder
    linkId?: SortOrder
    _count?: SocialCountOrderByAggregateInput
    _avg?: SocialAvgOrderByAggregateInput
    _max?: SocialMaxOrderByAggregateInput
    _min?: SocialMinOrderByAggregateInput
    _sum?: SocialSumOrderByAggregateInput
  }

  export type SocialScalarWhereWithAggregatesInput = {
    AND?: SocialScalarWhereWithAggregatesInput | SocialScalarWhereWithAggregatesInput[]
    OR?: SocialScalarWhereWithAggregatesInput[]
    NOT?: SocialScalarWhereWithAggregatesInput | SocialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Social"> | string
    icon?: StringWithAggregatesFilter<"Social"> | string
    url?: StringWithAggregatesFilter<"Social"> | string
    order?: IntWithAggregatesFilter<"Social"> | number
    label?: StringNullableWithAggregatesFilter<"Social"> | string | null
    clicks?: IntWithAggregatesFilter<"Social"> | number
    linkId?: StringWithAggregatesFilter<"Social"> | string
  }

  export type UserCreateInput = {
    id?: string
    fullname: string
    email: string
    password: string
    avatar?: string
    createdAt?: Date | string
    is_confirmed?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    links?: LinkCreateNestedManyWithoutUserInput
    activationCodes?: ActivationCodeCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    fullname: string
    email: string
    password: string
    avatar?: string
    createdAt?: Date | string
    is_confirmed?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    links?: LinkUncheckedCreateNestedManyWithoutUserInput
    activationCodes?: ActivationCodeUncheckedCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_confirmed?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    links?: LinkUpdateManyWithoutUserNestedInput
    activationCodes?: ActivationCodeUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_confirmed?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    links?: LinkUncheckedUpdateManyWithoutUserNestedInput
    activationCodes?: ActivationCodeUncheckedUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    fullname: string
    email: string
    password: string
    avatar?: string
    createdAt?: Date | string
    is_confirmed?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_confirmed?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_confirmed?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ActivationCodeCreateInput = {
    id?: string
    code: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutActivationCodesInput
  }

  export type ActivationCodeUncheckedCreateInput = {
    id?: string
    code: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    userId: string
  }

  export type ActivationCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivationCodesNestedInput
  }

  export type ActivationCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ActivationCodeCreateManyInput = {
    id?: string
    code: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    userId: string
  }

  export type ActivationCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivationCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPasswordResetTokenInput
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetTokenNestedInput
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkCreateInput = {
    id?: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views?: number
    blocks?: BlockCreateNestedManyWithoutLinkInput
    socials?: SocialCreateNestedManyWithoutLinkInput
    user: UserCreateNestedOneWithoutLinksInput
  }

  export type LinkUncheckedCreateInput = {
    id?: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    userId: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views?: number
    blocks?: BlockUncheckedCreateNestedManyWithoutLinkInput
    socials?: SocialUncheckedCreateNestedManyWithoutLinkInput
  }

  export type LinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
    blocks?: BlockUpdateManyWithoutLinkNestedInput
    socials?: SocialUpdateManyWithoutLinkNestedInput
    user?: UserUpdateOneRequiredWithoutLinksNestedInput
  }

  export type LinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
    blocks?: BlockUncheckedUpdateManyWithoutLinkNestedInput
    socials?: SocialUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type LinkCreateManyInput = {
    id?: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    userId: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views?: number
  }

  export type LinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
  }

  export type LinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
  }

  export type BlockCreateInput = {
    id?: string
    style?: number
    type: $Enums.BlockType
    title?: string
    description?: string
    text?: string
    text_align?: string
    text_color?: string
    animation?: string
    bg_image?: string
    custom_text_color?: string
    url: string
    order: number
    corner?: number
    layout?: string
    clicks?: number
    views?: number
    created_at?: Date | string
    updated_at?: Date | string
    link: LinkCreateNestedOneWithoutBlocksInput
  }

  export type BlockUncheckedCreateInput = {
    id?: string
    style?: number
    type: $Enums.BlockType
    title?: string
    description?: string
    text?: string
    text_align?: string
    text_color?: string
    animation?: string
    bg_image?: string
    custom_text_color?: string
    url: string
    order: number
    corner?: number
    layout?: string
    clicks?: number
    views?: number
    linkId: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BlockUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    style?: IntFieldUpdateOperationsInput | number
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    text_align?: StringFieldUpdateOperationsInput | string
    text_color?: StringFieldUpdateOperationsInput | string
    animation?: StringFieldUpdateOperationsInput | string
    bg_image?: StringFieldUpdateOperationsInput | string
    custom_text_color?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    corner?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    link?: LinkUpdateOneRequiredWithoutBlocksNestedInput
  }

  export type BlockUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    style?: IntFieldUpdateOperationsInput | number
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    text_align?: StringFieldUpdateOperationsInput | string
    text_color?: StringFieldUpdateOperationsInput | string
    animation?: StringFieldUpdateOperationsInput | string
    bg_image?: StringFieldUpdateOperationsInput | string
    custom_text_color?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    corner?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    linkId?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockCreateManyInput = {
    id?: string
    style?: number
    type: $Enums.BlockType
    title?: string
    description?: string
    text?: string
    text_align?: string
    text_color?: string
    animation?: string
    bg_image?: string
    custom_text_color?: string
    url: string
    order: number
    corner?: number
    layout?: string
    clicks?: number
    views?: number
    linkId: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BlockUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    style?: IntFieldUpdateOperationsInput | number
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    text_align?: StringFieldUpdateOperationsInput | string
    text_color?: StringFieldUpdateOperationsInput | string
    animation?: StringFieldUpdateOperationsInput | string
    bg_image?: StringFieldUpdateOperationsInput | string
    custom_text_color?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    corner?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    style?: IntFieldUpdateOperationsInput | number
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    text_align?: StringFieldUpdateOperationsInput | string
    text_color?: StringFieldUpdateOperationsInput | string
    animation?: StringFieldUpdateOperationsInput | string
    bg_image?: StringFieldUpdateOperationsInput | string
    custom_text_color?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    corner?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    linkId?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialCreateInput = {
    id?: string
    icon: string
    url: string
    order: number
    label?: string | null
    clicks?: number
    link: LinkCreateNestedOneWithoutSocialsInput
  }

  export type SocialUncheckedCreateInput = {
    id?: string
    icon: string
    url: string
    order: number
    label?: string | null
    clicks?: number
    linkId: string
  }

  export type SocialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    clicks?: IntFieldUpdateOperationsInput | number
    link?: LinkUpdateOneRequiredWithoutSocialsNestedInput
  }

  export type SocialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    clicks?: IntFieldUpdateOperationsInput | number
    linkId?: StringFieldUpdateOperationsInput | string
  }

  export type SocialCreateManyInput = {
    id?: string
    icon: string
    url: string
    order: number
    label?: string | null
    clicks?: number
    linkId: string
  }

  export type SocialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    clicks?: IntFieldUpdateOperationsInput | number
  }

  export type SocialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    clicks?: IntFieldUpdateOperationsInput | number
    linkId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type LinkListRelationFilter = {
    every?: LinkWhereInput
    some?: LinkWhereInput
    none?: LinkWhereInput
  }

  export type ActivationCodeListRelationFilter = {
    every?: ActivationCodeWhereInput
    some?: ActivationCodeWhereInput
    none?: ActivationCodeWhereInput
  }

  export type PasswordResetTokenNullableScalarRelationFilter = {
    is?: PasswordResetTokenWhereInput | null
    isNot?: PasswordResetTokenWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivationCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    is_confirmed?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    is_confirmed?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    is_confirmed?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ActivationCodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ActivationCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ActivationCodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BlockListRelationFilter = {
    every?: BlockWhereInput
    some?: BlockWhereInput
    none?: BlockWhereInput
  }

  export type SocialListRelationFilter = {
    every?: SocialWhereInput
    some?: SocialWhereInput
    none?: SocialWhereInput
  }

  export type BlockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SocialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LinkCountOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    instagram?: SortOrder
    twitter?: SortOrder
    displayname?: SortOrder
    bio?: SortOrder
    userName?: SortOrder
    userId?: SortOrder
    general_styles_desktop_bgcolor?: SortOrder
    general_styles_primary_text_color?: SortOrder
    general_styles_primary_bgcolor?: SortOrder
    general_styles_is_secondary_bgcolor?: SortOrder
    general_styles_is_label_exist?: SortOrder
    general_styles_secondary_bgcolor?: SortOrder
    general_styles_soft_shadow?: SortOrder
    header_styles_profile_shadow?: SortOrder
    header_styles_profile_border_width?: SortOrder
    header_styles_profile_border_color?: SortOrder
    header_styles_collapse_long_bio?: SortOrder
    header_styles_social_icons_size?: SortOrder
    card_styles_design?: SortOrder
    card_styles_card_color?: SortOrder
    card_styles_text_color?: SortOrder
    card_styles_label_color?: SortOrder
    card_styles_label_text_color?: SortOrder
    card_styles_card_corner?: SortOrder
    card_styles_card_border_width?: SortOrder
    card_styles_card_border_color?: SortOrder
    card_styles_card_shadow?: SortOrder
    card_styles_card_spacing?: SortOrder
    title_font?: SortOrder
    text_font?: SortOrder
    social_enable_add_contacts?: SortOrder
    social_enable_share_btn?: SortOrder
    social_enable_search?: SortOrder
    social_enable_qr_code?: SortOrder
    profile_views?: SortOrder
  }

  export type LinkAvgOrderByAggregateInput = {
    header_styles_profile_shadow?: SortOrder
    header_styles_profile_border_width?: SortOrder
    header_styles_social_icons_size?: SortOrder
    card_styles_design?: SortOrder
    card_styles_card_corner?: SortOrder
    card_styles_card_border_width?: SortOrder
    card_styles_card_shadow?: SortOrder
    card_styles_card_spacing?: SortOrder
    profile_views?: SortOrder
  }

  export type LinkMaxOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    instagram?: SortOrder
    twitter?: SortOrder
    displayname?: SortOrder
    bio?: SortOrder
    userName?: SortOrder
    userId?: SortOrder
    general_styles_desktop_bgcolor?: SortOrder
    general_styles_primary_text_color?: SortOrder
    general_styles_primary_bgcolor?: SortOrder
    general_styles_is_secondary_bgcolor?: SortOrder
    general_styles_is_label_exist?: SortOrder
    general_styles_secondary_bgcolor?: SortOrder
    general_styles_soft_shadow?: SortOrder
    header_styles_profile_shadow?: SortOrder
    header_styles_profile_border_width?: SortOrder
    header_styles_profile_border_color?: SortOrder
    header_styles_collapse_long_bio?: SortOrder
    header_styles_social_icons_size?: SortOrder
    card_styles_design?: SortOrder
    card_styles_card_color?: SortOrder
    card_styles_text_color?: SortOrder
    card_styles_label_color?: SortOrder
    card_styles_label_text_color?: SortOrder
    card_styles_card_corner?: SortOrder
    card_styles_card_border_width?: SortOrder
    card_styles_card_border_color?: SortOrder
    card_styles_card_shadow?: SortOrder
    card_styles_card_spacing?: SortOrder
    title_font?: SortOrder
    text_font?: SortOrder
    social_enable_add_contacts?: SortOrder
    social_enable_share_btn?: SortOrder
    social_enable_search?: SortOrder
    social_enable_qr_code?: SortOrder
    profile_views?: SortOrder
  }

  export type LinkMinOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    instagram?: SortOrder
    twitter?: SortOrder
    displayname?: SortOrder
    bio?: SortOrder
    userName?: SortOrder
    userId?: SortOrder
    general_styles_desktop_bgcolor?: SortOrder
    general_styles_primary_text_color?: SortOrder
    general_styles_primary_bgcolor?: SortOrder
    general_styles_is_secondary_bgcolor?: SortOrder
    general_styles_is_label_exist?: SortOrder
    general_styles_secondary_bgcolor?: SortOrder
    general_styles_soft_shadow?: SortOrder
    header_styles_profile_shadow?: SortOrder
    header_styles_profile_border_width?: SortOrder
    header_styles_profile_border_color?: SortOrder
    header_styles_collapse_long_bio?: SortOrder
    header_styles_social_icons_size?: SortOrder
    card_styles_design?: SortOrder
    card_styles_card_color?: SortOrder
    card_styles_text_color?: SortOrder
    card_styles_label_color?: SortOrder
    card_styles_label_text_color?: SortOrder
    card_styles_card_corner?: SortOrder
    card_styles_card_border_width?: SortOrder
    card_styles_card_border_color?: SortOrder
    card_styles_card_shadow?: SortOrder
    card_styles_card_spacing?: SortOrder
    title_font?: SortOrder
    text_font?: SortOrder
    social_enable_add_contacts?: SortOrder
    social_enable_share_btn?: SortOrder
    social_enable_search?: SortOrder
    social_enable_qr_code?: SortOrder
    profile_views?: SortOrder
  }

  export type LinkSumOrderByAggregateInput = {
    header_styles_profile_shadow?: SortOrder
    header_styles_profile_border_width?: SortOrder
    header_styles_social_icons_size?: SortOrder
    card_styles_design?: SortOrder
    card_styles_card_corner?: SortOrder
    card_styles_card_border_width?: SortOrder
    card_styles_card_shadow?: SortOrder
    card_styles_card_spacing?: SortOrder
    profile_views?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumBlockTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BlockType | EnumBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBlockTypeFilter<$PrismaModel> | $Enums.BlockType
  }

  export type LinkScalarRelationFilter = {
    is?: LinkWhereInput
    isNot?: LinkWhereInput
  }

  export type BlockCountOrderByAggregateInput = {
    id?: SortOrder
    style?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    text?: SortOrder
    text_align?: SortOrder
    text_color?: SortOrder
    animation?: SortOrder
    bg_image?: SortOrder
    custom_text_color?: SortOrder
    url?: SortOrder
    order?: SortOrder
    corner?: SortOrder
    layout?: SortOrder
    clicks?: SortOrder
    views?: SortOrder
    linkId?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BlockAvgOrderByAggregateInput = {
    style?: SortOrder
    order?: SortOrder
    corner?: SortOrder
    clicks?: SortOrder
    views?: SortOrder
  }

  export type BlockMaxOrderByAggregateInput = {
    id?: SortOrder
    style?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    text?: SortOrder
    text_align?: SortOrder
    text_color?: SortOrder
    animation?: SortOrder
    bg_image?: SortOrder
    custom_text_color?: SortOrder
    url?: SortOrder
    order?: SortOrder
    corner?: SortOrder
    layout?: SortOrder
    clicks?: SortOrder
    views?: SortOrder
    linkId?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BlockMinOrderByAggregateInput = {
    id?: SortOrder
    style?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    text?: SortOrder
    text_align?: SortOrder
    text_color?: SortOrder
    animation?: SortOrder
    bg_image?: SortOrder
    custom_text_color?: SortOrder
    url?: SortOrder
    order?: SortOrder
    corner?: SortOrder
    layout?: SortOrder
    clicks?: SortOrder
    views?: SortOrder
    linkId?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BlockSumOrderByAggregateInput = {
    style?: SortOrder
    order?: SortOrder
    corner?: SortOrder
    clicks?: SortOrder
    views?: SortOrder
  }

  export type EnumBlockTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlockType | EnumBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBlockTypeWithAggregatesFilter<$PrismaModel> | $Enums.BlockType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlockTypeFilter<$PrismaModel>
    _max?: NestedEnumBlockTypeFilter<$PrismaModel>
  }

  export type SocialCountOrderByAggregateInput = {
    id?: SortOrder
    icon?: SortOrder
    url?: SortOrder
    order?: SortOrder
    label?: SortOrder
    clicks?: SortOrder
    linkId?: SortOrder
  }

  export type SocialAvgOrderByAggregateInput = {
    order?: SortOrder
    clicks?: SortOrder
  }

  export type SocialMaxOrderByAggregateInput = {
    id?: SortOrder
    icon?: SortOrder
    url?: SortOrder
    order?: SortOrder
    label?: SortOrder
    clicks?: SortOrder
    linkId?: SortOrder
  }

  export type SocialMinOrderByAggregateInput = {
    id?: SortOrder
    icon?: SortOrder
    url?: SortOrder
    order?: SortOrder
    label?: SortOrder
    clicks?: SortOrder
    linkId?: SortOrder
  }

  export type SocialSumOrderByAggregateInput = {
    order?: SortOrder
    clicks?: SortOrder
  }

  export type LinkCreateNestedManyWithoutUserInput = {
    create?: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput> | LinkCreateWithoutUserInput[] | LinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LinkCreateOrConnectWithoutUserInput | LinkCreateOrConnectWithoutUserInput[]
    createMany?: LinkCreateManyUserInputEnvelope
    connect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
  }

  export type ActivationCodeCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivationCodeCreateWithoutUserInput, ActivationCodeUncheckedCreateWithoutUserInput> | ActivationCodeCreateWithoutUserInput[] | ActivationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivationCodeCreateOrConnectWithoutUserInput | ActivationCodeCreateOrConnectWithoutUserInput[]
    createMany?: ActivationCodeCreateManyUserInputEnvelope
    connect?: ActivationCodeWhereUniqueInput | ActivationCodeWhereUniqueInput[]
  }

  export type PasswordResetTokenCreateNestedOneWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    connect?: PasswordResetTokenWhereUniqueInput
  }

  export type LinkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput> | LinkCreateWithoutUserInput[] | LinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LinkCreateOrConnectWithoutUserInput | LinkCreateOrConnectWithoutUserInput[]
    createMany?: LinkCreateManyUserInputEnvelope
    connect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
  }

  export type ActivationCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivationCodeCreateWithoutUserInput, ActivationCodeUncheckedCreateWithoutUserInput> | ActivationCodeCreateWithoutUserInput[] | ActivationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivationCodeCreateOrConnectWithoutUserInput | ActivationCodeCreateOrConnectWithoutUserInput[]
    createMany?: ActivationCodeCreateManyUserInputEnvelope
    connect?: ActivationCodeWhereUniqueInput | ActivationCodeWhereUniqueInput[]
  }

  export type PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    connect?: PasswordResetTokenWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type LinkUpdateManyWithoutUserNestedInput = {
    create?: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput> | LinkCreateWithoutUserInput[] | LinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LinkCreateOrConnectWithoutUserInput | LinkCreateOrConnectWithoutUserInput[]
    upsert?: LinkUpsertWithWhereUniqueWithoutUserInput | LinkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LinkCreateManyUserInputEnvelope
    set?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    disconnect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    delete?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    connect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    update?: LinkUpdateWithWhereUniqueWithoutUserInput | LinkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LinkUpdateManyWithWhereWithoutUserInput | LinkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LinkScalarWhereInput | LinkScalarWhereInput[]
  }

  export type ActivationCodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivationCodeCreateWithoutUserInput, ActivationCodeUncheckedCreateWithoutUserInput> | ActivationCodeCreateWithoutUserInput[] | ActivationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivationCodeCreateOrConnectWithoutUserInput | ActivationCodeCreateOrConnectWithoutUserInput[]
    upsert?: ActivationCodeUpsertWithWhereUniqueWithoutUserInput | ActivationCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivationCodeCreateManyUserInputEnvelope
    set?: ActivationCodeWhereUniqueInput | ActivationCodeWhereUniqueInput[]
    disconnect?: ActivationCodeWhereUniqueInput | ActivationCodeWhereUniqueInput[]
    delete?: ActivationCodeWhereUniqueInput | ActivationCodeWhereUniqueInput[]
    connect?: ActivationCodeWhereUniqueInput | ActivationCodeWhereUniqueInput[]
    update?: ActivationCodeUpdateWithWhereUniqueWithoutUserInput | ActivationCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivationCodeUpdateManyWithWhereWithoutUserInput | ActivationCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivationCodeScalarWhereInput | ActivationCodeScalarWhereInput[]
  }

  export type PasswordResetTokenUpdateOneWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    upsert?: PasswordResetTokenUpsertWithoutUserInput
    disconnect?: PasswordResetTokenWhereInput | boolean
    delete?: PasswordResetTokenWhereInput | boolean
    connect?: PasswordResetTokenWhereUniqueInput
    update?: XOR<XOR<PasswordResetTokenUpdateToOneWithWhereWithoutUserInput, PasswordResetTokenUpdateWithoutUserInput>, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type LinkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput> | LinkCreateWithoutUserInput[] | LinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LinkCreateOrConnectWithoutUserInput | LinkCreateOrConnectWithoutUserInput[]
    upsert?: LinkUpsertWithWhereUniqueWithoutUserInput | LinkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LinkCreateManyUserInputEnvelope
    set?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    disconnect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    delete?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    connect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    update?: LinkUpdateWithWhereUniqueWithoutUserInput | LinkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LinkUpdateManyWithWhereWithoutUserInput | LinkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LinkScalarWhereInput | LinkScalarWhereInput[]
  }

  export type ActivationCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivationCodeCreateWithoutUserInput, ActivationCodeUncheckedCreateWithoutUserInput> | ActivationCodeCreateWithoutUserInput[] | ActivationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivationCodeCreateOrConnectWithoutUserInput | ActivationCodeCreateOrConnectWithoutUserInput[]
    upsert?: ActivationCodeUpsertWithWhereUniqueWithoutUserInput | ActivationCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivationCodeCreateManyUserInputEnvelope
    set?: ActivationCodeWhereUniqueInput | ActivationCodeWhereUniqueInput[]
    disconnect?: ActivationCodeWhereUniqueInput | ActivationCodeWhereUniqueInput[]
    delete?: ActivationCodeWhereUniqueInput | ActivationCodeWhereUniqueInput[]
    connect?: ActivationCodeWhereUniqueInput | ActivationCodeWhereUniqueInput[]
    update?: ActivationCodeUpdateWithWhereUniqueWithoutUserInput | ActivationCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivationCodeUpdateManyWithWhereWithoutUserInput | ActivationCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivationCodeScalarWhereInput | ActivationCodeScalarWhereInput[]
  }

  export type PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    upsert?: PasswordResetTokenUpsertWithoutUserInput
    disconnect?: PasswordResetTokenWhereInput | boolean
    delete?: PasswordResetTokenWhereInput | boolean
    connect?: PasswordResetTokenWhereUniqueInput
    update?: XOR<XOR<PasswordResetTokenUpdateToOneWithWhereWithoutUserInput, PasswordResetTokenUpdateWithoutUserInput>, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutActivationCodesInput = {
    create?: XOR<UserCreateWithoutActivationCodesInput, UserUncheckedCreateWithoutActivationCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivationCodesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActivationCodesNestedInput = {
    create?: XOR<UserCreateWithoutActivationCodesInput, UserUncheckedCreateWithoutActivationCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivationCodesInput
    upsert?: UserUpsertWithoutActivationCodesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivationCodesInput, UserUpdateWithoutActivationCodesInput>, UserUncheckedUpdateWithoutActivationCodesInput>
  }

  export type UserCreateNestedOneWithoutPasswordResetTokenInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokenInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetTokenNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokenInput
    upsert?: UserUpsertWithoutPasswordResetTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetTokenInput, UserUpdateWithoutPasswordResetTokenInput>, UserUncheckedUpdateWithoutPasswordResetTokenInput>
  }

  export type BlockCreateNestedManyWithoutLinkInput = {
    create?: XOR<BlockCreateWithoutLinkInput, BlockUncheckedCreateWithoutLinkInput> | BlockCreateWithoutLinkInput[] | BlockUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutLinkInput | BlockCreateOrConnectWithoutLinkInput[]
    createMany?: BlockCreateManyLinkInputEnvelope
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
  }

  export type SocialCreateNestedManyWithoutLinkInput = {
    create?: XOR<SocialCreateWithoutLinkInput, SocialUncheckedCreateWithoutLinkInput> | SocialCreateWithoutLinkInput[] | SocialUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: SocialCreateOrConnectWithoutLinkInput | SocialCreateOrConnectWithoutLinkInput[]
    createMany?: SocialCreateManyLinkInputEnvelope
    connect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutLinksInput = {
    create?: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutLinksInput
    connect?: UserWhereUniqueInput
  }

  export type BlockUncheckedCreateNestedManyWithoutLinkInput = {
    create?: XOR<BlockCreateWithoutLinkInput, BlockUncheckedCreateWithoutLinkInput> | BlockCreateWithoutLinkInput[] | BlockUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutLinkInput | BlockCreateOrConnectWithoutLinkInput[]
    createMany?: BlockCreateManyLinkInputEnvelope
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
  }

  export type SocialUncheckedCreateNestedManyWithoutLinkInput = {
    create?: XOR<SocialCreateWithoutLinkInput, SocialUncheckedCreateWithoutLinkInput> | SocialCreateWithoutLinkInput[] | SocialUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: SocialCreateOrConnectWithoutLinkInput | SocialCreateOrConnectWithoutLinkInput[]
    createMany?: SocialCreateManyLinkInputEnvelope
    connect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BlockUpdateManyWithoutLinkNestedInput = {
    create?: XOR<BlockCreateWithoutLinkInput, BlockUncheckedCreateWithoutLinkInput> | BlockCreateWithoutLinkInput[] | BlockUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutLinkInput | BlockCreateOrConnectWithoutLinkInput[]
    upsert?: BlockUpsertWithWhereUniqueWithoutLinkInput | BlockUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: BlockCreateManyLinkInputEnvelope
    set?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    disconnect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    delete?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    update?: BlockUpdateWithWhereUniqueWithoutLinkInput | BlockUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: BlockUpdateManyWithWhereWithoutLinkInput | BlockUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: BlockScalarWhereInput | BlockScalarWhereInput[]
  }

  export type SocialUpdateManyWithoutLinkNestedInput = {
    create?: XOR<SocialCreateWithoutLinkInput, SocialUncheckedCreateWithoutLinkInput> | SocialCreateWithoutLinkInput[] | SocialUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: SocialCreateOrConnectWithoutLinkInput | SocialCreateOrConnectWithoutLinkInput[]
    upsert?: SocialUpsertWithWhereUniqueWithoutLinkInput | SocialUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: SocialCreateManyLinkInputEnvelope
    set?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    disconnect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    delete?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    connect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    update?: SocialUpdateWithWhereUniqueWithoutLinkInput | SocialUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: SocialUpdateManyWithWhereWithoutLinkInput | SocialUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: SocialScalarWhereInput | SocialScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutLinksNestedInput = {
    create?: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutLinksInput
    upsert?: UserUpsertWithoutLinksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLinksInput, UserUpdateWithoutLinksInput>, UserUncheckedUpdateWithoutLinksInput>
  }

  export type BlockUncheckedUpdateManyWithoutLinkNestedInput = {
    create?: XOR<BlockCreateWithoutLinkInput, BlockUncheckedCreateWithoutLinkInput> | BlockCreateWithoutLinkInput[] | BlockUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutLinkInput | BlockCreateOrConnectWithoutLinkInput[]
    upsert?: BlockUpsertWithWhereUniqueWithoutLinkInput | BlockUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: BlockCreateManyLinkInputEnvelope
    set?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    disconnect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    delete?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    update?: BlockUpdateWithWhereUniqueWithoutLinkInput | BlockUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: BlockUpdateManyWithWhereWithoutLinkInput | BlockUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: BlockScalarWhereInput | BlockScalarWhereInput[]
  }

  export type SocialUncheckedUpdateManyWithoutLinkNestedInput = {
    create?: XOR<SocialCreateWithoutLinkInput, SocialUncheckedCreateWithoutLinkInput> | SocialCreateWithoutLinkInput[] | SocialUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: SocialCreateOrConnectWithoutLinkInput | SocialCreateOrConnectWithoutLinkInput[]
    upsert?: SocialUpsertWithWhereUniqueWithoutLinkInput | SocialUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: SocialCreateManyLinkInputEnvelope
    set?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    disconnect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    delete?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    connect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    update?: SocialUpdateWithWhereUniqueWithoutLinkInput | SocialUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: SocialUpdateManyWithWhereWithoutLinkInput | SocialUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: SocialScalarWhereInput | SocialScalarWhereInput[]
  }

  export type LinkCreateNestedOneWithoutBlocksInput = {
    create?: XOR<LinkCreateWithoutBlocksInput, LinkUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: LinkCreateOrConnectWithoutBlocksInput
    connect?: LinkWhereUniqueInput
  }

  export type EnumBlockTypeFieldUpdateOperationsInput = {
    set?: $Enums.BlockType
  }

  export type LinkUpdateOneRequiredWithoutBlocksNestedInput = {
    create?: XOR<LinkCreateWithoutBlocksInput, LinkUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: LinkCreateOrConnectWithoutBlocksInput
    upsert?: LinkUpsertWithoutBlocksInput
    connect?: LinkWhereUniqueInput
    update?: XOR<XOR<LinkUpdateToOneWithWhereWithoutBlocksInput, LinkUpdateWithoutBlocksInput>, LinkUncheckedUpdateWithoutBlocksInput>
  }

  export type LinkCreateNestedOneWithoutSocialsInput = {
    create?: XOR<LinkCreateWithoutSocialsInput, LinkUncheckedCreateWithoutSocialsInput>
    connectOrCreate?: LinkCreateOrConnectWithoutSocialsInput
    connect?: LinkWhereUniqueInput
  }

  export type LinkUpdateOneRequiredWithoutSocialsNestedInput = {
    create?: XOR<LinkCreateWithoutSocialsInput, LinkUncheckedCreateWithoutSocialsInput>
    connectOrCreate?: LinkCreateOrConnectWithoutSocialsInput
    upsert?: LinkUpsertWithoutSocialsInput
    connect?: LinkWhereUniqueInput
    update?: XOR<XOR<LinkUpdateToOneWithWhereWithoutSocialsInput, LinkUpdateWithoutSocialsInput>, LinkUncheckedUpdateWithoutSocialsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumBlockTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BlockType | EnumBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBlockTypeFilter<$PrismaModel> | $Enums.BlockType
  }

  export type NestedEnumBlockTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlockType | EnumBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBlockTypeWithAggregatesFilter<$PrismaModel> | $Enums.BlockType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlockTypeFilter<$PrismaModel>
    _max?: NestedEnumBlockTypeFilter<$PrismaModel>
  }

  export type LinkCreateWithoutUserInput = {
    id?: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views?: number
    blocks?: BlockCreateNestedManyWithoutLinkInput
    socials?: SocialCreateNestedManyWithoutLinkInput
  }

  export type LinkUncheckedCreateWithoutUserInput = {
    id?: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views?: number
    blocks?: BlockUncheckedCreateNestedManyWithoutLinkInput
    socials?: SocialUncheckedCreateNestedManyWithoutLinkInput
  }

  export type LinkCreateOrConnectWithoutUserInput = {
    where: LinkWhereUniqueInput
    create: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput>
  }

  export type LinkCreateManyUserInputEnvelope = {
    data: LinkCreateManyUserInput | LinkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivationCodeCreateWithoutUserInput = {
    id?: string
    code: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type ActivationCodeUncheckedCreateWithoutUserInput = {
    id?: string
    code: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type ActivationCodeCreateOrConnectWithoutUserInput = {
    where: ActivationCodeWhereUniqueInput
    create: XOR<ActivationCodeCreateWithoutUserInput, ActivationCodeUncheckedCreateWithoutUserInput>
  }

  export type ActivationCodeCreateManyUserInputEnvelope = {
    data: ActivationCodeCreateManyUserInput | ActivationCodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenCreateOrConnectWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type LinkUpsertWithWhereUniqueWithoutUserInput = {
    where: LinkWhereUniqueInput
    update: XOR<LinkUpdateWithoutUserInput, LinkUncheckedUpdateWithoutUserInput>
    create: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput>
  }

  export type LinkUpdateWithWhereUniqueWithoutUserInput = {
    where: LinkWhereUniqueInput
    data: XOR<LinkUpdateWithoutUserInput, LinkUncheckedUpdateWithoutUserInput>
  }

  export type LinkUpdateManyWithWhereWithoutUserInput = {
    where: LinkScalarWhereInput
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyWithoutUserInput>
  }

  export type LinkScalarWhereInput = {
    AND?: LinkScalarWhereInput | LinkScalarWhereInput[]
    OR?: LinkScalarWhereInput[]
    NOT?: LinkScalarWhereInput | LinkScalarWhereInput[]
    id?: StringFilter<"Link"> | string
    phone?: StringFilter<"Link"> | string
    website?: StringFilter<"Link"> | string
    instagram?: StringFilter<"Link"> | string
    twitter?: StringFilter<"Link"> | string
    displayname?: StringFilter<"Link"> | string
    bio?: StringFilter<"Link"> | string
    userName?: StringFilter<"Link"> | string
    userId?: StringFilter<"Link"> | string
    general_styles_desktop_bgcolor?: StringFilter<"Link"> | string
    general_styles_primary_text_color?: StringFilter<"Link"> | string
    general_styles_primary_bgcolor?: StringFilter<"Link"> | string
    general_styles_is_secondary_bgcolor?: BoolFilter<"Link"> | boolean
    general_styles_is_label_exist?: BoolFilter<"Link"> | boolean
    general_styles_secondary_bgcolor?: StringFilter<"Link"> | string
    general_styles_soft_shadow?: BoolFilter<"Link"> | boolean
    header_styles_profile_shadow?: FloatFilter<"Link"> | number
    header_styles_profile_border_width?: FloatFilter<"Link"> | number
    header_styles_profile_border_color?: StringFilter<"Link"> | string
    header_styles_collapse_long_bio?: BoolFilter<"Link"> | boolean
    header_styles_social_icons_size?: FloatFilter<"Link"> | number
    card_styles_design?: IntFilter<"Link"> | number
    card_styles_card_color?: StringFilter<"Link"> | string
    card_styles_text_color?: StringFilter<"Link"> | string
    card_styles_label_color?: StringFilter<"Link"> | string
    card_styles_label_text_color?: StringFilter<"Link"> | string
    card_styles_card_corner?: FloatFilter<"Link"> | number
    card_styles_card_border_width?: FloatFilter<"Link"> | number
    card_styles_card_border_color?: StringFilter<"Link"> | string
    card_styles_card_shadow?: FloatFilter<"Link"> | number
    card_styles_card_spacing?: FloatFilter<"Link"> | number
    title_font?: StringFilter<"Link"> | string
    text_font?: StringFilter<"Link"> | string
    social_enable_add_contacts?: BoolFilter<"Link"> | boolean
    social_enable_share_btn?: BoolFilter<"Link"> | boolean
    social_enable_search?: BoolFilter<"Link"> | boolean
    social_enable_qr_code?: BoolFilter<"Link"> | boolean
    profile_views?: IntFilter<"Link"> | number
  }

  export type ActivationCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivationCodeWhereUniqueInput
    update: XOR<ActivationCodeUpdateWithoutUserInput, ActivationCodeUncheckedUpdateWithoutUserInput>
    create: XOR<ActivationCodeCreateWithoutUserInput, ActivationCodeUncheckedCreateWithoutUserInput>
  }

  export type ActivationCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivationCodeWhereUniqueInput
    data: XOR<ActivationCodeUpdateWithoutUserInput, ActivationCodeUncheckedUpdateWithoutUserInput>
  }

  export type ActivationCodeUpdateManyWithWhereWithoutUserInput = {
    where: ActivationCodeScalarWhereInput
    data: XOR<ActivationCodeUpdateManyMutationInput, ActivationCodeUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivationCodeScalarWhereInput = {
    AND?: ActivationCodeScalarWhereInput | ActivationCodeScalarWhereInput[]
    OR?: ActivationCodeScalarWhereInput[]
    NOT?: ActivationCodeScalarWhereInput | ActivationCodeScalarWhereInput[]
    id?: StringFilter<"ActivationCode"> | string
    code?: StringFilter<"ActivationCode"> | string
    expiresAt?: DateTimeFilter<"ActivationCode"> | Date | string
    used?: BoolFilter<"ActivationCode"> | boolean
    createdAt?: DateTimeFilter<"ActivationCode"> | Date | string
    userId?: StringFilter<"ActivationCode"> | string
  }

  export type PasswordResetTokenUpsertWithoutUserInput = {
    update: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    where?: PasswordResetTokenWhereInput
  }

  export type PasswordResetTokenUpdateToOneWithWhereWithoutUserInput = {
    where?: PasswordResetTokenWhereInput
    data: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutActivationCodesInput = {
    id?: string
    fullname: string
    email: string
    password: string
    avatar?: string
    createdAt?: Date | string
    is_confirmed?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    links?: LinkCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivationCodesInput = {
    id?: string
    fullname: string
    email: string
    password: string
    avatar?: string
    createdAt?: Date | string
    is_confirmed?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    links?: LinkUncheckedCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivationCodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivationCodesInput, UserUncheckedCreateWithoutActivationCodesInput>
  }

  export type UserUpsertWithoutActivationCodesInput = {
    update: XOR<UserUpdateWithoutActivationCodesInput, UserUncheckedUpdateWithoutActivationCodesInput>
    create: XOR<UserCreateWithoutActivationCodesInput, UserUncheckedCreateWithoutActivationCodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivationCodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivationCodesInput, UserUncheckedUpdateWithoutActivationCodesInput>
  }

  export type UserUpdateWithoutActivationCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_confirmed?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    links?: LinkUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivationCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_confirmed?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    links?: LinkUncheckedUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutPasswordResetTokenInput = {
    id?: string
    fullname: string
    email: string
    password: string
    avatar?: string
    createdAt?: Date | string
    is_confirmed?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    links?: LinkCreateNestedManyWithoutUserInput
    activationCodes?: ActivationCodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordResetTokenInput = {
    id?: string
    fullname: string
    email: string
    password: string
    avatar?: string
    createdAt?: Date | string
    is_confirmed?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    links?: LinkUncheckedCreateNestedManyWithoutUserInput
    activationCodes?: ActivationCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordResetTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
  }

  export type UserUpsertWithoutPasswordResetTokenInput = {
    update: XOR<UserUpdateWithoutPasswordResetTokenInput, UserUncheckedUpdateWithoutPasswordResetTokenInput>
    create: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetTokenInput, UserUncheckedUpdateWithoutPasswordResetTokenInput>
  }

  export type UserUpdateWithoutPasswordResetTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_confirmed?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    links?: LinkUpdateManyWithoutUserNestedInput
    activationCodes?: ActivationCodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_confirmed?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    links?: LinkUncheckedUpdateManyWithoutUserNestedInput
    activationCodes?: ActivationCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BlockCreateWithoutLinkInput = {
    id?: string
    style?: number
    type: $Enums.BlockType
    title?: string
    description?: string
    text?: string
    text_align?: string
    text_color?: string
    animation?: string
    bg_image?: string
    custom_text_color?: string
    url: string
    order: number
    corner?: number
    layout?: string
    clicks?: number
    views?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BlockUncheckedCreateWithoutLinkInput = {
    id?: string
    style?: number
    type: $Enums.BlockType
    title?: string
    description?: string
    text?: string
    text_align?: string
    text_color?: string
    animation?: string
    bg_image?: string
    custom_text_color?: string
    url: string
    order: number
    corner?: number
    layout?: string
    clicks?: number
    views?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BlockCreateOrConnectWithoutLinkInput = {
    where: BlockWhereUniqueInput
    create: XOR<BlockCreateWithoutLinkInput, BlockUncheckedCreateWithoutLinkInput>
  }

  export type BlockCreateManyLinkInputEnvelope = {
    data: BlockCreateManyLinkInput | BlockCreateManyLinkInput[]
    skipDuplicates?: boolean
  }

  export type SocialCreateWithoutLinkInput = {
    id?: string
    icon: string
    url: string
    order: number
    label?: string | null
    clicks?: number
  }

  export type SocialUncheckedCreateWithoutLinkInput = {
    id?: string
    icon: string
    url: string
    order: number
    label?: string | null
    clicks?: number
  }

  export type SocialCreateOrConnectWithoutLinkInput = {
    where: SocialWhereUniqueInput
    create: XOR<SocialCreateWithoutLinkInput, SocialUncheckedCreateWithoutLinkInput>
  }

  export type SocialCreateManyLinkInputEnvelope = {
    data: SocialCreateManyLinkInput | SocialCreateManyLinkInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutLinksInput = {
    id?: string
    fullname: string
    email: string
    password: string
    avatar?: string
    createdAt?: Date | string
    is_confirmed?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    activationCodes?: ActivationCodeCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLinksInput = {
    id?: string
    fullname: string
    email: string
    password: string
    avatar?: string
    createdAt?: Date | string
    is_confirmed?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    activationCodes?: ActivationCodeUncheckedCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLinksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
  }

  export type BlockUpsertWithWhereUniqueWithoutLinkInput = {
    where: BlockWhereUniqueInput
    update: XOR<BlockUpdateWithoutLinkInput, BlockUncheckedUpdateWithoutLinkInput>
    create: XOR<BlockCreateWithoutLinkInput, BlockUncheckedCreateWithoutLinkInput>
  }

  export type BlockUpdateWithWhereUniqueWithoutLinkInput = {
    where: BlockWhereUniqueInput
    data: XOR<BlockUpdateWithoutLinkInput, BlockUncheckedUpdateWithoutLinkInput>
  }

  export type BlockUpdateManyWithWhereWithoutLinkInput = {
    where: BlockScalarWhereInput
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyWithoutLinkInput>
  }

  export type BlockScalarWhereInput = {
    AND?: BlockScalarWhereInput | BlockScalarWhereInput[]
    OR?: BlockScalarWhereInput[]
    NOT?: BlockScalarWhereInput | BlockScalarWhereInput[]
    id?: StringFilter<"Block"> | string
    style?: IntFilter<"Block"> | number
    type?: EnumBlockTypeFilter<"Block"> | $Enums.BlockType
    title?: StringFilter<"Block"> | string
    description?: StringFilter<"Block"> | string
    text?: StringFilter<"Block"> | string
    text_align?: StringFilter<"Block"> | string
    text_color?: StringFilter<"Block"> | string
    animation?: StringFilter<"Block"> | string
    bg_image?: StringFilter<"Block"> | string
    custom_text_color?: StringFilter<"Block"> | string
    url?: StringFilter<"Block"> | string
    order?: IntFilter<"Block"> | number
    corner?: IntFilter<"Block"> | number
    layout?: StringFilter<"Block"> | string
    clicks?: IntFilter<"Block"> | number
    views?: IntFilter<"Block"> | number
    linkId?: StringFilter<"Block"> | string
    created_at?: DateTimeFilter<"Block"> | Date | string
    updated_at?: DateTimeFilter<"Block"> | Date | string
  }

  export type SocialUpsertWithWhereUniqueWithoutLinkInput = {
    where: SocialWhereUniqueInput
    update: XOR<SocialUpdateWithoutLinkInput, SocialUncheckedUpdateWithoutLinkInput>
    create: XOR<SocialCreateWithoutLinkInput, SocialUncheckedCreateWithoutLinkInput>
  }

  export type SocialUpdateWithWhereUniqueWithoutLinkInput = {
    where: SocialWhereUniqueInput
    data: XOR<SocialUpdateWithoutLinkInput, SocialUncheckedUpdateWithoutLinkInput>
  }

  export type SocialUpdateManyWithWhereWithoutLinkInput = {
    where: SocialScalarWhereInput
    data: XOR<SocialUpdateManyMutationInput, SocialUncheckedUpdateManyWithoutLinkInput>
  }

  export type SocialScalarWhereInput = {
    AND?: SocialScalarWhereInput | SocialScalarWhereInput[]
    OR?: SocialScalarWhereInput[]
    NOT?: SocialScalarWhereInput | SocialScalarWhereInput[]
    id?: StringFilter<"Social"> | string
    icon?: StringFilter<"Social"> | string
    url?: StringFilter<"Social"> | string
    order?: IntFilter<"Social"> | number
    label?: StringNullableFilter<"Social"> | string | null
    clicks?: IntFilter<"Social"> | number
    linkId?: StringFilter<"Social"> | string
  }

  export type UserUpsertWithoutLinksInput = {
    update: XOR<UserUpdateWithoutLinksInput, UserUncheckedUpdateWithoutLinksInput>
    create: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLinksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLinksInput, UserUncheckedUpdateWithoutLinksInput>
  }

  export type UserUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_confirmed?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activationCodes?: ActivationCodeUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_confirmed?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activationCodes?: ActivationCodeUncheckedUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type LinkCreateWithoutBlocksInput = {
    id?: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views?: number
    socials?: SocialCreateNestedManyWithoutLinkInput
    user: UserCreateNestedOneWithoutLinksInput
  }

  export type LinkUncheckedCreateWithoutBlocksInput = {
    id?: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    userId: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views?: number
    socials?: SocialUncheckedCreateNestedManyWithoutLinkInput
  }

  export type LinkCreateOrConnectWithoutBlocksInput = {
    where: LinkWhereUniqueInput
    create: XOR<LinkCreateWithoutBlocksInput, LinkUncheckedCreateWithoutBlocksInput>
  }

  export type LinkUpsertWithoutBlocksInput = {
    update: XOR<LinkUpdateWithoutBlocksInput, LinkUncheckedUpdateWithoutBlocksInput>
    create: XOR<LinkCreateWithoutBlocksInput, LinkUncheckedCreateWithoutBlocksInput>
    where?: LinkWhereInput
  }

  export type LinkUpdateToOneWithWhereWithoutBlocksInput = {
    where?: LinkWhereInput
    data: XOR<LinkUpdateWithoutBlocksInput, LinkUncheckedUpdateWithoutBlocksInput>
  }

  export type LinkUpdateWithoutBlocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
    socials?: SocialUpdateManyWithoutLinkNestedInput
    user?: UserUpdateOneRequiredWithoutLinksNestedInput
  }

  export type LinkUncheckedUpdateWithoutBlocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
    socials?: SocialUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type LinkCreateWithoutSocialsInput = {
    id?: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views?: number
    blocks?: BlockCreateNestedManyWithoutLinkInput
    user: UserCreateNestedOneWithoutLinksInput
  }

  export type LinkUncheckedCreateWithoutSocialsInput = {
    id?: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    userId: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views?: number
    blocks?: BlockUncheckedCreateNestedManyWithoutLinkInput
  }

  export type LinkCreateOrConnectWithoutSocialsInput = {
    where: LinkWhereUniqueInput
    create: XOR<LinkCreateWithoutSocialsInput, LinkUncheckedCreateWithoutSocialsInput>
  }

  export type LinkUpsertWithoutSocialsInput = {
    update: XOR<LinkUpdateWithoutSocialsInput, LinkUncheckedUpdateWithoutSocialsInput>
    create: XOR<LinkCreateWithoutSocialsInput, LinkUncheckedCreateWithoutSocialsInput>
    where?: LinkWhereInput
  }

  export type LinkUpdateToOneWithWhereWithoutSocialsInput = {
    where?: LinkWhereInput
    data: XOR<LinkUpdateWithoutSocialsInput, LinkUncheckedUpdateWithoutSocialsInput>
  }

  export type LinkUpdateWithoutSocialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
    blocks?: BlockUpdateManyWithoutLinkNestedInput
    user?: UserUpdateOneRequiredWithoutLinksNestedInput
  }

  export type LinkUncheckedUpdateWithoutSocialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
    blocks?: BlockUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type LinkCreateManyUserInput = {
    id?: string
    phone: string
    website: string
    instagram: string
    twitter: string
    displayname: string
    bio: string
    userName: string
    general_styles_desktop_bgcolor: string
    general_styles_primary_text_color: string
    general_styles_primary_bgcolor: string
    general_styles_is_secondary_bgcolor: boolean
    general_styles_is_label_exist: boolean
    general_styles_secondary_bgcolor: string
    general_styles_soft_shadow: boolean
    header_styles_profile_shadow: number
    header_styles_profile_border_width: number
    header_styles_profile_border_color: string
    header_styles_collapse_long_bio: boolean
    header_styles_social_icons_size: number
    card_styles_design: number
    card_styles_card_color: string
    card_styles_text_color: string
    card_styles_label_color: string
    card_styles_label_text_color: string
    card_styles_card_corner: number
    card_styles_card_border_width: number
    card_styles_card_border_color: string
    card_styles_card_shadow: number
    card_styles_card_spacing: number
    title_font: string
    text_font: string
    social_enable_add_contacts: boolean
    social_enable_share_btn: boolean
    social_enable_search: boolean
    social_enable_qr_code: boolean
    profile_views?: number
  }

  export type ActivationCodeCreateManyUserInput = {
    id?: string
    code: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type LinkUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
    blocks?: BlockUpdateManyWithoutLinkNestedInput
    socials?: SocialUpdateManyWithoutLinkNestedInput
  }

  export type LinkUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
    blocks?: BlockUncheckedUpdateManyWithoutLinkNestedInput
    socials?: SocialUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type LinkUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    twitter?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    general_styles_desktop_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_primary_text_color?: StringFieldUpdateOperationsInput | string
    general_styles_primary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_is_secondary_bgcolor?: BoolFieldUpdateOperationsInput | boolean
    general_styles_is_label_exist?: BoolFieldUpdateOperationsInput | boolean
    general_styles_secondary_bgcolor?: StringFieldUpdateOperationsInput | string
    general_styles_soft_shadow?: BoolFieldUpdateOperationsInput | boolean
    header_styles_profile_shadow?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_width?: FloatFieldUpdateOperationsInput | number
    header_styles_profile_border_color?: StringFieldUpdateOperationsInput | string
    header_styles_collapse_long_bio?: BoolFieldUpdateOperationsInput | boolean
    header_styles_social_icons_size?: FloatFieldUpdateOperationsInput | number
    card_styles_design?: IntFieldUpdateOperationsInput | number
    card_styles_card_color?: StringFieldUpdateOperationsInput | string
    card_styles_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_color?: StringFieldUpdateOperationsInput | string
    card_styles_label_text_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_corner?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_width?: FloatFieldUpdateOperationsInput | number
    card_styles_card_border_color?: StringFieldUpdateOperationsInput | string
    card_styles_card_shadow?: FloatFieldUpdateOperationsInput | number
    card_styles_card_spacing?: FloatFieldUpdateOperationsInput | number
    title_font?: StringFieldUpdateOperationsInput | string
    text_font?: StringFieldUpdateOperationsInput | string
    social_enable_add_contacts?: BoolFieldUpdateOperationsInput | boolean
    social_enable_share_btn?: BoolFieldUpdateOperationsInput | boolean
    social_enable_search?: BoolFieldUpdateOperationsInput | boolean
    social_enable_qr_code?: BoolFieldUpdateOperationsInput | boolean
    profile_views?: IntFieldUpdateOperationsInput | number
  }

  export type ActivationCodeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivationCodeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivationCodeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockCreateManyLinkInput = {
    id?: string
    style?: number
    type: $Enums.BlockType
    title?: string
    description?: string
    text?: string
    text_align?: string
    text_color?: string
    animation?: string
    bg_image?: string
    custom_text_color?: string
    url: string
    order: number
    corner?: number
    layout?: string
    clicks?: number
    views?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SocialCreateManyLinkInput = {
    id?: string
    icon: string
    url: string
    order: number
    label?: string | null
    clicks?: number
  }

  export type BlockUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    style?: IntFieldUpdateOperationsInput | number
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    text_align?: StringFieldUpdateOperationsInput | string
    text_color?: StringFieldUpdateOperationsInput | string
    animation?: StringFieldUpdateOperationsInput | string
    bg_image?: StringFieldUpdateOperationsInput | string
    custom_text_color?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    corner?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUncheckedUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    style?: IntFieldUpdateOperationsInput | number
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    text_align?: StringFieldUpdateOperationsInput | string
    text_color?: StringFieldUpdateOperationsInput | string
    animation?: StringFieldUpdateOperationsInput | string
    bg_image?: StringFieldUpdateOperationsInput | string
    custom_text_color?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    corner?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUncheckedUpdateManyWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    style?: IntFieldUpdateOperationsInput | number
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    text_align?: StringFieldUpdateOperationsInput | string
    text_color?: StringFieldUpdateOperationsInput | string
    animation?: StringFieldUpdateOperationsInput | string
    bg_image?: StringFieldUpdateOperationsInput | string
    custom_text_color?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    corner?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    clicks?: IntFieldUpdateOperationsInput | number
  }

  export type SocialUncheckedUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    clicks?: IntFieldUpdateOperationsInput | number
  }

  export type SocialUncheckedUpdateManyWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    clicks?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}