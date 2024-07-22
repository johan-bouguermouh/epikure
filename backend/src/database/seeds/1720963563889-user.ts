import { User } from '../../entities/user/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class User1720963563889 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // const repository = dataSource.getRepository(User);
    // await repository.insert([
    //   {
    //     email: 'johan@mail.fr',
    //     password: 'password',
    //     isActive: true,
    //     isFarmer: false,
    //     role: 1
    //   },
    // ]);
    // const userFactory = factoryManager.get(User);
    // await userFactory.save();
  }
}
