import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carts } from '../../db/entities/carts.entity';
import { toISO } from '../../utils/iso-date.util';

@Injectable()
export class CartService {
  public constructor(@InjectRepository(Carts) private readonly repo: Repository<Carts>) {}

  async getAllCartsList() {
    try {
      return await this.repo.find();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async findByUserId(userId: string) {
    try {
      return await this.repo.findOneBy({
        user_id: userId,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async createByUserId(userId: string) {
    try {
      const id = v4(v4());
      const userCart = {
        id,
        user_id: userId,
        created_at: toISO(new Date()),
        updated_at: toISO(new Date()),
      };
      await this.repo.create(userCart);
      return userCart;
    } catch (e) {
      return false;
    }
  }

  async findOrCreateByUserId(userId: string) {
    try {
      const userCart = await this.findByUserId(userId);
      if (userCart) {
        return userCart;
      }
      return await this.createByUserId(userId);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async updateByUserId(userId: string, { items }: Cart) {
    try {
      const cart = await this.findOrCreateByUserId(userId);
      if (cart) {
        const updatedCart = {
          id: cart.id,
          items: [...items],
        }
        await this.repo.update({
          user_id: userId
        }, updatedCart);
        return updatedCart;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async removeByUserId(userId) {
    try {
      const cart = await this.findByUserId(userId);
      if (cart) {
        await this.repo.remove([cart]);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

}
