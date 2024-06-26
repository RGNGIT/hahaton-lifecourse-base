import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { usersProvider } from './providers/user.providers';
import { SequelizeModule } from '../sequelize/sequelize.module';
import { RoleService } from 'src/role/services/role.service';
import { universityProvider } from 'src/university/providers/university.providers';
import { UniversityModule } from 'src/university/university.module';
import { FindService } from 'src/common/filters/find.service';
@Module({
  imports: [SequelizeModule],
  controllers: [UserController],
  providers: [
    UserService,
    RoleService,
    FindService,
    ...usersProvider,
    ...universityProvider
  ],
})

export class UserModule { }