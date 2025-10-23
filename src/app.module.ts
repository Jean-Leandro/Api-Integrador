import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module'
import { InstituicaoModule } from './instituicao/instituicao.module'; 


@Module({
  imports: [UsuarioModule, InstituicaoModule],
  controllers: [],
  providers: [],

})
export class AppModule {}
