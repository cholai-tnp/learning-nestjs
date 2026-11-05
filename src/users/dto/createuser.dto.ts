import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserPayload {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    @IsString()
    lastName: string;
    @IsNotEmpty()
    user_id: string;
}