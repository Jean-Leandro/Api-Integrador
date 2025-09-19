import { Module } from "@nestjs/common";
import { UsuarioController } from "./dto/usuario.controller";
import { UsuariosArmazenados } from "./usuario.dm";
import { EmailUnicoValidator } from "./dto/validacao/email-unico.validator";


@Module({
    controllers: [UsuarioController],
    providers:[UsuariosArmazenados, EmailUnicoValidator]
})

export class UsuarioModule{}