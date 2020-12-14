require("dotenv").config();

module.exports = {
    "development": {
      "username": "kli43ulxb1jihaik",
      "password": "v45lltjnqvy5m812",
      "database": "q6vgsyai9hzuhmbk",
      "host": "ixnzh1cxch6rtdrx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      "port": 3306,
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "port": 3306,
      "dialect": "mysql"
    },
    "production": {
      "use_env_variable": "JAWSDB_URL",
      "dialect": "mysql"
    }
}