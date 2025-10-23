import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaUsuarioDTO } from "../../usuario/dto/criaUsuario.dto";
import { FormUsuarioDTO } from "../../usuario/dto/formUsuario.dto";
import { AlteraUsuarioDTO } from "../../usuario/dto/alteraUsuario.dto";
import {v4 as uuid} from 'uuid';
import { ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "../../usuario/dto/login.dto";
import { InstituicaoArmazenados } from "../instituicao.dm";
import { InstituicaoEntity } from "../instituicao.entity";

@Controller('/instituicoes')
@ApiTags('/instituicoes')
export class InstituicaoController {
    constructor(private dados : InstituicaoArmazenados){ 

    }

    @Post()
    async criaInstituicao(@Body()dadosUsuario: CriaUsuarioDTO){
        var novaInstiuicao = new InstituicaoEntity(uuid(),dadosUsuario.nome,dadosUsuario.email,dadosUsuario.senha);

        this.dados.AdicionarInstituicao(novaInstiuicao);
        var retorno = {
            novaInstiuicao,
            message: 'Que bom ter você aqui'
        };
        return retorno;
    }

@Post('/login')
  async login(@Body() dadosLogin: LoginDTO) {
        const instituicaoLogado= this.dados.loginUsuario(dadosLogin.email, dadosLogin.senha);   
        if(instituicaoLogado){
            return {
                instituicao:instituicaoLogado,
                message: 'Login realizado com sucesso'
            };
        }
        return {
            message: 'Email ou senha inválidos'
        };
  }     

@Get()
async retornaInstituicao(): Promise<FormUsuarioDTO[]> {

    var instituicaoForm = this.dados.Instituicoes;
    const FormRetorno = instituicaoForm.map(
        instituicao => new FormUsuarioDTO(
            instituicao.id,
            instituicao.nome,
            instituicao.email
        )
    );
    return FormRetorno;
}

@Put('/:id')
async alteraInstituicao(@Param('id') id: string, @Body() dadosAtualizacao: AlteraUsuarioDTO) {
    const instituicaoAtualizado = await this.dados.atualizaInstituicao(id, dadosAtualizacao);
    return {
        instituicao: instituicaoAtualizado,
        message: 'Instituicao atualizada com sucesso.'
    }
}

@Delete('/:id')
async removeInstituicao(@Param('id') id: string) {
    const instituicaoRemovido = await this.dados.removeInstituicao(id);
    return {
        instituicao: instituicaoRemovido,
        message: 'Instituicao removida com sucesso.'
    };

    }
}