import {IsString, IsEmail, IsNumber, IsNotEmpty, MinLength} from "class-validator";
import { EmailUnico } from "./validacao/email-unico.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CriaUsuarioDTO {
    @IsString()
    @IsNotEmpty({message: 'Digite o seu nome'})
    @ApiProperty({example:'João da Silva',
                description:'Aqui deve ser inserido o nome do usuário.' })                                       
    nome: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @EmailUnico({message:'Email já cadastrado.'})
    @ApiProperty({example:'joao@gmail.com',
                description:'Aqui deve ser inserido o email do usuário.' })   
    email: string;

    @MinLength(8,{message:'A senha deve ter no mínimo 8 caracteres.'})
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:'1a2b3c4d5e',
                description:'Aqui deve ser inserido a senha do usuário.' })   
    senha: string;

}

