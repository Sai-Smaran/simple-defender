import express, { type Request, type Response, type NextFunction, type Express } from 'express';
const VT = require("node-virustotal");
const dti = VT.makeAPI();
const key = dti.setKey(process.env.API_KEY);          // Get your own API_KEY and put it in a .env file

const app: Express = express();

app.use(express.json());

const port = process.env.PORT || 8080;

app.get('/v1/status', (req: Request, res: Response) => {
  res.json({
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

app.get(
  '/v1/link-analysis',
  async (req: Request, resServ: Response, next: NextFunction): Promise<void> => {
    
    const link = req.query.link;
    try {
      const sameObj = dti.initialScanURL(link, function(err: any, res: any) {
        
        if (err) throw new Error();

        const response = {
          behavior: res.relationships.behavior
        }

        resServ.status(200).json(JSON.stringify(res));

      });
    } catch (error: unknown) {
      next(new Error((error as Error).message));
    }
  },
);

app.get(
  '/v1/file-analysis',
  async (req: Request, resServ: Response, next: NextFunction): Promise<void> => {
    const link = req.query.link;

    try {
      const sameObj = dti.initialScanURL(link, function(err: any, res: any) {
        
        if (err) throw new Error();

        const response = {
          behavior: res.relationships.behavior
        }

        resServ.status(200).json(JSON.stringify(res));

      });
    } catch (error: unknown) {
      next(new Error((error as Error).message));
    }
  },
);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});