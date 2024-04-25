
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Categorias } from 'src/categorias/entities/categorias.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';


import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "tb_produtos" })
export class Produtos{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 500, nullable: false})
    foto: string;

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({type: "decimal", precision: 10, scale: 2,nullable: false})
    preco: number;

    @ManyToOne(() => Categorias, (categorias) => categorias.produtos, {
        onDelete: "CASCADE"
    })
    categorias: Categorias;
    
    @ManyToOne(() => Usuario, (usuario) => usuario.produtos, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
}