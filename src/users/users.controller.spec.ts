import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let userId: number;

  const mockUsersService = {
    create: jest.fn((dto) => {
      return { ...dto, _id: Date.now() };
    }),

    update: jest.fn((id, dto) => {
      return { ...dto, id };
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create a user ', () => {
    const dto = {
      name: 'jatin',
      age: 23,
    };
    expect(usersController.create(dto)).toEqual({
      _id: expect.any(Number),
      name: dto.name,
      age: dto.age,
    });
  });

  it('should update the user', () => {
    const dto = {
      name: 'chanda',
      age: 22,
    };
    const id = '1';

    expect(usersController.update('1', dto)).toEqual({
      id,
      ...dto,
    });

    expect(mockUsersService.update).toHaveBeenCalled();
  });
});
