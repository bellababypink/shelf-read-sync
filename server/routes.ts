import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import session from "express-session";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(session({
    secret: process.env.SESSION_SECRET || 'shelfflix-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({
      checkPeriod: 86400000
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  }));

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password, fullName } = req.body;
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const username = email.split('@')[0] + '_' + Date.now();
      
      const user = await storage.createUser({
        email,
        username,
        password: hashedPassword,
        fullName: fullName || null,
      });

      (req.session as any).userId = user.id;
      
      res.json({ 
        user: { 
          id: user.id, 
          email: user.email, 
          fullName: user.fullName 
        } 
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      (req.session as any).userId = user.id;
      
      res.json({ 
        user: { 
          id: user.id, 
          email: user.email, 
          fullName: user.fullName 
        } 
      });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ error: "Failed to sign in" });
    }
  });

  app.post("/api/auth/signout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to sign out" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.json({ 
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.fullName 
      } 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
