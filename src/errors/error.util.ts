export class ErrorHandleDto {
  constructor(
    readonly message: string,
    readonly data: any = null,
  ) {}
}
