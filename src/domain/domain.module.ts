/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, type TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          name: 'default',
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
        } as TypeOrmModuleAsyncOptions
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      typePaths: ['./**/*.graphql'],
      //@ts-ignore
      context: ({req}) => ({ headers: req.headers}),
      debug: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      driver: ApolloDriver
    })
  ],
})
export class DomainModule {}