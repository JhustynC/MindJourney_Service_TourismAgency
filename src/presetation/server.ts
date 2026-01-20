import express, { Router } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import cors from 'cors';


interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  
  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }
  
  async start() {
    
    //* Middleware
    this.app.use( morgan('dev') ); // HTTP request logger
    this.app.use( express.json() ); // raw
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
    
    this.app.use(cors());

    //* Swagger UI
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    }));

    //* Routes
    this.app.use( this.routes );

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
      console.log(`Swagger UI available at http://localhost:${ this.port }/api-docs`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}
