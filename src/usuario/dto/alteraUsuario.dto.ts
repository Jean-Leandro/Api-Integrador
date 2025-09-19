import {IsString, IsEmail, IsNumber, IsNotEmpty, MinLength, IsOptional} from "class-validator";
import { EmailUnico } from "./validacao/email-unico.validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class AlteraUsuarioDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'Digite o seu nome'})
    @ApiPropertyOptional({example:'João da Silva',
                    description:'Aqui deve ser inserido o nome do usuário.' })   
    nome: string;

    @IsEmail()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @EmailUnico({message:'Email já cadastrado.'})
     @ApiPropertyOptional({example:'João da Silva',
                    description:'Aqui deve ser inserido o nome do usuário.' })   
    email: string;

    @MinLength(8,{message:'A senha deve ter no mínimo 8 caracteres.'})
    @IsNotEmpty()
    @IsOptional()
    @IsString()
     @ApiPropertyOptional({example:'João da Silva',
                    description:'Aqui deve ser inserido o nome do usuário.' })   
    senha: string;

}