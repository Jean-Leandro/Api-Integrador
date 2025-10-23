import { Injectable } from "@nestjs/common";
import { InstituicaoEntity } from "./instituicao.entity";



@Injectable()
export class InstituicaoArmazenados{
    #instituicoes: InstituicaoEntity[] = [];  

    AdicionarInstituicao(instituicao: InstituicaoEntity){
            this.#instituicoes.push(instituicao);
        
    }

    async validaEmail(email: string): Promise<boolean>{
        const instituicaoEncontrada = this.#instituicoes.find(u => u.email === email);
        return instituicaoEncontrada !== undefined;
    }

    private BuscaPorID(id: string): InstituicaoEntity {
        const possivelInstituicao = this.#instituicoes.find(
            instituicaoSalva => instituicaoSalva.id === id
        );

        if (!possivelInstituicao) {
            throw new Error('Instituição não encontrada');
        }
        return possivelInstituicao;
    }

    private BuscaPorEmail(email: string): InstituicaoEntity {
        const possivelInstituicao = this.#instituicoes.find(
            instituicaoSalva => instituicaoSalva.email === email
        );

        if (!possivelInstituicao) {
            throw new Error('Instituição não encontrada');
        }
        return possivelInstituicao;
    }


    loginUsuario(email: string, senha: string): InstituicaoEntity | null {
        const possivelInstituicao = this.BuscaPorEmail(email);

        if(possivelInstituicao && possivelInstituicao.login(senha)){
            return possivelInstituicao;
        }
        return null;
    }

    async removeInstituicao(id: string) {
        const instituicao = this.BuscaPorID(id);

        this.#instituicoes = this.#instituicoes.filter(
            instituicaoSalva => instituicaoSalva.id !== id
        );

        return instituicao;
    }
 
    async atualizaInstituicao(id: string, dadosAtualizacao: Partial<InstituicaoEntity>) {
        var possivelInstituicao = this.BuscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return;
                }else if (valor === undefined) {
                    return;

                } else if (chave === 'senha' && typeof valor === 'string'){
                    possivelInstituicao.trocarSenha(valor);
                    return;
                }
                possivelInstituicao[chave] = valor;
            }
        );

        return possivelInstituicao;
    }

    get Instituicoes(){        
        return this.#instituicoes;
    }

    
}
