import { Module } from "@nestjs/common";
import { InstituicaoController } from "./dto/instituicao.controller";
import { UsuariosArmazenados } from "../usuario/usuario.dm";
import { EmailUnicoValidator } from "../usuario/dto/validacao/email-unico.validator";
import { InstituicaoArmazenados } from "./instituicao.dm";


@Module({
    controllers: [InstituicaoController],
    providers:[InstituicaoArmazenados, UsuariosArmazenados, EmailUnicoValidator]
})

export class InstituicaoModule{}