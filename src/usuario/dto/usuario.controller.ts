import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioEntity } from "../usuario.entity";
import { UsuariosArmazenados } from "../usuario.dm";
import { CriaUsuarioDTO } from "./criaUsuario.dto";
import { FormUsuarioDTO } from "./formUsuario.dto";
import { AlteraUsuarioDTO } from "./alteraUsuario.dto";
import {v4 as uuid} from 'uuid';
import { ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./login.dto";

@Controller('/usuarios')
@ApiTags('/usuario')
export class UsuarioController {
    constructor(private dados : UsuariosArmazenados){ 

    }

    @Post()
    async criaUsuario(@Body()dadosUsuario: CriaUsuarioDTO){
        var novoUsuario = new UsuarioEntity(uuid(),dadosUsuario.nome,dadosUsuario.email,dadosUsuario.senha);

        this.dados.AdicionarUsuario(novoUsuario);
        var retorno = {
            novoUsuario,
            message: 'Que bom ter você aqui, pode contar com a gente.'
        };
        return retorno;
    }

@Post('/login')
  async login(@Body() dadosLogin: LoginDTO) {
        const usuarioLogado = this.dados.loginUsuario(dadosLogin.email, dadosLogin.senha);   
        if(usuarioLogado){
            return {
                usuario: usuarioLogado,
                message: 'Login realizado com sucesso'
            };
        }
        return {
            message: 'Email ou senha inválidos'
        };
  }     

@Get()
async retornaUsuario(): Promise<FormUsuarioDTO[]> {

    var usuariosForm = this.dados.Usuarios;
    const FormRetorno = usuariosForm.map(
        usuario => new FormUsuarioDTO(
            usuario.id,
            usuario.nome,
            usuario.email
        )
    );
    return FormRetorno;
}

@Put('/:id')
async alteraUsuario(@Param('id') id: string, @Body() dadosAtualizacao: AlteraUsuarioDTO) {
    const usuarioAtualizado = await this.dados.atualizaUsuario(id, dadosAtualizacao);
    return {
        usuario: usuarioAtualizado,
        message: 'Usuário atualizado com sucesso.'
    }
}

@Delete('/:id')
async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.dados.removeUsuario(id);
    return {
        usuario: usuarioRemovido,
        message: 'Usuário removido com sucesso.'
    };

    }
}