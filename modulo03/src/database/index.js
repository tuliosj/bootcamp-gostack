import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// importar models da aplicação
import User from '../app/models/User';
import File from '../app/models/File';

// criar array com TODOS os models da aplicação
const models = [User, File];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map((model) => model.init(this.connection));
    }
}

export default new Database();
