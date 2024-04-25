import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ProdutosService } from '../services/produto.service';
import { Produtos } from './../entities/produto.entity';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";


@UseGuards(JwtAuthGuard)
@Controller("/produtos")
export class ProdutosController{
    
    constructor(private readonly produtosService: ProdutosService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produtos[]>{
        return this.produtosService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id : number): Promise<Produtos>{
        return this.produtosService.findById(id);
    }
    @Get('titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTipo(@Param('titulo')titulo : string): Promise<Produtos[]>{
        return this.produtosService.findByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produtos: Produtos): Promise<Produtos>{
        return this.produtosService.create(produtos);
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produtos: Produtos): Promise<Produtos> {
        return this.produtosService.update(produtos);
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.produtosService.delete(id);
    }
}