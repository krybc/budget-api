import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './core/config/database';
import globalConfig from './core/config/global';
import { Account } from './core/entities/account';
import { Category } from './core/entities/category';
import { Contractor } from './core/entities/contractor';
import { Transaction } from './core/entities/transaction';
import { User } from './core/entities/user';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountRepository } from './core/repositories/account.repository';
import { UserRepository } from './core/repositories/user.repository';
import { UsersController } from './users/controllers/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/security/jwt.strategy';
import { JwtAuthGuard } from './auth/security/jwt-auth.guard';
import { LocalStrategy } from './auth/security/local.strategy';
import { LocalAuthGuard } from './auth/security/local-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth/security/constants';
import { AuthController } from './auth/controllers/auth.controller';
import { UsersService } from './users/services/users.service';
import { AuthService } from './auth/services/auth.service';
import { CategoryRepository } from './core/repositories/category.repository';
import { CategoriesService } from './categories/services/categories.service';
import { CategoriesController } from './categories/controllers/categories.controller';
import { CategoryFactory } from './categories/factories/category.factory';
import { AccountsController } from './accounts/controllers/accounts.controller';
import { AccountFactory } from './accounts/factories/account.factory';
import { AccountsService } from './accounts/services/accounts.service';
import { ContractorFactory } from './contractors/factories/contractor.factory';
import { ContractorRepository } from './core/repositories/contractor.repository';
import { ContractorsService } from './contractors/services/contractors.service';
import { ContractorsController } from './contractors/controllers/contractors.controller';
import { TransactionFactory } from './transactions/factory/transaction.factory';
import { TransactionRepository } from './core/repositories/transaction.repository';
import { TransactionsService } from './transactions/services/transactions.service';
import { TransactionsController } from './transactions/controllers/transactions.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig, globalConfig] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: databaseConfig().host,
      port: databaseConfig().port,
      username: databaseConfig().username,
      password: databaseConfig().password,
      database: databaseConfig().name,
      entities: [Account, Category, Contractor, Transaction, User],
      migrationsTableName: 'db_migration',
      migrations: [`${process.env.appDir}/core/migration/*{.ts,.js}`],
      cli: {
        migrationsDir: 'src/core/migration',
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    CqrsModule,
  ],
  controllers: [
    AuthController,
    AccountsController,
    CategoriesController,
    ContractorsController,
    TransactionsController,
    UsersController,
  ],
  providers: [
    AuthService,
    AccountFactory,
    AccountRepository,
    AccountsService,
    CategoryFactory,
    CategoryRepository,
    CategoriesService,
    ContractorFactory,
    ContractorRepository,
    ContractorsService,
    TransactionFactory,
    TransactionRepository,
    TransactionsService,
    UserRepository,
    UsersService,
    JwtStrategy,
    JwtAuthGuard,
    LocalStrategy,
    LocalAuthGuard,
  ],
})
export class AppModule {}
