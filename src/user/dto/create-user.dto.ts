import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly nama: string;

  @IsNotEmpty()
  @IsString()
  readonly alamat: string;
}
