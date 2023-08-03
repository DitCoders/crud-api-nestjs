import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly nama: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly alamat: string;
}
