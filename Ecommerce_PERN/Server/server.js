import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
console.log(PORT)
console.log("Loaded PORT from env:", process.env.PORT);


app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(morgan("dev"));

// applying rate limiting for all the routes
app.use(async(req,res,next)=>{
    try {
        const decision=await aj.protect(req,{
            requested:1,
        });
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({
                    error:"Too many requests"
                });
            }
            else if(decision.reason.isBot()){
                res.status(403).json({
                    error:"Bot access denied"
                });
            }
            else{
                res.status(403).json({
                    error:"Forbidden"
                });
            }
            return;
        }
        if(decision.results.some((result)=>result.reason.isBot()&& result.reason.isSpoofed())){
            res.status(403).json({
                error:"Spoofed bot detected"
            })
        }
        next(); 
    } catch (error) {
        console.log("ArcJet Error",error);
        next(error);
    }
})


app.use("/api/product", productRoutes);

async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log("Database initialised successfully");
    } catch (error) {
        console.log(error)
    }
};

initDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
})