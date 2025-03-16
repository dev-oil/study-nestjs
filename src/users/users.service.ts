import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = []; // 메모리에서 데이터 관리

  // 모든 사용자 조회
  findAll(): User[] {
    return this.users;
  }

  // 특정 사용자 조회
  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  // 새 사용자 추가
  create(createUserDto: CreateUserDto): User {
    const newUser: User = { id: uuidv4(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  // 사용자 정보 수정
  update(id: string, updateUserDto: CreateUserDto): User | null {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;
    this.users[userIndex] = { id, ...updateUserDto };
    return this.users[userIndex];
  }

  // 사용자 삭제
  remove(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return { message: '유저 삭제가 완료되었습니다.' };
  }
}
