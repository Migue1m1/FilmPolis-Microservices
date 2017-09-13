export interface IDbConnection {
    open()   : void;
    connect(): void;
    close()  : void;
}