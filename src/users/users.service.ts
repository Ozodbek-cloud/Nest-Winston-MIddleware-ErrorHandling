import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';  

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}


  async update_user(payload: Partial<User>, id: number) {
    const user = await this.userModel.findOne({ 
        where: {
            id: id
        }
     });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.userModel.create(payload);
  }

  async delete_user(id: number) {
    const result = await this.userModel.destroy({
        where: {
            id: id
        }
  });
  

    return { deleted: true };
  }
  get_all() {
    return this.userModel.findAll()
  }

}
