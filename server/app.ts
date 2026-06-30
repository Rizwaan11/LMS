require('dotenv').config();
import express, { NextFunction,Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error';
import userRouter from './routes/user.routes';
import courseRouter from './routes/course.routes';
import notificationRoute from './routes/notification.routes';
import orderRouter from './routes/order.routes';
import analyticsRouter from './routes/analytics.route';
import layoutRouter from './routes/layout.routes';

app.use(express.json({limit: '50mb'}));

app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
}))

//routes
app.use('/api/v1/',userRouter);
app.use('/api/v1/',courseRouter);
app.use('/api/v1/',notificationRoute);
app.use('/api/v1/',orderRouter)
app.use('/api/v1/',analyticsRouter)
app.use('/api/v1/',layoutRouter)


app.get('/test', (req:Request, res:Response,next:NextFunction) => {
    res.status(200).json({message: 'API is working'});
})

app.all('*', (req:Request, res:Response,next:NextFunction) => {
    const err = new Error('Route ${req.originalUrl} not found') as any;
    err.status = 404;
    next(err);
})


app.use(errorMiddleware);



