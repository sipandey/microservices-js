import { Neo4jService } from '@dbc-tech/nest-neo4j';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  constructor(private readonly neo4jService: Neo4jService) {
    console.log('neo4jService constructor');
  }

  async addNode(query: string, params: any) {
    const result = await this.neo4jService.write(query, params);
    return result;
  }

  async getNodes(query: string) {
    const result = await this.neo4jService.write(query);
    return result;
  }

  async deleteNode(query: string, params: any) {
    const result = await this.neo4jService.write(query, params);
    return result;
  }

  async updateNode() {}
}
